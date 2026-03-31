# Nexus Core - Futuristic Corporate Landing Page

An ultra-modern, visually stunning corporate landing page featuring a 3D animated background, glassmorphism design, and smooth animations. Built with pure HTML, CSS, JavaScript, Three.js, and anime.js.

![Nexus Core Preview](https://via.placeholder.com/1200x630/05070a/00f2ff?text=Nexus+Core+Preview)

## ✨ Features

- **Immersive 3D Background** - Animated torus knot with orbiting spheres, particle systems, and interactive mouse parallax
- **Glassmorphism Design** - Frosted glass cards with backdrop blur and neon cyan accents
- **Advanced Animations** - Staggered text entrance, scroll-triggered reveals, button hover effects (powered by anime.js)
- **Fully Responsive** - Optimized for mobile, tablet, and desktop devices
- **Dark/Light Mode** - Automatically adapts to system color scheme preferences
- **Smooth Performance** - Lightweight Three.js implementation with 60fps animations

## 🚀 Live Demo

[View Live Demo](#) *(Add your GitHub Pages link here)*

## 📁 Project Structure
nexus-core/
├── index.html # Main HTML structure
├── style.css # All styling and responsive design
├── script.js # Anime.js animations and interactivity
├── three-background.js # Three.js 3D background module
├── README.md # Project documentation
└── LICENSE.txt # License information

## 🛠️ Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Glassmorphism, gradients, flexbox, grid, responsive design
- **JavaScript (ES6+)** - Modern JS features
- **Three.js** - 3D graphics and animations
- **anime.js** - Advanced timeline animations
- **Google Fonts** - Inter typography

## 🎨 Design Highlights

- **Color Palette**: Deep space blue (#05070a) with electric cyan (#00f2ff) accents
- **Typography**: Clean, professional Inter font family
- **Effects**: Backdrop blur, glow shadows, gradient text, smooth transitions
- **Interactivity**: Mouse-follow camera movement, hover animations, scroll reveals

## 📦 Installation & Usage

1. **Clone the repository**
```bash
git clone https://github.com/oltionshumollii/nexus-core.git 
```
2.**Navigate to the project folder**-
```
cd nexus-core
```
3.**Open in browser**-
```
Simply open index.html in any modern web browser (Chrome, Firefox, Safari, Edge recommended).

No build tools or dependencies required - all libraries are loaded via CDN.
```

**🔧 Customization**
**Colors**
Modify the color variables in style.css:

```css
/* Main accent color */
border-color: #00f2ff;
background: linear-gradient(105deg, #00b4ff, #0077ff);
```
**3D Background**
Adjust parameters in three-background.js:
```
Particle count: particleCount = 2200

Camera position: camera.position.set(0, 2, 12)

Animation speed: time += 0.012
```
**Content**
Edit text content in index.html to match your brand.

**📱 Responsive Breakpoints**-
**Desktop:** 1300px+ (full experience)

**Tablet**: 900px (adjusted typography and spacing)

**Mobile:** 550px (stacked layout, smaller text)

**⚡ Performance**
<li>Lightweight Three.js scene with optimized particle count</li>

<li>CSS transforms for smooth animations</li>

<li>Lazy-loading ready structure</li>

<li>No external images - pure CSS/JS graphics</li>
<BR>
**🤝 Contributing**
This is a personal portfolio project. While not open for direct contributions, feedback and suggestions are welcome via GitHub Issues.

**📄 License**
This project is protected under a Custom Personal Use License. See the LICENSE.txt file for full details.
