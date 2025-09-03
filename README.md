# Interactive Computer Networking Presentation

This is a React application for Interactive Computer Networking Presentation, converted from Figma and built with modern web technologies.

## Features

- **Interactive Learning Platform**: Comprehensive computer networking education
- **Modern React Architecture**: Built with React 18, TypeScript, and Vite
- **Beautiful UI Components**: Using Radix UI and Tailwind CSS
- **Responsive Design**: Works on desktop and mobile devices
- **Node.js 20+**: Modern JavaScript runtime support

## Prerequisites

- Node.js 20.0.0 or higher
- npm 10.0.0 or higher

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd computer-networking
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks
- `npm run type-check` - Run TypeScript type checking

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 3
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Runtime**: Node.js 20+

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   └── figma/          # Figma-specific components
├── styles/             # Global styles
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global CSS with Tailwind directives
```

## Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Quick Deploy

1. **Fork or clone this repository**
2. **Update the homepage URL** in `package.json`:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/REPOSITORY_NAME"
   ```
3. **Run the setup script**:
   ```bash
   ./setup-git.sh
   ```
4. **Create GitHub repository** and push:
   ```bash
   git push -u origin main
   ```
5. **Enable GitHub Pages** in repository settings (Source: GitHub Actions)

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Live Demo

Once deployed, your site will be available at:

```
https://YOUR_USERNAME.github.io/REPOSITORY_NAME
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
