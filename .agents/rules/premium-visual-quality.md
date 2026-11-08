# Premium web quality rules

Apply these rules to all visual/frontend work in this repository.

1. Antigravity is the primary owner of implementation, preview, verification, and final report. Do not delegate core UI ownership to another external coding assistant.
2. Given a reference URL, inspect the actual site through the available Antigravity browser. Do not invent unseen sections, functions, assets, or content. Document inaccessible pages explicitly.
3. Inspect relevant pages at desktop (1440x900), tablet (768x1024), and mobile (390x844) if supported. Capture reference and implementation screenshots at matched sizes.
4. Build semantic, responsive, accessible, typed, maintainable components. Prefer existing project stack and conventions. Use Next.js/React/Tailwind/shadcn only if the project already uses them or the project is new.
5. Create a consistent design system: spacing scale, type scale, palette, radii, shadows, motion and component variants. Avoid generic template appearance, overflow, clutter, oversized blur, excessive gradients and random animation.
6. Use the ui-ux-pro-max skill when installed; consult relevant Vercel web-design-guidelines/react-best-practices skills when installed. If unavailable, continue and report the limitation; do not fabricate tool output.
7. Use 21st MCP components only if the MCP is connected; review any generated code before integrating it. Prefer native Antigravity browser tools before adding overlapping browser MCPs.
8. Assets: use user-supplied or properly licensed assets; preserve attribution/permissions where required. Do not pretend that hotlinked images, screenshots, or iframe embeds are a complete implementation. Do not copy third-party proprietary branding or logos unless authorized.
9. Implement functionality honestly: navigation and local UI interactions should work; anything requiring API credentials, external services, payment or backend must be declared as unimplemented until connected.
10. Visual QA loop: screenshot -> diagnose biggest discrepancies -> fix -> screenshot again. Pay attention to source assets, spacing, font rendering, header, hero, grids, responsive behavior, interactions, and browser console.
11. Validate with available lint, typecheck, build and Playwright/browser checks. Never claim success unless actually run. If package.json scripts differ, inspect before executing.
12. Use an isolated Git worktree for parallel changes; never let two agents modify the same files concurrently. No destructive commands, credential exposure, unauthorized scraping, external posting or production deployment without approval.
13. Provide an end report: changes, tested routes/viewport sizes, screenshots, commands run/results, local URL if server actually started, and remaining limitations.
