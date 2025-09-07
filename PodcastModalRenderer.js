import { Utils } from "./utility.js";

/**
 * Handles rendering of podcast modal
 */
export class PodcastModalRenderer {
  constructor(modal, modalBody, modalClose, genres, seasons) {
    this.modal = modal;
    this.modalBody = modalBody;
    this.modalClose = modalClose;
    this.genres = genres;
    this.seasons = seasons;

    this.addEventListeners();
  }

  /**
   * Add modal close functionality
   */
  addEventListeners() {
    this.modalClose.addEventListener("click", () => this.close());
    window.addEventListener("click", (e) => {
      if (e.target === this.modal) this.close();
    });
  }

  /**
   * Get genre names
   */
  getGenreNames(genreIds) {
    return this.genres
      .filter((g) => genreIds.includes(g.id))
      .map((g) => g.title);
  }

  /**
   * Render genres as tags
   */
  renderGenres(genreIds) {
    return this.getGenreNames(genreIds)
      .map((g) => `<span class="tag">${g}</span>`)
      .join(" ");
  }

  /**
   * Get season details
   */
  getSeasons(podcastId) {
    const seasonObj = this.seasons.find((s) => s.id === podcastId);
    return seasonObj ? seasonObj.seasonDetails : [];
  }

  /**
   * Render seasons
   */
  renderSeasons(podcastId) {
    const seasonDetails = this.getSeasons(podcastId);
    if (seasonDetails.length === 0) return "<p>No seasons available.</p>";

    return `
      <div class="season-list">
        ${seasonDetails
          .map(
            (s, i) => `
          <div class="season-card">
            <div class="season-info">
              <h4>Season ${i + 1}: ${s.title}</h4>
            </div>
            <div class="season-episodes">${s.episodes} episodes</div>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  /**
   * Open modal
   */
  open(podcast) {
    this.modalBody.innerHTML = `
      <div class="modal-content-flex">
        <img src="${podcast.image}" alt="${podcast.title}" class="modal-image">
        <div class="modal-info">
          <h2>${podcast.title}</h2>
          <h3>Description</h3>
          <p>${podcast.description}</p>
          <p><strong>Genres:</strong> ${this.renderGenres(podcast.genres)}</p>
          <p><strong>Last Updated:</strong> ${Utils.formatDate(
            podcast.updated
          )}</p>
        </div>
      </div>
      <h3>Seasons</h3>
      ${this.renderSeasons(podcast.id)}
    `;
    this.modal.style.display = "block";
  }

  /**
   * Close modal
   */
  close() {
    this.modal.style.display = "none";
  }
}
