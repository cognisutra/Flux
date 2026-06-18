# Flux

**99 scroll-triggered animations. Zero dependencies.**

Flux is a lightweight animation library that lets you add smooth, performant CSS animations to any element when it scrolls into view. Just add a `data-aos` attribute — no JavaScript configuration needed.

[Browse Animations](animations.html) · [Documentation](docs.html) · [Live Demo](index.html)

---

## Features

- **99 animations** across 25 categories — fade, flip, slide, zoom, bounce, spring, perspective, rotate, reveal, wipe, attention effects, and more
- **Zero dependencies** — ~6KB gzipped, no jQuery or other libraries required
- **Framework agnostic** — works with any HTML/JS/CSS stack (React, Vue, Svelte, vanilla, etc.)
- **Scroll-driven** — animations trigger automatically when elements enter the viewport
- **Per-element control** — configure duration, delay, easing, offset, trigger point, and repeat behaviour via data attributes
- **Performant** — uses CSS transitions and `requestAnimationFrame` for smooth 60fps animation
- **Auto-initializes** — drop in the files and animations just work

## Quick Start

```html
<link rel="stylesheet" href="flux.css">
<script src="flux.js"></script>

<div data-aos="fade-up">Hello World</div>
```

That's it. Flux auto-initializes on DOMContentLoaded.

## Install

Copy `flux.css` and `flux.js` into your project.

### CDN (jsDelivr)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/cognisutra/Flux@latest/flux.min.css">
<script src="https://cdn.jsdelivr.net/gh/cognisutra/Flux@latest/flux.min.js"></script>
```

Or pin a specific version (recommended):
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/cognisutra/Flux@v1.0.0/flux.min.css">
<script src="https://cdn.jsdelivr.net/gh/cognisutra/Flux@v1.0.0/flux.min.js"></script>
```

## Usage

### Basic

```html
<div data-aos="fade-up">Content</div>
<div data-aos="zoom-in" data-aos-duration="800">Content</div>
<div data-aos="slide-left" data-aos-delay="200">Content</div>
```

### With all options

```html
<div
  data-aos="bounce-in"
  data-aos-duration="1000"
  data-aos-delay="300"
  data-aos-easing="ease-out-back"
  data-aos-offset="150"
  data-aos-once
  data-aos-anchor-placement="center-center"
>
  Animated Content
</div>
```

### JavaScript API

```javascript
// Custom global defaults
Flux.init({
  offset: 100,
  duration: 600,
  easing: 'ease-out-cubic',
  once: false,
  mirror: false,
  anchorPlacement: 'top-bottom'
});

// Re-scan DOM for new elements
Flux.refresh();

// Replay all visible animations
Flux.replay();

// Reset all animations
Flux.reset();

// Clean up
Flux.destroy();
```

## Data Attributes

| Attribute | Description | Default |
|---|---|---|
| `data-aos` | Animation name | — |
| `data-aos-duration` | Animation length (ms, 50–3000) | `600` |
| `data-aos-delay` | Stagger delay (ms, 50–3000) | `0` |
| `data-aos-easing` | Easing curve | `ease-out-cubic` |
| `data-aos-offset` | Trigger offset (px) | `120` |
| `data-aos-once` | Animate only once | `false` |
| `data-aos-mirror` | Re-trigger on scroll back | `false` |
| `data-aos-anchor-placement` | Trigger point (`{el}-{viewport}`) | `top-bottom` |

## Animation Categories

| Category | Count | Animations |
|---|---|---|
| Fade | 9 | fade-in, fade-up, fade-down, fade-left, fade-right + 4 diagonals |
| Flip | 4 | flip-left, flip-right, flip-up, flip-down |
| Slide | 4 | slide-up, slide-down, slide-left, slide-right |
| Zoom | 10 | zoom-in, zoom-out + 4 directional variants each |
| Bounce | 5 | bounce-in, bounce-in-up, bounce-in-down, bounce-in-left, bounce-in-right |
| Back | 4 | back-in-up, back-in-down, back-in-left, back-in-right |
| Attention | 8 | bounce, flash, pulse, shake-x, shake-y, swing, heartbeat, jello |
| Reveal | 4 | reveal-left, reveal-right, reveal-up, reveal-down |
| Special | 6 | rotate-in, rotate-out, blur-in, blur-in-up, skew-in, clip-in |
| Extra | 6 | scale-x, scale-y, perspective-in, elastic-up, elastic-left, elastic-right |
| Perspective | 5 | perspective-out, perspective-up, perspective-down, perspective-left, perspective-right |
| Spring | 4 | spring-up, spring-down, spring-left, spring-right |
| Glide | 4 | glide-up, glide-down, glide-left, glide-right |
| Rotate | 4 | rotate-down-left, rotate-down-right, rotate-up-left, rotate-up-right |
| Fold | 4 | fold-up, fold-down, fold-left, fold-right |
| Stretch | 2 | stretch-x, stretch-y |
| Wipe | 4 | wipe-left, wipe-right, wipe-up, wipe-down |
| Roll | 2 | roll-in, roll-out |
| Spin | 2 | spin-in, spin-out |
| LightSpeed | 2 | light-speed-in, light-speed-out |
| Float | 2 | float, float-reverse |
| Drop | 1 | drop-in |
| Dangle | 1 | dangle |
| Rattle | 1 | rattle |
| Pop | 1 | pop-in |

[Browse all 99 animations with live preview →](animations.html)

## Easing Functions

Use with `data-aos-easing`:

`linear` · `ease` · `ease-in` · `ease-out` · `ease-in-out` · `ease-out-cubic` · `ease-in-out-cubic` · `ease-out-quart` · `ease-in-out-quart` · `ease-out-quint` · `ease-in-out-quint` · `ease-out-expo` · `ease-in-out-expo` · `ease-out-back` · `ease-in-out-back`

## Browser Support

All modern browsers (Chrome, Firefox, Safari, Edge). IE11 is not supported.

## License

MIT
