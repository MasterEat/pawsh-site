---
name: Aura of Elegance
colors:
  surface: '#fbf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#fbf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ef'
  surface-container: '#efeeea'
  surface-container-high: '#eae8e4'
  surface-container-highest: '#e4e2de'
  on-surface: '#1b1c1a'
  on-surface-variant: '#3f4948'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f0ed'
  outline: '#707978'
  outline-variant: '#bfc8c7'
  surface-tint: '#2a6865'
  primary: '#003331'
  on-primary: '#ffffff'
  primary-container: '#004b49'
  on-primary-container: '#7ebab7'
  inverse-primary: '#95d1ce'
  secondary: '#615e57'
  on-secondary: '#ffffff'
  secondary-container: '#e7e2d8'
  on-secondary-container: '#67645c'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cca730'
  on-tertiary-container: '#4f3e00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b1eeea'
  primary-fixed-dim: '#95d1ce'
  on-primary-fixed: '#00201f'
  on-primary-fixed-variant: '#084f4d'
  secondary-fixed: '#e7e2d8'
  secondary-fixed-dim: '#cac6bd'
  on-secondary-fixed: '#1d1c16'
  on-secondary-fixed-variant: '#494740'
  tertiary-fixed: '#ffe088'
  tertiary-fixed-dim: '#e9c349'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#fbf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2de'
typography:
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 24px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  stack-xl: 64px
---

## Brand & Style
The design system embodies a premium, high-end sanctuary for pet grooming. It targets a discerning clientele who view their pets as family members deserving of the finest care. The visual narrative is "Spa-inspired Femininity"—combining the editorial sophistication of luxury beauty brands with the warmth and approachability required in pet care.

The style is **Minimalist with Tactile Softness**. It utilizes a "quiet luxury" aesthetic: heavy whitespace, a palette of warm neutrals, and meticulously typeset serif headlines. The UI avoids clutter, favoring a calm, slow-paced interaction model that feels professional yet deeply welcoming.

## Colors
This design system uses a sophisticated, low-vibrancy palette to evoke a sense of calm.

- **Primary (#004B49):** A deep, authoritative teal used for high-contrast elements, primary call-to-actions, and branding.
- **Secondary (#F5F0E6):** Warm beige used for surface layering, secondary buttons, and section backgrounds to create a soft, inviting atmosphere.
- **Tertiary (#D4AF37):** Subtle gold used sparingly for accents, icons, price tags, and premium status indicators.
- **Neutral (#FDFBF7):** The "Cream" base. This is the primary background color for all screens, providing a softer look than pure white.
- **Surface Tints:** Use 50% opacity of the warm beige for very subtle separators to maintain a "borderless" feel.

## Typography
The typography strategy contrasts an editorial, high-contrast serif with a modern, friendly sans-serif.

- **Playfair Display** is used for all headlines to establish the premium brand voice. It should be typeset with slightly tighter letter-spacing for large titles.
- **Plus Jakarta Sans** provides a clean, legible counterpoint for body text and UI labels. Its slightly rounded terminals complement the overall soft shape language of the design system.
- **Hierarchy Note:** Use the Gold accent color for `label-lg` to denote categories or "Members Only" services.

## Layout & Spacing
The layout follows a **Mobile-First Fluid Grid** with a focus on verticality and breathability.

- **Mobile (Base):** A single-column layout with 24px side margins. Elements are stacked using a 4px base unit, favoring `stack-lg` (32px) between unrelated sections to maintain the minimalist feel.
- **Tablet/Desktop:** Content is centered in a max-width container (1200px). For desktop, card layouts should shift to a 2 or 3-column grid to prevent excessively long line lengths for body text.
- **Safe Areas:** Ensure all tap targets are at least 48px in height, especially for booking flows. Use generous vertical padding in cards (minimum 24px) to emphasize the premium aesthetic.

## Elevation & Depth
Depth is communicated through **Tonal Layers and Ambient Shadows**.

- **Surface Strategy:** The background is the Cream neutral. Primary cards use the Beige secondary color or pure white with a very soft shadow.
- **Ambient Shadows:** Shadows should be extremely diffused. Use a hex value derived from the Teal (e.g., #004B49 at 8% opacity) with a large blur radius (20px-40px) and a subtle Y-offset (10px). This creates a "floating" effect rather than a "stuck" effect.
- **Depth Hierarchy:** 
  - Level 0: Cream background.
  - Level 1: Flat Beige containers for secondary information.
  - Level 2: White/Cream cards with ambient shadows for interactive elements.

## Shapes
The shape language is dominated by **Extra-Large Radii** to evoke a sense of safety, comfort, and friendliness.

- **Base Corner Radius:** 16px (1rem) for standard components like input fields and small cards.
- **Container Radius (rounded-xl/2xl):** Large layout cards and hero sections use 24px to 32px radii.
- **Interactive Elements:** Buttons and Chips use a fully pill-shaped (999px) treatment to maximize the "friendly" and "tap-friendly" feel.
- **Iconography:** Use a consistent 2pt stroke weight with rounded caps and joins to match the typography.

## Components
- **Buttons:**
  - *Primary:* Deep Teal background, white text, pill-shaped, 56px height for mobile.
  - *Secondary:* Clear with a 1px Gold border or Beige background with Teal text.
- **Cards:**
  - Use 24px padding and 32px corner radius. All images within cards should have a 16px radius.
- **Input Fields:**
  - Soft Beige background, no border, 16px radius. On focus, a subtle 1px Teal border.
- **Chips:**
  - Used for grooming services (e.g., "Full Groom," "Bath & Brush"). Pill-shaped, Beige background, Teal text.
- **Lists:**
  - Borderless. Use 16px vertical spacing between items. Separators should be a subtle 10% Teal tint.
- **Booking Calendar:**
  - A custom component using the Teal for selected dates and Gold for today’s date. High contrast on the Cream background.
- **Pet Profiles:**
  - Circular avatars with a 2px Gold "glow" or border to indicate a "premium" or "active" session.