# Dynamic Portfolio Website

A simple, responsive, and aesthetically pleasing portfolio website that loads data dynamically from a JSON file.

## Features

- Responsive design that works on all device sizes
- Dynamic content loading from JSON data
- Sections for:

  - About/Hero
  - Skills
  - Certificates
  - Social profiles
  - Coding profiles
  - Education
  - Projects
  - Experience (with tabs for internships and full-time roles)
  - Hobbies
  - Contact information

- Modern UI with smooth animations and transitions

## File Structure

- `index.html` - Main HTML structure
- `styles.css` - All styling for the website
- `script.js` - JavaScript functionality
- `data.json` - Your portfolio data in JSON format

## How to Use

1. Edit the `data.json` file with your personal information
2. Host the website on a server (local or online)

## Customization

### Adding New Sections

1. Add the HTML structure in `index.html`
2. Add relevant styles in `styles.css`
3. Add the data to your JSON file
4. Create a function to populate the section in `script.js`
5. Call your function in the `populatePortfolio()` function

### Changing Colors

Edit the CSS variables in the `:root` selector in `styles.css`:

```css
:root {
  --primary: #007bff; /* Main color */
  --secondary: #6c757d; /* Secondary color */
  --dark: #343a40; /* Dark text color */
  --light: #f8f9fa; /* Light background color */
  /* ... other variables ... */
}
```

## Credits

- Font Awesome for icons (CDN)
- Google Fonts for typography
- Marked for formatting some details (CDN)
- Claude.ai for creating this whole project
- gemini.ai for adding details when claude free access expired / claude was not able to memories context
