# PromptGuard UI Redesign Spec

ROLE
You are a senior product designer and front-end engineer. Redesign the visual layer of PromptGuard (an AI prompt-injection testing app) so it feels clean, calm and highly professional, in the spirit of Linear, Vercel, Stripe and Raycast. This is a presentation-layer task only.

HARD CONSTRAINTS
- Do not change functionality, routes, state logic, API calls or data flow. Keep all existing copy meaning; tighten wording where it reduces clutter.
- Do not add dependencies unless truly necessary. Use CSS transitions, not an animation library.
- Keep everything accessible: semantic HTML, visible focus states, keyboard navigation, WCAG AA contrast, prefers-reduced-motion respected.

DESIGN DIRECTION
Swiss Modernism 2.0 with a soft UI touch: strict grid, left-aligned layouts, strong typographic hierarchy, generous whitespace, very few elements per view. "Soft" means gentle radii and subtle tonal layering between surfaces, never glows, heavy shadows or glassmorphism. Keep the dark theme, but make it a neutral near-black with low-saturation surfaces (drop the heavy navy tint). Structure tokens so a light theme can be added later.

CORE PRINCIPLES TO APPLY
1. Hierarchy: each screen has one obvious primary action and one clear title. Everything else is visually secondary.
2. Affordance honesty: only interactive elements get fills, borders and hover states. Anything non-interactive must NOT look like a button.
3. Progressive disclosure: explanations and rules are hidden until requested, not shown beside the task.
4. Proximity and grouping: related items sit together, separated by whitespace rather than boxes or divider lines. Avoid card-in-card.
5. Consistency: one spacing scale, one type scale, one radius set, one icon style, one set of component states.
6. Restraint: if an element does not help the user complete the task or understand a result, remove it.
7. State clarity: loading, empty, error, success, disabled and focus states are all designed. Never rely on colour alone; pair status colour with a label or icon.

DESIGN TOKENS (define as CSS variables in one place)
- Spacing: 4px base scale (4, 8, 12, 16, 24, 32, 48, 64). Page content max-width about 1120px; reading/form column about 720px.
- Type: Inter (or current font). Scale 12/13, 14, 16, 20, 28, 40. Two weights mainly (400/500) plus 600 for titles. Tight tracking on large titles. Line-height 1.5 body, 1.15 headings. Monospace only for prompt/code content.
- Radius: 6px controls, 10px surfaces. No pill shapes except the segmented control.
- Colour: neutral scale for background, surface, raised surface, border (one low-contrast border colour), text primary / secondary / tertiary (secondary and tertiary must still meet 4.5:1 for body text). Accent (main colour) is red: fill about #DC2626 with white label (verify at least 4.5:1), hover slightly darker, and a lighter red (about #F87171) for accent text/links on dark. Accent is used only for the primary button, links, focus ring and the active nav indicator. Define separate success, warning and danger tokens for scan results. Because the brand is red, risk states must be communicated with an explicit label plus icon on a tinted surface, so a red button is never confused with a "dangerous" verdict.
- Elevation: flat by default. At most one subtle shadow level for popovers/menus. Remove all glow effects and coloured shadows.

COMPONENT RULES
- Icons: remove every icon-in-a-rounded-tile. Keep icons only in the sidebar nav (16px, outline, same stroke) and inside buttons where they genuinely help. Maximum one icon per card; prefer none. No decorative icons or numbered badges.
- Badges/status: non-interactive status is plain text with a small dot (8px) or a tinted text style. Not pill-shaped, not bordered, not button-sized. Remove "Educational use", "Demo target", "Session only", "Files processed in session", "Workspace" and similar header pills; surface that information once, in context (see screens).
- Buttons: three levels only. Primary (solid accent), secondary (quiet outlined or subtle fill), tertiary (text link). One primary per view. 36 to 40px height, consistent padding.
- Cards: use sparingly. Prefer a single surface with a hairline border and consistent padding. Prefer open layouts with spacing over many bordered boxes.
- Segmented control (for Demo / Connected): the only place a pill-like control is allowed, and it must clearly be a control.
- Scrollbars and textarea: replace the default white native scrollbar with a thin, dark, themed scrollbar. Textarea resizes vertically only.

