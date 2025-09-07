import { podcasts, genres, seasons } from "./data.js";
import { PodcastLibrary } from "./PodcastLibrary.js";

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  new PodcastLibrary(podcasts, genres, seasons);
});


