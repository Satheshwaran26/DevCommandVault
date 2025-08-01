# DevCommandVault

A modern, responsive web application for storing and organizing your favorite developer commands and useful websites. Built with Next.js 15 and Tailwind CSS.

## Features

### 🏠 Dashboard
- Clean overview with three main cards: "Saved Commands", "Saved Websites", and "Add New"
- Quick stats showing total counts
- Minimalist design with soft shadows and rounded corners

### ⚡ Commands Management
- Add new commands with title, command, category, and notes
- Browse and search through saved commands
- Filter by categories (Git, Docker, Node.js, React, Database, etc.)
- Copy commands to clipboard with one click
- Syntax highlighted command display

### 🌐 Websites Collection
- Save useful websites with name, URL, tag, and description
- Visual card layout for easy browsing
- Filter by tags (Documentation, Tools, Learning, Design, APIs, etc.)
- Direct website access with external link
- Tag cloud for popular categories

### 🎨 Design Features
- Responsive layout that works on all devices
- Top navigation bar with branding
- Collapsible sidebar navigation
- Tailwind CSS for consistent styling
- Soft shadows, rounded corners, and proper spacing
- Hover effects and smooth transitions
- Modern gradient accents

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Icons**: Unicode emojis and SVG icons
- **Fonts**: Geist Sans and Geist Mono

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── add-command/       # Add new command form
│   ├── add-website/       # Add new website form
│   ├── commands/          # Commands listing page
│   ├── websites/          # Websites listing page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Dashboard homepage
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Layout.tsx         # Main layout wrapper
│   ├── Navbar.tsx         # Top navigation
│   └── Sidebar.tsx        # Side navigation
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Future Enhancements

- Data persistence with database integration
- User authentication and personal vaults
- Export/import functionality
- Command execution tracking
- Website favorites and ratings
- Search highlighting
- Keyboard shortcuts
- Dark mode support

## Contributing

Feel free to submit issues and pull requests to improve the application.

## License

This project is open source and available under the [MIT License](LICENSE).
#   D e v C o m m a n d V a u l t  
 