SCREEN-BY-SCREEN CHANGES
Global shell
- Sidebar: wordmark with a simple small mark (no icon tile), nav items as icon plus text, active item shown by a subtle background and a 2px accent indicator on the left edge. Remove the "AI" white pill. Remove the "Built for safe testing" card: move that line into Help/Settings or a single quiet text line in the sidebar footer. Replace the "Local workspace" block with one muted line: dot + "Local, session only". Remove the "Live" badge (use a small dot only if a run is actually in progress).
- Top bar: breadcrumb on the left, one muted status text on the right ("Demo mode"), nothing else.
- Remove eyebrow labels above page titles. Each page header is: title, one-line description, and a primary action only if the page needs one.

Overview
- Compact hero: title, one supporting sentence, primary button plus a tertiary text link. Remove the glowing shield graphic and the second heading style. Keep the two-tone headline only if it stays quiet; otherwise use a single colour.
- "Runtime overview": replace icon cards with a simple two-column definition list (label left, status right) with hairline separators. No icons.

Text playground
- Single-column flow, about 720px wide. The three-step stepper becomes a slim text-only indicator ("1 Scan  2 Review  3 Test") where only the current step is emphasised; completed steps are muted with a check, future steps are tertiary. Show only the current step's content.
- Put the target mode (Demo / Connected) in the input card as a segmented control next to the Scan button, not in a separate card below.
- "How to read the results" and the "risky text needs confirmation" note move into a collapsible "How results are scored" disclosure under the input, closed by default. Show the confirmation note only at the moment it applies.
- "Load sample attack" is a tertiary text button below the textarea; the character counter is quiet.

Document scanner
- The dropzone is the hero of the page: generous height, dashed hairline border, one small upload icon, one line of text, hover/drag-over state with a subtle accent border.
- Replace the right-hand panel with one quiet helper line under the dropzone: "PDF or TXT, up to 4 MB. Processed in this session and not stored. No OCR for scanned PDFs." Longer details go in a "What happens to my file" disclosure.
- Fix any mismatch between the 4 MB text and the "Maximum file size" label so the limit is stated once.

Test results
- Empty state: centred or left-aligned minimal block with title, one sentence and one primary button (secondary action as text link). One muted icon at most.
- Replace the "Two signals, kept distinct" cards with a small text note or disclosure. When real results exist, present Input screening and Chatbot evaluation as two clearly labelled sections with a plain-text verdict (label plus icon plus colour) and expandable evidence.

Settings
- Group into plain rows: label and description left, control or value right, hairline separators. Remove the per-row checkmark icons and the "Active" pill (show "Active" as a text-and-dot status). Present the privacy points as a simple list. Combine the "Screening aid only" note into one quiet footnote.

MOTION (subtle, purposeful, never decorative)
- Durations 120 to 200ms, ease-out (for example cubic-bezier(0.2, 0, 0, 1)). Animate only transform and opacity (plus colour/border transitions).
- Buttons and links: hover colour shift, 1px press (translateY or scale 0.98), no glow.
- Inputs and focus: smooth border/ring transition on focus.
- Page and step changes: one 8px fade-up on content when a page or step changes. Do not stagger or animate every card.
- Disclosures, dropdowns, popovers: height/opacity expand and collapse.
- Results appearing: gentle fade-in; loading uses a restrained skeleton or small spinner.
- No looping, pulsing, parallax, bouncing or glowing animations. Under prefers-reduced-motion, disable all transform animation and keep only instant state changes.

QUALITY BAR AND DELIVERY
- Test at 1280, 1024, 768 and 390px widths. Sidebar collapses to a menu on small screens. No horizontal scroll. Touch targets at least 40px on mobile.
- Check contrast of all text and the accent button. Verify keyboard tab order and visible focus on every control.
- Run the existing build, lint and tests; nothing functional should change.
- Finish with a short summary: what was removed, what was simplified, the final token list, and anything you intentionally left unchanged.

NOTE: Accent is cyan (#38BDF8), not red. Red is reserved for danger states only.
