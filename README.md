# Affiliate Launch Kit Generator

## Overview
The Affiliate Launch Kit Generator is a personalized onboarding automation tool designed for new affiliate brokers joining the Moonshine Capital affiliate program. It eliminates the "I signed up but now what?" problem by generating a complete, niche-specific launch kit in minutes.

## What It Does
Input your niche (e.g., "TikTok Shop Sellers") and audience size, and the generator creates:
- **7-Day Action Plan**: Day-by-day checklist customized to your niche and audience
- **5 Social Posts**: Ready-to-use content written for your target audience
- **Scripts**: DM openers, call scripts, and follow-up templates
- **Tracking Links**: Pre-configured affiliate links with UTM parameters for analytics

## Features
- Niche-specific personalization using AI-powered content generation
- Audience size-based strategy recommendations (0-1k, 1-10k, 10-100k, 100k+)
- Downloadable Launch Kit (JSON format)
- Responsive design for mobile and desktop
- Animated UI with smooth transitions and glass-morphism effects

## Tech Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS variables, flexbox, and grid
- **Animation**: AOS (Animate On Scroll) library
- **Deployment**: Static site (Vercel, Netlify, or GitHub Pages)

## Installation

### Local Development
1. Clone this repository
2. Open `index.html` in your browser
3. No build step required—it's a static site!

### Deployment
**Vercel** (Recommended):
```bash
vercel deploy
```

**Netlify**:
```bash
netlify deploy
```

**GitHub Pages**:
Push to `main` branch and enable GitHub Pages in repository settings.

## File Structure
```
affiliate-launch-kit/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling
├── script.js           # Interactive form and generation logic
└── README.md           # This file
```

## Customization

### Update Branding
- Replace `[BRAND]` placeholders in `index.html`
- Modify CSS variables in `styles.css` for colors and fonts

### Modify Content Generation
Edit the generation functions in `script.js`:
- `generate7DayPlan()` - Customize action plan structure
- `generateSocialPosts()` - Adjust post templates
- `generateScripts()` - Modify script templates
- `generateTrackingLinks()` - Update base URL and UTM parameters

### Add Analytics
Uncomment and configure analytics tracking in `script.js`:
```javascript
// Example: gtag('event', 'click', { event_category: 'CTA', event_label: label });
```

## Configuration

### Update Affiliate Program URL
In `script.js`, modify the `baseUrl` in `generateTrackingLinks()`:
```javascript
const baseUrl = 'https://www.distilledfunding.com/partners';
```

### Audience Strategies
Edit `getAudienceStrategy()` function to customize focus areas for different audience sizes.

## Usage
1. Enter your niche (e.g., "Real Estate Investors")
2. Select your audience size
3. Optionally specify your primary platform
4. Click "Generate Launch Kit"
5. Download your personalized kit as JSON

## Future Enhancements
- Export to ZIP with multiple file formats (PDF, CSV)
- Integration with CRM for lead capture
- White-label version for other affiliate programs
- Pro tier with saved kits and multi-platform packs

## Support
For questions or issues, contact: support@moonshincapital.com

## License
MIT License - feel free to use and modify for your own affiliate programs.

## Credits
Built for Moonshine Capital's affiliate program by Jason Feimster.

---

**Ready to launch?** Visit [https://www.distilledfunding.com/partners](https://www.distilledfunding.com/partners) to join the program.
