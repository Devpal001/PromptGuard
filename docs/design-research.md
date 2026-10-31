# Design Research and UI Direction

**Phase:** 2 - Design research and UI direction  
**Date:** October 31, 2026  

---

## References Reviewed

### Component Libraries (Reviewed for inspiration)
- **React Bits** - Modern React component patterns, animations. Focused on utility components.
- **Aceternity UI** - Clean, modern UI components with good accessibility. Inspired card designs.
- **21st.dev** - Community component library with diverse styles. Reviewed for patterns.
- **Uiverse** - Creative UI elements. Used for inspiration only, not copied.
- **Magic UI Pixel Image** - Visual effects. Decided against decorative effects behind controls.

### Design Inspiration Sites
- **Footer.Design** - Clean footer layouts. Inspired footer structure.
- **Storefront.Design** - E-commerce layouts with good hierarchy. Noted for spacing.
- **Gridddy** - Grid systems and layouts. Used for responsive grid ideas.
- **Awwwards** - High-quality design inspiration. Focused on security/analysis sites.
- **Siteinspire** - Curated design inspiration. Reviewed dashboard layouts.
- **Recent.Design** - Current design trends. Focused on professional, restrained styles.

**Note:** All sites reviewed as inspiration only. No entire sites copied, no unrelated styles combined.

---

## Design Decisions

### Color Palette
**Chosen:** Calm, polished security-analysis workspace aesthetic
- **Background Primary:** `#0f172a` (dark navy)
- **Background Secondary:** `#1e293b` (charcoal)
- **Surface:** `#334155` (neutral)
- **Borders:** `#475569`
- **Accent Primary:** `#14b8a6` (teal)
- **Accent Secondary:** `#06b6d4` (cyan)
- **Text Primary:** `#f1f5f9`
- **Text Secondary:** `#cbd5e1`

**Semantic Colors:**
- **Safe/Success:** `#22c55e` (green)
- **Risky/Needs Review:** `#f59e0b` (amber)
- **Blocked/Possible Failure:** `#ef4444` (red)
- **Error/Neutral:** `#64748b` (gray)

### Typography
- **Font Family:** System font stack for performance and readability
- **Headings:** Inter, system-ui, sans-serif
- **Body:** Inter, system-ui, sans-serif
- **Monospace:** 'Fira Code', 'Consolas', monospace (for code/evidence)

### Layout Principles
- **Sidebar Navigation:** Compact, clear hierarchy
- **Top Bar:** Shows active mode and page context
- **Card-based:** Results in clear cards with proper spacing
- **Responsive:** Mobile-first approach with breakpoints
- **Clear Separation:** Scanner results and chatbot results visually distinct

### Animation & Effects
- **Subtle only:** Transitions 150-200ms
- **Purposeful:** Loading states, button feedback
- **Reduced motion:** Respect `prefers-reduced-motion`
- **No decorative behind controls:** All effects are above/purposeful
- **No auto-playing animations**

### Component Choices
From Aceternity UI patterns: Card components with borders
From React Bits: Clean form elements
Custom components for security-specific UI (evidence lists, result badges)

---

## UI Direction Summary

**Goal:** Calm, polished security-analysis workspace, not a "hacker terminal"

**Key Characteristics:**
- Professional dark theme suitable for analysis
- Clear information hierarchy
- Distinct visual treatment for scanner vs chatbot results
- Color-coded semantic states
- Accessible and responsive
- Educational tone, not intimidating

**Inspiration Sources Used:**
- Aceternity UI - Card and layout patterns
- Siteinspire - Dashboard layouts for analysis tools
- Gridddy - Grid systems and spacing
- Footer.Design - Clean footer ideas

**Rejected:**
- Matrix-style green text on black
- Heavy animations/effects
- Decorative backgrounds
- Terminal/cyberpunk aesthetics

---

## Dependency Considerations

Before adding components, checked:
- **React Bits:** MIT license - OK
- **Aceternity UI:** MIT license - OK  
- **21st.dev:** Varies by component - check individual
- **Uiverse:** Mixed licenses - avoid copying complex components
- **Magic UI:** Check license per component

**Decision:** Build custom components following patterns from these libraries rather than copying full components. This avoids license concerns and ensures consistency.

---

## Excalidraw Files Created
- `docs/user-flow.excalidraw` - Complete user flow diagram
- `docs/wireframes.excalidraw` - App shell and key page wireframes
