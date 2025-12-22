# Assets Folder Structure

This folder contains all static assets for the website.

## Folder Structure

```
assets/
├── css/           # Compiled CSS files
│   └── style.css  # Main stylesheet (compiled from Tailwind)
├── js/            # JavaScript files
│   └── main.js    # Main JavaScript functionality
├── fonts/         # Custom fonts (if needed)
├── icons/         # Custom icons/SVG files
└── images/        # Image assets
```

## Usage

- **CSS**: Compiled Tailwind CSS output
- **JS**: All custom JavaScript functionality
- **Fonts**: Store custom font files here
- **Icons**: Store custom SVG icons or icon files
- **Images**: Store all website images (logos, photos, etc.)

## Build Process

Run `npm run build` to compile CSS to assets/css/style.css
Run `npm run watch` for development with auto-compilation
