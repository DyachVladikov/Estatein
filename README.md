# EstateIn Project Setup Guide

## 🚀 Quick Start

1. **Clone the repository**
2. **Install dependencies:**
   ```bash
   npm install
   ```

## 📦 Installed Dependencies

### Main Dependencies
- `react` & `react-dom` - React 19 for UI components
- `classnames` - Utility for conditional CSS classes
- `swiper` - Modern slider/carousel library
- `@a1rth/css-normalize` - CSS normalization for consistent styling across browsers

### Development Dependencies
- `typescript` - Type safety and better developer experience
- `vite` - Fast build tool and development server
- `sass` - CSS preprocessor with advanced features
- `eslint` - Code linting and quality checks
- `@svgr/rollup` & `vite-plugin-svgr` - Import SVG files as React components
- `postcss-pxtorem` - Convert px to rem units for better responsiveness

## ⚙️ Project Features

### 🔧 Built-in Configuration
- **Auto imports with `@/` prefix** - Path aliases already configured (`@/` → `/src/`)
- **SVG support** - Import SVGs as React components: `import Icon from './icon.svg?react'`
- **TypeScript** - Full type support configured
- **SASS/SCSS** - Preprocessor with module system (`@use` instead of deprecated `@import`)

### 📁 Project Structure
```
src/
├── @/                    # Alias for all imports from src
├── assets/              # Static files (images, fonts, icons)
├── components/          # Reusable React components
├── styles/             # Global and module styles
└── ...                 # Other source directories
```

## 🛠️ Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint code analysis
- `npm run preview` - Preview production build locally

## 💡 Important Notes

1. **Use `@/` for imports** instead of relative paths (`@/components/Button` instead of `../../components/Button`)
2. **SVG imports** require `?react` suffix: `import Icon from './icon.svg?react'`
3. **SASS imports** use `@use` syntax (old `@import` is deprecated)
4. **CSS normalization** is automatically applied via `@a1rth/css-normalize`

## 🐛 Troubleshooting

If auto-imports with `@/` don't work:
1. Ensure VS Code uses workspace TypeScript version
2. Restart VS Code TypeScript server (`Ctrl+Shift+P` → "TypeScript: Restart TS Server")
3. Check if `tsconfig.json` exists with proper path aliases

## 📄 License

Private repository - All rights reserved.