# InnovateHer Website

A collaborative React-based website for InnovateHer, empowering women in innovation and technology.

## Project Structure

```
src/
├── components/          # Individual section components
│   ├── TitleCard.jsx   # Hero section
│   ├── About.jsx       # About section
│   ├── Tracks.jsx      # Tracks section
│   ├── ExecBoard.jsx   # Executive board section
│   ├── FAQ.jsx         # FAQ section
│   ├── Teams.jsx       # Teams section
│   └── Sponsors.jsx    # Sponsors section
├── App.jsx             # Main app component
├── App.css             # App styles
├── main.jsx            # React entry point
└── index.css           # Global styles
index.html             # HTML entry point
package.json           # Project dependencies
vite.config.js         # Vite configuration
```

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **CSS** - Styling
- **JavaScript** - Interactivity

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd InnovateHerWebsite26-27
   ```

2. Pull the latest changes from main:
   ```bash
   git pull origin main
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The website will open automatically at `http://localhost:3000`

5. Build for production:
   ```bash
   npm run build
   ```

## Contributing

We follow a collaborative branching workflow. Each team member works on their assigned section on a separate branch.

### Branching Strategy

1. **Create a feature branch** for your section:
   ```bash
   git checkout -b feature/section-name
   ```
   
   Example branch names:
   - `feature/titlecard`
   - `feature/about`
   - `feature/tracks`
   - `feature/exec-board`
   - `feature/faq`
   - `feature/teams`
   - `feature/sponsors`

2. **Make your changes** to the component and its CSS file in the `src/components/` directory

3. **Commit your changes** with clear commit messages:
   ```bash
   git add .
   git commit -m "Add/Update [Section Name] component"
   ```

4. **Push to your branch**:
   ```bash
   git push origin feature/section-name
   ```

5. **Create a Pull Request**:
   - Go to GitHub and create a PR from your feature branch to `main`
   - Add a clear description of your changes
   - Request review from the project maintainer

6. **Wait for approval** and merge to `main`

### Component Guidelines

Each section is a React component located in `src/components/`:

- **Component File**: `SectionName.jsx`
- **Styles File**: `SectionName.css`
- **Export**: Default export of the component

Example structure:
```jsx
import React from 'react'
import './SectionName.css'

function SectionName() {
  return (
    <section className="section-name">
      {/* Your content here */}
    </section>
  )
}

export default SectionName
```

### Styling

- Each component has its own CSS file for scoped styling
- Use class names that match the component name
- Follow the existing color scheme: `#667eea` (purple), `#764ba2` (darker purple)
- Ensure responsive design using media queries

### Color Palette

- Primary: `#667eea` (Purple)
- Secondary: `#764ba2` (Dark Purple)
- Light Background: `#f9f9f9`
- Text: `#333` (Dark Gray)
- Muted Text: `#666` (Medium Gray)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Code Review Process

1. All PRs must be reviewed before merging
2. Ensure your code follows the existing style and patterns
3. Test your changes thoroughly in the development environment
4. Update the README if you make structural changes

## Deployment

Once all sections are complete and merged to `main`, the website can be deployed by running:
```bash
npm run build
```

The build output will be in the `dist/` directory.

## License

See the [LICENSE](LICENSE) file for details.

## Questions?

Feel free to reach out to the project maintainer for any questions or clarifications about the project structure or workflow.
