---
name: Peach Milk Healing
colors:
  surface: '#fff8f5'
  surface-dim: '#e1d8d3'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fcf2ed'
  surface-container: '#f6ece7'
  surface-container-high: '#f0e6e1'
  surface-container-highest: '#eae1dc'
  on-surface: '#1f1b18'
  on-surface-variant: '#4e4540'
  inverse-surface: '#342f2c'
  inverse-on-surface: '#f9efea'
  outline: '#80756f'
  outline-variant: '#d2c4bd'
  surface-tint: '#6e5a50'
  primary: '#6e5a50'
  on-primary: '#ffffff'
  primary-container: '#ffe4d6'
  on-primary-container: '#796459'
  inverse-primary: '#dbc1b4'
  secondary: '#8e4e21'
  on-secondary: '#ffffff'
  secondary-container: '#ffab76'
  on-secondary-container: '#783d11'
  tertiary: '#336667'
  on-tertiary: '#ffffff'
  tertiary-container: '#bef3f3'
  on-tertiary-container: '#3e7171'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f8ddcf'
  primary-fixed-dim: '#dbc1b4'
  on-primary-fixed: '#261810'
  on-primary-fixed-variant: '#554339'
  secondary-fixed: '#ffdbc8'
  secondary-fixed-dim: '#ffb68a'
  on-secondary-fixed: '#321300'
  on-secondary-fixed-variant: '#71370b'
  tertiary-fixed: '#b7ecec'
  tertiary-fixed-dim: '#9cd0d0'
  on-tertiary-fixed: '#002020'
  on-tertiary-fixed-variant: '#174e4f'
  background: '#fff8f5'
  on-background: '#1f1b18'
  surface-variant: '#eae1dc'
  text-main: '#5C4A3D'
  text-muted: '#A8988A'
  shadow-peach: rgba(255, 171, 118, 0.2)
  ink-brown: '#4A3B31'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Quicksand
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  handwriting-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 20px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

The design system is centered on the concept of a "Digital Scrapbook"—a private, intimate sanctuary for couples. The brand personality is **healing, whimsical, and nurturing**, moving away from clinical software patterns toward a tactile, analog experience. 

The aesthetic is a hybrid of **Hand-Drawn Minimalism** and **Tactile Glassmorphism**. It utilizes intentional imperfection—such as wobbly lines, crayon-style textures, and paper-grain surfaces—to evoke a sense of warmth and human touch. The interface should feel "alive," as if it were a living garden or a physical diary being shared in real-time.

**Key Stylistic Directives:**
- **Texture:** Every surface should have a subtle noise or paper-grain overlay (approx. 3-5% opacity) to kill "digital flatness."
- **Illustration:** Use hand-drawn SVG strokes with varying weights to mimic ink on paper.
- **Atmosphere:** Floating background particles (hearts, stars, petals) should move with a slow, drift-like physics to create a dreamlike state.

## Colors

The "Peach Milk Cream" palette focuses on low-contrast, high-warmth tones that reduce eye strain and promote emotional calm. 

