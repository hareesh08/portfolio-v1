---
title: "Building OpenAssistAI — A Glass-Effect Desktop AI Assistant with WebView2"
description: "How I built a transparent, always-on-top WPF AI client supporting multiple providers, OCR, global hotkeys, and a built-in browser — all with a glass-effect UI."
date: "2026-08-03"
tags:
  - csharp
  - wpf
  - webview2
  - ai
  - tesseract
---

Most AI assistants live in your browser tab. But what if you want an AI that floats above your other windows, responds to global hotkeys, can read your screen via OCR, and even has its own built-in browser?

**OpenAssistAI** is a transparent, glass-effect WPF desktop application that does all of that. It's a universal AI client supporting multiple providers, models, and input modalities — with an interface that looks like it belongs in a sci-fi movie.

---

## The Interface

```mermaid
graph TD
    A[OpenAssistAI] --> B[Transparent glass window]
    B --> C[Borderless + layered]
    B --> D[Gradient background]
    B --> E[Semi-transparent controls]
    B --> F[Customizable text size/color]

    G[System Tray] --> H[Minimize to tray]
    H --> I[Double-click toggle]
    H --> J[Context menu:<br/>Show/Hide, Clear, Model, Exit]
```

The window is borderless, transparent, and always-on-top. It uses `SetWindowDisplayAffinity(WDA_EXCLUDEFROMCAPTURE)` to prevent screenshots. The glass-effect background uses gradient fills with per-pixel alpha. Text size, text color, and background color are all user-configurable from a settings panel.

---

## Multi-Provider AI Support

OpenAssistAI isn't locked to a single AI provider. It supports three:

```mermaid
graph TD
    A[User sends message] --> B{Current model provider?}
    B -->|Zhipu AI| C[ZhipuAIHandler<br/>open.bigmodel.cn]
    B -->|302.ai| D[AI302Handler<br/>api.302.ai]
    B -->|OpenAI-compatible| E[Generic HttpClient<br/>Bearer token]

    C --> F[Thinking mode support]
    D --> F
    E --> G[Vision: base64 image]

    F --> H[Response displayed<br/>in RichTextBox]
    G --> H
```

Each provider has its own handler implementing a common interface. The `ResponseHandler` delegates to the correct handler based on the current model's endpoint. Configuration is managed via `config.yaml` with hot-reload via `FileSystemWatcher`.

---

## Global Hotkeys

```mermaid
graph LR
    A[Alt+H] --> B[Toggle window visibility]
    C[Alt+0] --> D[Clear chat]
    E[Alt+M] --> F[Cycle model selector]
    G[Alt+S] --> H[Screenshot mode]
    I[Alt+P] --> J[OCR mode]
    K[Alt+B] --> L[Toggle browser]
    M[Alt+1/2/3] --> N[Screenshot modes 1-3]
    O[Alt+Q/W/E] --> P[OCR modes 1-3]
    Q[Alt+4] --> R[Custom screenshot]
    S[Alt+R] --> T[Custom OCR]
    U[Alt+A] --> V[System audio capture<br/>placeholder]
```

All hotkeys require the `Alt` modifier and use `RegisterHotKey` with `MOD_NOREPEAT` to prevent repeated firings. Messages are intercepted via `HwndSource.AddHook(WndProc)`.

---

## OCR Pipeline

```mermaid
flowchart LR
    A[Alt+P / Alt+Q/W/E] --> B[ScreenshotManager<br/>full-screen capture]
    B --> C[Tesseract OCR engine]
    C --> D{Mode?}
    D -->|Quiz| E[Extract question text]
    D -->|Code| F[Extract code snippet]
    D -->|Explain| G[Extract + describe]
    E --> H[Append to prompt]
    F --> H
    G --> H
    H --> I[Send to AI]
```

The `OcrManager` wraps Tesseract 5.2.0 with the bundled English trained data. `ScreenshotManager` captures the full screen or active window via GDI. For non-vision models, OCR text is appended to the prompt. For vision models, the image is converted to base64 JPEG (resized to max 800×600) and sent as `image_url`.

