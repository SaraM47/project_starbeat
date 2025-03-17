// This file is for to handle API calls only

// Import dotenv to read from .env
if (typeof process !== "undefined") {
    require('dotenv').config();
}

// Get API keys from environment variables
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

// Uses client_credentials grant type to get an access token.
// Returns token to use in API calls.
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

// Function that retrieves top lists of artists.
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

// Fetch specific tracks from the Spotify API using their track IDs
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

// Function that retrieves new album releases.
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

// Function to get a list of multiple artists dynamically for Explore page
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

// Function to get trending songs & albums
window.getTrendingTracks = async function () {
    const token = await getAccessToken();
    const response = await fetch("https://api.spotify.com/v1/browse/new-releases?limit=10", {
        headers: { "Authorization": `Bearer ${token}` }
    });

    const data = await response.json();
    return data.albums.items;
};

// Function to get available genres
window.getGenres = async function () {
    const token = await getAccessToken();
    const response = await fetch("https://api.spotify.com/v1/browse/categories?limit=10&locale=en_US", {
        headers: { "Authorization": `Bearer ${token}` }
    });

    const data = await response.json();
    return data.categories.items; // Returns the entire genre object
 
};

// Function to search for artists, albums and songs via Spotify API
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
