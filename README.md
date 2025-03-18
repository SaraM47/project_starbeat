# StarBeat

**StarBeat** is an interactive music web app where users can explore songs, artists, and genres through integrations with various APIs. The project is a responsive and stylish web application with animations and an engaging design.

## Features

- **Explore music**: Trending songs, recommended artists, and genre-based playlists.
- **Play songs**: Embedded YouTube player for direct playback.
- **Favorite system**: Ability to save songs and artists as favorites.
- **Interactive pop-up player**: Launch a pop-up player with a GIF and automatic song playback.
- **Dynamic animations**: Music notes following the cursor and wave animations in the background.

## Technologies

- **HTML, CSS, SCSS**: Structured and responsive layout.
- **JavaScript (vanilla JS, AJAX)**: Dynamic content and API calls.
- **YouTube IFrame API**: To play songs directly in the app.
- **Spotify API**: Fetching artist and song data.
- **Git & GitHub**: Version control and deployment.

## Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-github-username/StarBeat.git](https://github.com/SaraM47/project_starbeat.git
   ```
2. **Install dependencies**
   ```sh
   npm init 
   npm install parcel --save-dev
   ```
3. **Start the development server**
   ```sh
   npm run start
   ```
4. **Open your browser**
   ```sh
   http://localhost:1234
   ```

## Folder Structure
```
src/
│── css/
│   ├── abstracts/
│   │   ├── _layout.scss
│   │   ├── _mixins.scss
│   │   ├── _variables.scss
│   ├── assets/images/
│   ├── base/
│   │   ├── _base.scss
│   │   ├── _typography.scss
│   ├── components/
│   │   ├── _buttons.scss
│   │   ├── _cursor.scss
│   │   ├── _loading.scss
│   ├── layout/
│   │   ├── _footer.scss
│   │   ├── _header.scss
│   ├── pages/
│   │   ├── _explore.scss
│   │   ├── _favorites.scss
│   │   ├── _index.scss
│   │   ├── _search.scss
│   ├── themes/
│   │   ├── _themes.scss
│   ├── vendors/
│   │   ├── _google-fonts.scss
│   ├── main.scss
│── js/
│   ├── cursor.js
│   ├── explore.js
│   ├── favorites.js
│   ├── main.js
│   ├── musicPlayer.js
│   ├── search.js
│   ├── spotify.js
│   ├── theme.js
│   ├── youtubePlayer.js
│── explore.html
│── favorites.html
│── index.html
│── search.html
│── README.md
```

## Known Issues & Solutions

- **YouTube API warnings in the console**: These are harmless warnings from third-party services and do not affect functionality.
- **Low contrast warning from WAVE**: The color contrast of the music notes has been verified using a Contrast Checker and meets accessibility standards, despite the warning.
  - **Possible improvement**: Adjusting the increasing text-shadow contrast could enhance readability.

---
*StarBeat is a frontend development course project where we practice using APIs, AJAX, SCSS, and JavaScript.*
