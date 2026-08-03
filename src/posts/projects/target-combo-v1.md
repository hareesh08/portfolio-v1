---
title: "Building TargetComboV1 — A Credential Extraction Engine for OSINT"
description: "How I built a .NET 8 console tool that processes credential leak files, classifies them by type, and extracts by domain, country, or keyword — with a JWT license system and Serilog logging."
date: "2026-08-03"
tags:
  - csharp
  - dotnet
  - osint
  - licensing
  - serilog
---

**TargetComboV1** is a Windows console application for processing large credential leak files — think `URL:Username:Password` triplets from data breaches. It extracts, classifies, filters, and organizes millions of lines into clean, usable datasets.

Built with Clean Architecture, dependency injection, Serilog logging, and a JWT-based license system. Let me walk through it.

---

## What It Processes

The input format is credential triplets:

```
https://example.com:8080:john:password123
https://mail.domain.de:user@email.com:pass456
https://api.service.com:+919876543210:pin1234
```

Each line contains a URL, a credential (email, username, or phone number), and a password. The tool parses, classifies, and routes each credential to the right output.

---

## The Data Flow

```mermaid
flowchart LR
    A[source/*.txt files] --> B[Read async stream]
    B --> C[Parse URL:Cred:Pass]
    C --> D{Classify credential}
    D -->|contains @| E[Email:Pass]
    D -->|digits only| F[Number:Pass]
    D -->|else| G[User:Pass]

    E --> H[email-pass.txt]
    F --> I[number-pass.txt]
    G --> J[user-pass.txt]

    K{Filter?} -->|By domain| L[Per-domain files]
    K -->|By country| M[Per-country files]
    K -->|By keyword| N[Per-keyword files]
```

---

## The 11 Operations

| # | Operation | Description |
|---|---|---|
| 1 | **Link-Based Extraction** | Filters credentials by matching URLs against a user-provided domain/keyword list. Outputs per-link files in email/user/number subdirectories. |
| 2 | **Full Extraction** | Processes all source files, separates into `email-pass.txt`, `user-pass.txt`, `number-pass.txt`. |
| 3 | **Selective Extraction** | Extracts only one type: Email:Pass, Number:Pass, or User:Pass. |
| 4 | **Link + Selective** | Combines link filtering with single-type extraction. |
| 5 | **Keyword Extraction** | Filters credentials by keyword matching within the URL. |
| 6 | **ULP Converter** | Adds `https://` prefix to lines missing it. |
| 7 | **Country Domain** | Groups email credentials by country-specific domain (`.de`, `.fr`, `.uk`, etc.) into separate files. |
| 8 | **Logs to ULP** | Converts raw log files into ULP format. |
| 9 | **ULP Combine** | Concatenates all `.txt` files in source into one combined file. |
| 10 | **ULP Dedupe** | Removes duplicate lines using `HashSet<string>`. |
| 11 | **SMTP/cPanel/Webmail** | Sub-menu for extracting SMTP, cPanel, and Webmail credentials (placeholder). |

---

## Credential Parsing

The tool supports multiple URL formats:

```mermaid
graph TD
    A[Raw line] --> B{URL format?}
    B -->|host:port:user:pass| C[Standard format]
    B -->|host:user:pass| D[No port]
    B -->|host/path:user:pass| E[With path]
    B -->|https://host:port:user:pass| F[With scheme]

    C --> G[Parse with regex]
    D --> G
    E --> G
    F --> G

    G --> H{Classify user part}
    H -->|contains @ + email regex| I[Email type]
    H -->|7-15 digit number| J[Phone type]
    H -->|else| K[Username type]
```

Phone numbers are validated with length checks and Indian `+91` prefix stripping. Emails are validated with regex. Everything else defaults to username.

---

## Architecture

The project follows Clean/Onion Architecture with dependency injection:

```mermaid
graph TD
    subgraph Presentation
        A[Console Menu]
    end

    subgraph Application
        B[FullExtractionService]
        C[SelectiveExtractionService]
        D[LinkBasedExtractionService]
        E[CountryDomainService]
        F[UlpConverterService]
        G[UlpDeduplicationService]
    end

    subgraph Domain
        H[Credential entity]
        I[ExtractionMode enum]
        J[IExtractionService]
        K[ICredentialClassifier]
        L[IFileWriter]
    end

    subgraph Infrastructure
        M[CredentialClassifier]
        N[FileWriter + SemaphoreSlim]
        O[FileSystemService]
        P[Serilog logging]
    end

    Presentation --> Application
    Application --> Domain
    Infrastructure --> Domain
```

