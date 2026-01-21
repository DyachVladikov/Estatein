/// <reference types="vite/client" />

// Декларация для SVG как React компонентов
declare module '*.svg?react' {
  import React from 'react';
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

// Декларация для обычных SVG (как строки)
declare module '*.svg' {
  const content: string;
  export default content;
}

// Декларация для изображений
declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

// Для других типов файлов
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}