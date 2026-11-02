# PromptGuard Redesign Plan

## 1. Current token system (Midnight + Ice)
- Defined in `frontend/src/styles/index.css` (`:root`) and `frontend/src/styles/App.css`.
- Tokens: --bg #0B1120, --surface #111C30, --surface-sunk #0E1729, --ink #E2E8F0, --ink-muted #94A3B8, --line #263751, --font-sans Inter, --font-mono JetBrains Mono.
- Accent ice blue #38BDF8 / #22D3EE used in App.css and UI components.

## 2. Shared UI components and page usage
- `src/components/ui/` (Button, Card, Badge, Input, Textarea, Tabs, Dialog, Tooltip, Alert, Progress, Separator) — created, used in TextPlayground (Textarea, Button, Alert) and Overview indirectly.
- `src/components/Layout.jsx` — app shell, sidebar, topbar, footer. Used by all routes.

## 3. Spec rule -> files to change
- Icon tiles / header pills: `App.css` classes `.card-icon`, `.context-pill`, `.environment-pill`, `.nav-count`; `Layout.jsx`.
- Glow shadows: `App.css` (hero-glow, shadow vars).
- Stepper: `TextPlayground.jsx` ProcessSteps.
- Side panels: `TextPlayground.jsx` GuidancePanel, ProviderStatusPanel.
- Nav active state: `App.css` `.nav-link.active`, `Layout.jsx`.
- Textarea scrollbar: `App.css` / index.css.

## 4. Proposed order of work
1. Token migration (neutral near-black + red accent) in index.css.
2. Layout shell (sidebar, topbar).
3. Overview.
4. TextPlayground.
5. DocumentScanner.
6. Results.
7. Settings.
Risk areas: shared Layout affects all routes; ui components used in TextPlayground.

NOTE: Accent is cyan (#38BDF8); red reserved for danger states.
