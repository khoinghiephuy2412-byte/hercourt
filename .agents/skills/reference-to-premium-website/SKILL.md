---
name: reference-to-premium-website
description: Turn a public reference website URL into a premium, responsive, editable website, with Antigravity-led browser research, design system, implementation, screenshot comparisons, and functional QA.
---

# URL to premium web: Antigravity execution protocol

Use this skill when the user supplies a website URL and wants a similar or better original website, or asks to improve a web UI to premium quality. The user controls the site name and branding. If neither is specified, use neutral temporary branding and mark it for replacement; do not copy unrelated trademarks.

## Stage 0 — Safety and repository reconnaissance
- Read repository README, package.json, AGENTS.md, existing .agents skills/rules and README. Follow existing stack and dependencies; do not overwrite existing work.
- Make a short TODO with explicit acceptance criteria. Verify tools exist; never claim access without a tool check.
- Respect access controls and terms, avoid paid/login-only pages unless user provides authorized access. Do not download protected assets.

## Stage 1 — Reference analysis (MUST precede implementation)
- Navigate to supplied public URL using Antigravity's browser tools (or configured Playwright if needed).
- Capture 1440x900 and 390x844 screenshots; optionally 768x1024. Capture at least: top fold, below-fold, open navigation, and critical interactions if they exist.
- Record route map; content hierarchy; component inventory; typography families/weights; approximate font scale; colors; container widths; spacing; radius; elevation; images and their provenance; hover/focus states; responsive breakpoints; motion language.
- Write `docs/reference-analysis.md`. Distinguish observed evidence from inferred choices.

## Stage 2 — Define the distinct branded design direction
- If available, use `ui-ux-pro-max` for design-system ideas. Search 21st MCP for reusable components only where needed.
- Define design tokens using CSS variables or project theme convention; preserve reference information architecture while establishing own distinctive brand.
- Prepare desktop+mobile component plan. Ask for permission before importing unlicensed assets. Prioritize user-provided images or verifiably licensed sources. Never use fabricated product prices/ratings or nonworking controls.

## Stage 3 — Implement end to end
- Build reusable components for Header/Nav, Hero, sections, cards, CTA, Footer and any actual reference behaviors.
- Keep code semantic and keyboard-accessible (visible focus, proper labels, meaningful alt text, reduced motion support).
- Add responsive behavior at target breakpoints; prioritize matching mobile composition as well as desktop.
- Make all user-facing buttons and links real; mark integrations that need backend distinctly.

## Stage 4 — Visual verification loop (REQUIRED)
- Run the local dev server on a free port. Inspect using Antigravity's built-in browser, including DevTools console/network. When supported, use Playwright MCP for deterministic interaction sequences.
- Produce matched-viewport screenshots for reference and local site. Compare: header, hero, typography, spacing, cards, media crops, colors, shadows, motion, footer, and mobile navigation.
- Iterate on the highest-impact discrepancies. Do not declare pixel-perfect without a measured comparison, or claim complete parity if source pages are inaccessible.
- Save evidence in `docs/visual-qa/` when practical; avoid committing large raw recordings unintentionally.

## Stage 5 — Quality gate
- Inspect available scripts and run project lint, typecheck, tests, build. Test at least homepage, navigation, primary CTA and mobile menu in the browser; check overflow and console errors.
- Aim for strong accessibility, performance and stability; do not fabricate scores. Validate real scores only when measured.
- Report which steps passed and which could not be performed.

## Stage 6 — Handover
- Return local run command, actual localhost address if server is running, list of changed files, screenshots and tests, and a short unresolved-items list.
- If using multiple Antigravity agents, assign them isolated worktrees or nonoverlapping file ownership. Have a single integrating owner.
- Request explicit approval before deployment, destructive operations, credential storage, or site-wide scraping.

## Recommended complementary skills
- `.agents/skills/clone-website/SKILL.md` if using JCodesMore website-cloner template.
- `ui-ux-pro-max` for systematized design intelligence.
- `web-design-guidelines`, `react-best-practices` from Vercel agent-skills.
