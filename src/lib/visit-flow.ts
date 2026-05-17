export const INTRO_VISITED_COOKIE = "portfolio_intro_visited";
export const CARD_SHOWN_COOKIE = "is_first_visit_Cardshown";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export const hasVisitCookie = (name: string) => {
  if (typeof document === "undefined") return false;

  return document.cookie
    .split(";")
    .map((entry) => entry.trim())
    .some((entry) => entry === `${name}=1`);
};

export const markVisitCookie = (name: string) => {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=1; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
};
