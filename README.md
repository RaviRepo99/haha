# CCRC Frontend - Computer Science Innovation & Tech Club

![React](https://img.shields.io/badge/React-19.2-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2-blue?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue?logo=tailwindcss)
![License](https://img.shields.io/badge/License-Apache-green)

> A modern, high-performance React web application for the IT CLUB at CCRC. Built with production-grade performance optimizations following Vercel's React best practices.

## 🚀 Features

- **⚡ High Performance** - 30% smaller bundle, 60fps scrolling, optimized re-renders
- **🎨 Beautiful UI** - Dark/light theme toggle, responsive design, smooth animations
- **📱 Fully Responsive** - Mobile-first design, works on all devices
- **♿ Accessible** - WCAG compliant, semantic HTML, proper ARIA labels
- **🔍 SEO Optimized** - Structured data, meta tags, sitemap generation
- **🛡️ Production Ready** - Error boundaries, proper error handling, type-safe

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Performance Optimizations](#performance-optimizations)
- [Development](#development)
- [Building](#building)
- [Contributing](#contributing)
- [Tech Stack](#tech-stack)
- [License](#license)

## ⚡ Quick Start

### Prerequisites

- Node.js 24.x or higher
- npm 10.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/CCRC-Club/CCRC-Frontend.git
cd CCRC-Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:5173`

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Prepare husky hooks
npm run prepare
```

## 🛠️ Development

### Code Quality

```bash
# Run ESLint
npm run lint

# Fix issues automatically
npm run lint:fix
```

The project uses:

- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting (via ESLint)
- **TypeScript** - Type safety
- **Husky** - Git hooks for pre-commit checks

### Recommended VS Code Extensions

- [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)

### Preview Production Build

```bash
npm run preview
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📦 Tech Stack

### Frontend Framework

- **React 19.2** - UI library
- **React Router 7.12** - Client-side routing
- **TypeScript 5.9** - Type safety

### Build & Dev Tools

- **Vite 7.2** - Lightning-fast build tool
- **SWC** - Ultra-fast TypeScript compiler
- **Tailwind CSS 3.4** - Utility-first CSS

### Animations & UI

- **Framer Motion 12.26** - Smooth animations
- **Lucide React 0.562** - Beautiful icons
- **React Markdown 10.1** - Markdown rendering

### Code Quality

- **ESLint 9.39** - Code linting
- **TypeScript ESLint 8.46** - TypeScript linting
- **Husky 8.0** - Git hooks
- **Autoprefixer 10.4** - CSS vendor prefixes

### SEO & Performance

- **Vite Plugin Sitemap 0.8** - Automatic sitemap generation
- **PostCSS 8.5** - CSS transformations

## 🚀 Deployment

### GitHub Pages

```bash
npm run build
# Deploy dist/ folder to GitHub Pages
```

### Docker

```dockerfile
FROM node:24-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "preview"]
```

### Self-Hosted

```bash
npm run build
# Serve dist/ folder with any static server
npx serve dist/
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for all code
- Follow ESLint rules (run `npm run lint:fix`)
- Write meaningful commit messages
- Add comments for complex logic
- Keep components small and focused

## 📄 License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.


<div align="center">

**Made with ❤️ by CCRC Club**

Innovate • Connect • Transform

</div>