---

## Built-in Browser

OpenAssistAI includes a full Chromium browser via WebView2:

```mermaid
graph TD
    A[WebView2 Browser] --> B[Tab management]
    A --> C[Back / Forward / Refresh]
    A --> D[Address bar + SSL indicator]
    A --> E[Favorites]
    A --> F[Menu]

    G[Alt+B] --> H[Toggle browser panel]
```

The browser supports tab management, navigation controls, an address bar with SSL status indicator, and a favorites system. It can be toggled via the `Alt+B` hotkey.

---

## Configuration Management

```mermaid
flowchart LR
    A[config.yaml] --> B[YamlDotNet deserializer]
    B --> C[CamelCase naming]
    C --> D[AppConfig + ModelConfig]

    E[FileSystemWatcher] --> F[Detect config changes]
    F --> G[Hot-reload config]
    G --> H[Backup: config.yaml.bak]

    I[User changes model] --> J[Update DefaultModel]
    J --> K[Re-init provider handler]
```

Configuration is managed via `config.yaml` with YAML serialization using `CamelCaseNamingConvention`. The `ConfigManager` watches for file changes via `FileSystemWatcher` and auto-reloads. A backup is created before any write operation.

---

## Logging System

```mermaid
graph TD
    A[Logger] --> B[ConcurrentQueue<LogEntry>]
    B --> C[Background async writer]
    C --> D[Rolling file sink]

    E[LogViewer window] --> F[Filterable display]
    F --> G[Color-coded levels]
    F --> H[Search]
    F --> I[Performance metrics summary]

    J[Structured logging] --> K[CallerMemberName]
    J --> L[CallerFilePath]
    J --> M[CallerLineNumber]
```

The logging system uses a `ConcurrentQueue<LogEntry>` with a background async writer task. It supports structured logging with caller information and performance timing. The `LogViewer` provides filterable, searchable log display with color-coded levels and performance metrics.

---

## Tech Stack

| Component | Technology |
|---|---|
| Framework | WPF on .NET 8.0 (Windows-specific) |
| Browser | Microsoft.Web.WebView2 v1.0.3537 |
| OCR | Tesseract 5.2.0 (bundled `tessdata`) |
| Audio | NAudio 2.2.1 (WASAPI) |
| Speech | Whisper.net 1.4.0 (placeholder) |
| Image Processing | System.Drawing.Common |
| JSON | Newtonsoft.Json 13.0.3 |
| Config | YamlDotNet 16.3.0 |
| Build | ReadyToRun, `win-x64` |

---

## Project Structure

```
OpenAssistAI/
├── OpenAssistAI.sln
├── global.json
├── config.yaml                      # Models, API keys, settings
├── MainWindow.xaml + .cs            # Main WPF window
├── Core/
│   ├── NativeMethods.cs             # Win32 interop
│   ├── OcrManager.cs                # Tesseract wrapper
│   └── ScreenshotManager.cs         # GDI screen capture
├── Internals/
│   ├── ResponseHandler.cs           # AI request orchestrator
│   ├── ModelConfiguration.cs        # Model + AppConfig
│   ├── CoreUtilities.cs             # UI utils, prompt builder, config
│   ├── HotkeyManager.cs             # Global hotkeys
│   ├── Api/
│   │   ├── ZhipuAIHandler.cs        # Zhipu AI provider
│   │   └── AI302Handler.cs          # 302.ai provider
│   └── Logging/
│       ├── Logger.cs                # Async file logger
│       ├── LoggingExtensions.cs
│       └── LogViewer.cs             # WPF log viewer
└── Tesseract-OCR/                   # Bundled OCR binaries
```

---

## Running It

```bash
cd D:\C#\Commercial\OpenAssistAIV2
dotnet build -c Release
dotnet run --project OpenAssistAI\OpenAssistAI.csproj
```

Edit `config.yaml` to configure your models and API keys. The app starts minimized to the system tray — double-click the tray icon to show.

---

## Source

[github.com/hareesh08/OpenAssistAIV2](https://github.com/hareesh08/OpenAssistAIV2)