- **Primary (#FFE4D6):** Used for global backgrounds and large structural containers. It provides a creamy, "milk-tea" base.
- **Accent A (#FFAB76):** Reserved for high-intent actions, buttons, and decorative highlights. It represents the "Peach" energy.
- **Accent B (#B5EAEA):** Used sparingly for "fresh" moments—success states, growth-related icons (leaves/flowers), and secondary highlights.
- **Neutral (#FFF5F0):** The "Warm White" surface color. Use this for content cards to provide a subtle lift from the primary background.
- **Text Strategy:** Avoid pure black. Use **Warm Brown (#5C4A3D)** for all primary reading to maintain the "ink on paper" aesthetic. Secondary text uses a desaturated **Light Brown Gray (#A8988A)**.

**Shadow Strategy:**
Never use gray or black shadows. Shadows must be "tinted"—using a semi-transparent version of the Accent A or Primary color—to create a glowing, soft-focus depth.

## Typography

The typography system balances legibility with personality. 

1. **Titles/Headings:** Use **Plus Jakarta Sans** with high-roundedness. For "Handwritten" narrative moments (like diary entries or date displays), use the italicized variants to mimic a casual script.
2. **Body Text:** **Be Vietnam Pro** is selected for its friendly, contemporary humanist qualities. It remains highly legible for long-form private notes.
3. **Labels/Auxiliary:** **Quicksand**'s geometric roundedness is used for small metadata, buttons, and tags.

**Chinese Language Support:**
When rendering Chinese characters, prioritize system rounded fonts (e.g., *PingFang SC* with `border-radius` logic or *Microsoft YaHei UI*) to match the softness of the Latin characters. Titles should ideally use a "Hobo" or "Rounded" style font-weight.

## Layout & Spacing

The layout philosophy is **"Organic Grouping."** Rather than a rigid, mathematical grid, elements are treated as objects placed on a desk.

- **Grid Model:** A 12-column fluid grid is used for Desktop, but cards are often slightly offset (1-2 degrees of rotation) to maintain the handmade feel.
- **Rhythm:** Use generous white space (the `lg` and `xl` tokens) to allow content to "breathe," reinforcing the "healing" aspect.
- **Mobile:** Single-column layout with `margin-mobile`. Cards should have edge-to-edge padding to maximize the tactile "paper" surface area.
- **Desktop:** Multi-column (2-column for Hub) with wide gutters to prevent a cluttered "app-like" feel.

## Elevation & Depth

Depth is achieved through **Tonal Layering** and **Soft-Focus Shadows**. 

- **Surface 0 (Background):** Primary Cream Pink (#FFE4D6).
- **Surface 1 (Cards):** Warm White (#FFF5F0) with a 1px solid stroke in a slightly darker cream (#F5D6C6).
- **Surface 2 (Modals/Overlays):** Glassmorphic surfaces using the Neutral color at 80% opacity with a `backdrop-filter: blur(12px)`.

**Shadow character:**
Shadows are extremely diffused. 
- *Idle:* `0px 4px 20px rgba(255, 171, 118, 0.15)`
- *Hover:* `0px 12px 30px rgba(255, 171, 118, 0.25)` with a `scale(1.03)` transform.

## Shapes

The shape language is **Ultra-Soft**. 

- **Corners:** Standard components use a **16px-20px** radius. 
- **Buttons:** Use a pill-shape (full radius) to feel "squishy" and inviting.
- **Irregularity:** For decorative elements, use `border-radius` with slightly mismatched values (e.g., `20px 15px 22px 18px`) to simulate hand-cut paper.
- **Icons:** All icons must have rounded caps and joins, with a "hand-drawn" weight of 1.5pt to 2pt.

## Components

### Buttons
- **Primary:** Background #FFAB76, text #FFF, pill-shaped. On hover, they should "bloom" (expand slightly and increase shadow glow).
- **Secondary:** Background #FFF5F0, border 2px solid #FFAB76, text #FFAB76.

### Cards
- Paper-textured background. 
- Use "wobbly" borders (a 1px SVG path border rather than a standard CSS border where possible).
- Content should be padded with the `md` (24px) spacing unit.

### Input Fields
- Styled like "scraps of paper" or "underlined notebook entries."
- Focus state: The underline or border changes to #FFAB76 with a soft glow.
- Placeholder text in #A8988A.

### Chips & Tags
- Soft Mint Green (#B5EAEA) for positive/fresh status.
- Cream Pink (#FFE4D6) for neutral categories.
- Rounded 12px corners.

### Interactive "Magic" Elements
- **Cursors:** Custom cursor shaped like a soft dot. On hover over buttons, it morphs into a heart. On text fields, it morphs into a pencil.
- **Particles:** Heart and petal particles should spawn on "celebratory" actions (e.g., saving a memory).