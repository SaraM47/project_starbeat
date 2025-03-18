/**
 * This file handles API calls to Spotify.
 * It fetches data such as access tokens, artists, tracks, albums, and genres.
 */
// Import dotenv to read from .env
if (typeof process !== "undefined") {
    require('dotenv').config();
}

// Get API keys from environment variables
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

/**
 * Fetches an access token from Spotify API using client credentials.
 *
 * @returns {Promise<string>} A promise that resolves to an access token.
 */
async function getAccessToken() {
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
    });

    const data = await response.json();
    return data.access_token;
}

/**
 * Fetches details of top artists using their Spotify IDs.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of artist objects.
 */
window.getTopArtists = async function () {
    const token = await getAccessToken();
    const response = await fetch("https://api.spotify.com/v1/artists?ids=06HL4z0CvFAxyc27GXpf02,1Xyo4u8uXC1ZmMpatF05PJ,4q3ewBCX7sLwd24euuV69X", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data.artists || []; 
};

/**
 * Fetches details of specific tracks using their Spotify IDs.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of track objects.
 */
async function getSpecificTracks() {
    const token = await getAccessToken();
    const trackIds = "2plbrEY59IikOBgBGLjaoe,4wJ5Qq0jBN4ajy7ouZIV1c,6AI3ezQ4o3HUoP6Dhudph3"; // Specific track IDs

    const response = await fetch(`https://api.spotify.com/v1/tracks?ids=${trackIds}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data.tracks || [];
}

window.getSpecificTracks = getSpecificTracks;

/**
 * Fetches the latest new album releases from Spotify.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of album objects.
 */
window.getNewReleases = async function () {
    const token = await getAccessToken();
    const response = await fetch("https://api.spotify.com/v1/browse/new-releases", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data.albums.items || [];
}

/**
 * Fetches a list of multiple artists for the Explore page.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of artist objects.
 */
window.getExploreArtists = async function () {
    const token = await getAccessToken();
    
    // More artist IDs list for Explore view
    const artistIds = "5pKCCKE2ajJHZ9KAiaK11H,3Nrfpe0tUJi4K4DXYWgMUX,66CXWjxzNUsdJxJ2JdwvnR,7bXgB6jMjp9ATFy66eO08Z,1uNFoZAHBGtllmzznpCI3s,0EmeFodog0BfCgMzAIvKQp,0du5cEVh5yTK9QJze8zA0C,6eUKZXaKkcviH0Ku9w2n3V,3wcj11K77LjEY1PkEazffa,3q7HBObVc0L8jNeTe5Gofh,4gzpq5DPGxSnKTe4SA8HAU,69GGBxA162lTqCwzJG5jLp,246dkjvS1zLTtiykXe5h60,6M2wZ9GZgrQXHCFfjv46we"; 

    const response = await fetch(`https://api.spotify.com/v1/artists?ids=${artistIds}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();
    return data.artists || []; 
};

/**
 * Fetches trending songs and albums from Spotify.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of trending album objects.
 */
window.getTrendingTracks = async function () {
    const token = await getAccessToken();
    const response = await fetch("https://api.spotify.com/v1/browse/new-releases?limit=10", {
        headers: { "Authorization": `Bearer ${token}` }
    });

    const data = await response.json();
    return data.albums.items;
};

/**
 * Fetches available genres from Spotify.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of genre objects.
 */
window.getGenres = async function () {
    const token = await getAccessToken();
    const response = await fetch("https://api.spotify.com/v1/browse/categories?limit=10&locale=en_US", {
        headers: { "Authorization": `Bearer ${token}` }
    });

    const data = await response.json();
    return data.categories.items; // Returns the entire genre object
 
};

/**
 * Searches for tracks, artists, and albums based on a given query.
 *
 * @param {string} query - The search query entered by the user.
 * @returns {Promise<Object>} A promise that resolves to the search results.
 */
async function searchSpotify(query) {
    const token = await getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track,artist,album&limit=10`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response.json();
}

// Make the function globally accessible
window.searchSpotify = searchSpotify;

window.getAccessToken = getAccessToken;
