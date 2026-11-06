const COLOR_ENV = {
  "--color-page": "BRAND_COLOR_PAGE",
  "--color-ink": "BRAND_COLOR_INK",
  "--color-muted": "BRAND_COLOR_MUTED",
  "--color-link": "BRAND_COLOR_LINK",
  "--color-error": "BRAND_COLOR_ERROR",
};

export type Branding = {
  title: string;
  tagline: string;
  openerButton: string;
  colors: Record<string, string>;
};

// Unset colors fall back to the defaults in styles.css.
export function readBranding(env: Record<string, string | undefined>): Branding {
  const colors: Record<string, string> = {};
  for (const [cssVar, name] of Object.entries(COLOR_ENV)) {
    const value = env[name];
    if (value) colors[cssVar] = value;
  }
  return {
    title: env.BRAND_TITLE || "Glossza",
    tagline: env.BRAND_TAGLINE || "Random szavak gyűjteménye, amik jól hangzanak.",
    openerButton: env.BRAND_OPENER_BUTTON || "A Glossza feltárása",
    colors,
  };
}