The domain layer has zero infrastructure dependencies. Everything is injected via interfaces — you can swap the file system, the classifier, or the logger without touching business logic.

---

## Performance for Large Files

Processing multi-gigabyte files requires careful engineering:

```mermaid
flowchart LR
    A[Large .txt file] --> B[IAsyncEnumerable stream<br/>SequentialScan + Async]
    B --> C[Process line by line<br/>no full load into RAM]
    C --> D[Buffer 5000-10000 lines]
    D --> E[Flush to disk]
    E --> C

    F[Progress display] --> G[Every 200ms refresh]
    G --> H[Items/sec + ETA +<br/>Memory MB + CPU %]
```

- **Async streaming** — `IAsyncEnumerable<string>` with `FileOptions.SequentialScan` for efficient large-file reading
- **Buffered writing** — flush every 5,000–10,000 lines to reduce I/O overhead
- **Fast line counting** — raw 64KB byte buffer scanning instead of string parsing
- **Real-time progress** — items/sec, ETA, memory usage, CPU percentage, refreshed every 200ms

---

## License System

Like the other tools in this series, TargetComboV1 uses a JWT-based offline license system:

```mermaid
flowchart TD
    A[First run] --> B[Compute HWID<br/>MD5 MachineName + OS + CPU]
    B --> C{License in Registry?}
    C -->|No| D[Trial: 5 min/day<br/>SHA-256 integrity check]
    C -->|Yes| E[JWT validate<br/>HMAC-SHA256]
    E --> F{HWID match?}
    F -->|No| G[Force exit]
    F -->|Yes| H{Expired?}
    H -->|Yes| G
    H -->|No| I[Run application]

    J[Background timer<br/>every 2 min] --> E
```

- **HWID** computed from `MachineName + OSVersion + ProcessorCount`
- **JWT tokens** signed with hardcoded symmetric key
- **Registry storage** in `HKCU\SOFTWARE\TargetULPCommercial`
- **Trial cooldown** — SHA-256 hash integrity check in registry prevents tampering
- **Shadow check** — background timer re-validates every 2 minutes, force-exits if invalid

---

## Tech Stack

| Component | Technology |
|---|---|
| Language | C# 12 (.NET 8.0) |
| Architecture | Clean/Onion with DI (`Microsoft.Extensions.DependencyInjection`) |
| Logging | Serilog 4.0.2 (rolling file sink) |
| Licensing | JWT (`System.IdentityModel.Tokens.Jwt`) + HMAC-SHA256 |
| System Access | `System.Management`, Windows Registry |
| Build | Self-contained single-file, `win-x64` |
| IDE | Visual Studio 2022 / Rider |

---

## Project Structure

```
TargetComboV1/
├── TargetComboV1.sln
├── global.json
├── TargetComboV1/
│   ├── Program.cs                    # DI wiring + main menu
│   ├── Domain/
│   │   ├── Entities/Credential.cs    # URL, Username, Password, Type
│   │   ├── Enums/ExtractionMode.cs   # Email, Number, User, All
│   │   └── Interfaces/               # IExtractionService, IFileWriter...
│   ├── Application/
│   │   ├── BaseExtractionService.cs  # License check, buffered I/O
│   │   ├── FullExtractionService.cs
│   │   ├── SelectiveExtractionService.cs
│   │   ├── LinkBasedExtractionService.cs
│   │   ├── CountryDomainService.cs
│   │   ├── UlpConverterService.cs
│   │   └── UlpDeduplicationService.cs
│   ├── Infrastructure/
│   │   ├── CredentialClassifier.cs   # Regex parsing + classification
│   │   ├── FileWriter.cs             # Async write + SemaphoreSlim
│   │   ├── FileSystemService.cs      # Fast line counting
│   │   └── LoggingConfiguration.cs   # Serilog setup
│   └── Presentation/Menus/
│       ├── ConsoleMenu.cs            # Menu + WinForms dialogs
│       └── SmtpCpanelWebmailHandler.cs
└── TargetComboV1Keygen/               # Separate license generator project
```

---

## Running It

```bash
cd D:\C#\TargetComboV1
dotnet build --configuration Release
dotnet run --project TargetComboV1/TargetComboV1.csproj
```

Place `.txt` source files in the `source/` directory, then choose an operation from the menu.

---

## Source

[github.com/hareesh08/TargetComboV1](https://github.com/hareesh08/TargetComboV1)
