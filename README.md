# TypeScript AST Viewer and Editor

A visual tool for viewing and manipulating TypeScript Abstract Syntax Trees (ASTs). This project allows developers to interact with TypeScript code through an intuitive visual interface, making it easier to understand and modify code structures.

## Features

- 🌳 Visual representation of TypeScript AST nodes using an interactive flow diagram
- 🖥️ Monaco Editor integration for code editing
- 🔄 Real-time AST updates as you type
- 🎨 Modern, responsive UI built with SolidJS
- 🔍 Detailed node inspection and navigation
- 📝 TypeScript parsing using @typescript-eslint/parser

## Getting Started

### Prerequisites

- Node.js >= 22
- pnpm (recommended package manager)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Technology Stack

- [SolidJS](https://www.solidjs.com/) - A performant and efficient reactive JavaScript library
- [Vinxi](https://vinxi.vercel.app/) - The full stack web framework
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Powerful code editor with TypeScript support
- [@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint) - TypeScript AST parsing
- [@xyflow/solidjs](https://github.com/nobie-org/xyflow) - Flow diagram visualization (SolidJS port)
- [@solidjs/router](https://github.com/solidjs/solid-router) - Routing solution for SolidJS

## Development

The project uses a modern development setup:

- 📦 pnpm workspaces for package management
- 🛠️ Rollup for building the xyflow integration
- 🎯 TypeScript for type safety
- 🚀 Fast refresh during development

To build the xyflow integration separately:
```bash
pnpm build:xyflow
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
