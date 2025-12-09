# AGENTS_STYLE_GUIDE.md

## 🎨 Design System

Our project uses a premium dark mode aesthetic inspired by modern SaaS interfaces.

### Color Palette

We lean heavily on the **Slate** and **Sky** scales.

| Token | Hex | Tailwind Equivalent | Usage |
| :--- | :--- | :--- | :--- |
| **Background** | `#0f172a` | `slate-900` | Main body background |
| **Card Bg** | `#1e293b` | `slate-800` | Game cards, footers |
| **Text Primary** | `#cbd5e1` | `slate-300` | Body text |
| **Heading** | `#e2e8f0` | `slate-200` | Card titles, H2 |
| **Brand Gradient**| `#be185d` → `#f97316` | `pink-600` → `orange-500` | Main Header Background |
| **Accent/Action** | `#0ea5e9` | `sky-500` | Buttons, Active states |
| **Accent Hover** | `#0284c7` | `sky-600` | Button hover state |
| **Icon/Preview** | `#334155` | `slate-700` | Preview box background |
| **Icon Color** | `#22d3ee` | `cyan-400` | SVG stroke color |

### Typography

*   **Font Family**: 'Inter', sans-serif.
*   **Weights**:
    *   Light (300): Subtitles/Taglines.
    *   Regular (400): Body text.
    *   SemiBold (600): Buttons, Card Titles.
    *   Bold (700): Main Headers.

### Component Specs

#### Game Card
*   **Border Radius**: `12px`
*   **Shadow**: `0 4px 6px -1px rgba(0, 0, 0, 0.1)` (Tailwind `shadow-md`)
*   **Hover**: Translate Y `-8px`, Shadow `shadow-xl`.

#### Buttons
*   **Padding**: `0.85rem 1.8rem`
*   **Border Radius**: `8px`
*   **Transition**: `0.3s ease`

#### Game Board (In-Game)
*   **Grid Color**: Often `#334155` (Slate 700) or CSS Grid gap.
*   **Cell Size**: Typically `100px` by `100px` (responsive).
*   **Marks**:
    *   **X**: Generally Blue/Cyan (`#22d3ee`).
    *   **O**: Generally Pink/Rose (`#f472b6`).

### Icons
*   Use `stroke-width="2"`.
*   `stroke-linecap="round"`
*   `stroke-linejoin="round"`
*   Keep them abstract and minimal.
