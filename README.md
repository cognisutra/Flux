<p align="center">
  <img src="https://img.shields.io/badge/Flux-Cognisutra-7c3aed?style=for-the-badge" alt="Flux by Cognisutra">
  <img src="https://img.shields.io/github/license/cognisutra/Flux?style=for-the-badge&color=7c3aed" alt="MIT License">
  <img src="https://img.shields.io/github/stars/cognisutra/Flux?style=for-the-badge&color=7c3aed" alt="GitHub Stars">
</p>

<h1 align="center">✨ Flux Animation Library</h1>

<p align="center">
  <strong>Smooth, performant CSS animations</strong><br>
  by <a href="https://cognisutra.in">Cognisutra</a>
</p>

<p align="center">
  <a href="https://fluxanimation.vercel.app/">🌐 Live Demo</a>
  &nbsp;·&nbsp;
  <a href="#installation">📦 Install</a>
  &nbsp;·&nbsp;
  <a href="#usage">🚀 Usage</a>
  &nbsp;·&nbsp;
  <a href="https://fluxanimation.vercel.app/">📚 Docs</a>
</p>

---

## 📦 Installation

**CDN** (via jsDelivr):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/cognisutra/Flux@main/docs/animate.min.css" />
```

**npm** (coming soon)

---

## 🚀 Usage

Add the `fl-animated` class to any element, along with an animation name:

```html
<h1 class="fl-animated fl-bounce">Hello, world!</h1>
```

Browse all **97 animations** on the [live demo](https://fluxanimation.vercel.app/).

### Customize

| Attribute | Example | Description |
|-----------|---------|-------------|
| `fl-` prefix | `fl-bounce`, `fl-fadeIn` | Animation name |
| `--fl-duration` | `style="--fl-duration: 2s"` | Duration |
| `--fl-delay` | `style="--fl-delay: 0.5s"` | Delay |
| `--fl-repeat` | `style="--fl-repeat: 3"` | Repeat count |

---

## 🎨 Animations

| Category | Animations |
|----------|-----------|
| **Attention** | `bounce`, `flash`, `pulse`, `rubberBand`, `shakeX`, `shakeY`, `headShake`, `swing`, `tada`, `wobble`, `jello`, `heartBeat` |
| **Back** | `backInDown`, `backInLeft`, `backInRight`, `backInUp`, `backOutDown`, `backOutLeft`, `backOutRight`, `backOutUp` |
| **Bouncing** | `bounceIn`, `bounceInDown`, `bounceInLeft`, `bounceInRight`, `bounceInUp`, `bounceOut`, `bounceOutDown`, `bounceOutLeft`, `bounceOutRight`, `bounceOutUp` |
| **Fading** | `fadeIn`, `fadeInDown`, `fadeInDownBig`, `fadeInLeft`, `fadeInLeftBig`, `fadeInRight`, `fadeInRightBig`, `fadeInUp`, `fadeInUpBig`, `fadeInTopLeft`, `fadeInTopRight`, `fadeInBottomLeft`, `fadeInBottomRight`, `fadeOut`, `fadeOutDown`, `fadeOutDownBig`, `fadeOutLeft`, `fadeOutLeftBig`, `fadeOutRight`, `fadeOutRightBig`, `fadeOutUp`, `fadeOutUpBig`, `fadeOutTopLeft`, `fadeOutTopRight`, `fadeOutBottomLeft`, `fadeOutBottomRight` |
| **Flip** | `flip`, `flipInX`, `flipInY`, `flipOutX`, `flipOutY` |
| **Lightspeed** | `lightSpeedInRight`, `lightSpeedInLeft`, `lightSpeedOutRight`, `lightSpeedOutLeft` |
| **Rotating** | `rotateIn`, `rotateInDownLeft`, `rotateInDownRight`, `rotateInUpLeft`, `rotateInUpRight`, `rotateOut`, `rotateOutDownLeft`, `rotateOutDownRight`, `rotateOutUpLeft`, `rotateOutUpRight` |
| **Slide** | `slideInDown`, `slideInLeft`, `slideInRight`, `slideInUp`, `slideOutDown`, `slideOutLeft`, `slideOutRight`, `slideOutUp` |
| **Zoom** | `zoomIn`, `zoomInDown`, `zoomInLeft`, `zoomInRight`, `zoomInUp`, `zoomOut`, `zoomOutDown`, `zoomOutLeft`, `zoomOutRight`, `zoomOutUp` |
| **Specials** | `hinge`, `jackInTheBox`, `rollIn`, `rollOut` |

---

## ♿ Accessibility

Flux respects the `prefers-reduced-motion` media query — users with motion sensitivity can opt out via their OS settings.

---

## 📄 License

MIT &nbsp;·&nbsp; by <a href="https://cognisutra.in">**Cognisutra**</a>
