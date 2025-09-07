import { Utils } from "./utility.js";

/**
 * Handles rendering of podcast preview cards
 */
export class PodcastCardRenderer {
  constructor(container, genres, onClick) {
    this.container = container;
    this.genres = genres;
    this.onClick = onClick; // callback when card is clicked
  }

  /**
   * Get genre names from IDs
   */
  getGenreNames(genreIds) {
    return this.genres
      .filter((g) => genreIds.includes(g.id))
      .map((g) => g.title);
  }

  /**
   * Create a podcast card element
   * @param {object} podcast
   */
  createCard(podcast) {
    const card = document.createElement("div");
    card.classList.add("podcast-card");

    const genres = this.getGenreNames(podcast.genres).join(", ");
    const date = Utils.formatDate(podcast.updated);

    card.innerHTML = `
      <img src="${podcast.image}" alt="${podcast.title}">
      <h2>${podcast.title}</h2>
      <p>Seasons: ${podcast.seasons}</p>
      <p>Genres: ${genres}</p>
      <p>Last Updated: ${date}</p>
    `;

    card.addEventListener("click", () => this.onClick(podcast));
    return card;
  }

  /**
   * Render all podcasts
   */
  renderPodcasts(podcasts) {
    this.container.innerHTML = "";
    podcasts.forEach((podcast) => {
      this.container.appendChild(this.createCard(podcast));
    });
  }
}
