export const INTRO_VISITED_COOKIE = "portfolio_intro_visited";
export const CARD_SHOWN_COOKIE = "is_first_visit_Cardshown";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export const hasVisitCookie = (name: string): boolean => {
  if (typeof document === "undefined") return false;

  const match = document.cookie.match(`(?:^|;\\s*)${name}=1(?:\\s*;|$)`);
  return match !== null;
};

export const markVisitCookie = (name: string): void => {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=1; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
};
