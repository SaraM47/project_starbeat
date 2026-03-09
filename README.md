# StarBeat

**StarBeat** is an interactive music web application that allows users to explore songs, artists, and genres through integrations with various APIs. The project is a responsive and stylish web application with animations and an engaging design.

## Features

- **Explore music**: Trending songs, recommended artists, and genre-based playlists.
- **Play songs**: Embedded YouTube player for direct playback.
- **Favorite system**: Ability to save songs and artists as favorites.
- **Interactive pop-up player**: Launch a pop-up player with a GIF and automatic song playback.
- **Dynamic animations**: Music notes following the cursor and wave animations in the background.

## Technologies

- **HTML, CSS, SCSS**: Structured and responsive layout.
- **JavaScript (vanilla JS, AJAX)**: Dynamic content and API calls.
- **YouTube IFrame API**: Play songs directly in the application.
- **Spotify API**: Fetching artist and song data.
- **Git & GitHub**: Version control and deployment.

## Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-github-username/StarBeat.git](https://github.com/SaraM47/project_starbeat.git
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Start the development server**
   ```sh
   npm run dev
4. **Open your browser**
   ```sh
   http://localhost:1234
   ```

## Known Issues & Solutions

- **YouTube API warnings in the console**: These are harmless warnings from third-party services and do not affect functionality.
- **Low contrast warning from WAVE**: The color contrast of the music notes has been verified using a Contrast Checker and meets accessibility standards, despite the warning.
  - **Possible improvement**: Adjusting the increasing text-shadow contrast could enhance readability.

---
*StarBeat is a frontend development course project where we practice using APIs, AJAX, SCSS, and JavaScript.*

## UPDATE: Spotify API limitation notice

This application relies on the Spotify Web API in Development Mode. Due to Spotify’s February and March 2026 Development Mode changes, several features may no longer function normally in production or public testing environments. These changes include a requirement for Spotify Premium, a limit of five authorized users per Client ID, and restrictions tied to Development Mode usage. Spotify postponed endpoint reductions for existing integrations, but the other limits still apply.

Because of this, some API requests may return 403 Forbidden, and features such as loading new releases, fetching tracks, or testing the app as an external user may fail. Apps in Extended Quota Mode are not affected by these particular Development Mode restrictions. 

A demo video is included below in this repository showing the application functioning correctly before these platform changes were introduced.

## Demo
https://github.com/user-attachments/assets/f4ccf4d7-febe-47ac-916a-d740dde2fae2 


