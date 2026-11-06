import { expect, test } from "bun:test";
import { readBranding } from "./branding";

test("defaults apply when variables are unset or empty", () => {
  const branding = readBranding({ BRAND_TITLE: "", BRAND_COLOR_INK: "" });
  expect(branding.title).toBe("Glossza");
  expect(branding.tagline).toContain("Random szavak");
  expect(branding.openerButton).toBe("A Glossza feltárása");
  expect(branding.colors).toEqual({});
});

test("variables override text and map colors to theme variables", () => {
  const branding = readBranding({
    BRAND_TITLE: "Szótár",
    BRAND_TAGLINE: "Szavak",
    BRAND_OPENER_BUTTON: "Belépés",
    BRAND_COLOR_PAGE: "#fff",
    BRAND_COLOR_LINK: "red",
  });
  expect(branding).toEqual({
    title: "Szótár",
    tagline: "Szavak",
    openerButton: "Belépés",
    colors: { "--color-page": "#fff", "--color-link": "red" },
  });
});
