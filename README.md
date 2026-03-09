# CAT - Climate Action Team Website

A professional website for the Climate Action Team, a high school-based environmental club managing a $10,000 Portland Green Energy Fund grant.

## About

The Climate Action Team (CAT) is dedicated to environmental education and community engagement through monthly initiatives including youth education, community outreach, farm visits, and sustainable transportation programs.

## Features

- **Home Page**: Overview of CAT's mission and upcoming events
- **About Us Page**: Animated timeline showcasing our 2026 monthly programs
- **Community Night Sign-Up**: Registration form for our March 18th event 

## Live Website

Visit the site at: [https://ethank511.github.io/CAT-Website/](https://ethank511.github.io/CAT-Website/)

## Local Development

To run the website locally:

```bash
python3 -m http.server 8000
```

Then open your browser to `http://localhost:8000`

## Technologies

- HTML5
- CSS3 
- Vanilla JavaScript
- GitHub Pages for hosting

## Project Structure

```
├── assets/
│   ├── css/
│   │   └── styles.css              # All styling and animations
│   ├── js/
│   │   ├── script.js               # Navigation and shared interactions
│   │   └── carbon-calculator.js    # Carbon footprint calculator logic
│   └── images/
│       ├── Cat Logo.png            # Site logo
│       ├── og-image.png            # Open Graph / social share image
│       └── favicon.svg             # Browser favicon
├── index.html                      # Home page
├── about.html                      # About Us with animated timeline
├── carbon-calculator.html          # Carbon footprint calculator
├── signup.html                     # Community Night registration form
├── robots.txt                      # Search engine crawl rules
├── sitemap.xml                     # XML sitemap
├── CNAME                           # Custom domain config
└── README.md                       # This file
```

---
