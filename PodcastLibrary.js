import { PodcastCardRenderer } from "./PodcastCardRenderer.js";
import { PodcastModalRenderer } from "./PodcastModalRenderer.js";

/**
 * Podcast Library Controller
 * Applies filters, coordinates renderers
 */
export class PodcastLibrary {
	constructor(podcasts, genres, seasons) {
		this.podcasts = podcasts;
		this.genres = genres;
		this.seasons = seasons;

		this.podcastContainer = document.getElementById("podcast-container");
		this.genreFilter = document.getElementById("genre-filter");
		this.recentFilter = document.getElementById("recent-filter");
		this.modal = document.getElementById("modal");
		this.modalBody = document.getElementById("modal-body");
		this.modalClose = document.getElementById("modal-close");
		this.searchInput = document.getElementById("search-input");
        // this.searchBtn = document.getElementById('search-btn')

		// Inject renderers
		this.cardRenderer = new PodcastCardRenderer(
			this.podcastContainer,
			this.genres,
			(podcast) => this.modalRenderer.open(podcast)
		);
		this.modalRenderer = new PodcastModalRenderer(
			this.modal,
			this.modalBody,
			this.modalClose,
			this.genres,
			this.seasons
		);

		this.addEventListeners();
		this.renderPodcasts();
	}

	/**
	 * Add filter event listeners
	 */
	addEventListeners() {
		this.genreFilter.addEventListener("change", () => this.renderPodcasts());
		this.recentFilter.addEventListener("change", () => this.renderPodcasts());
		this.searchInput.addEventListener("input", () => this.renderPodcasts());
        // this.searchBtn.addEventListener('click', () => this.renderPodcasts());
	}

	/**
	 * Apply filters & sorting
	 */
	renderPodcasts() {
		let filtered = [...this.podcasts];

		// Genre filter
		const genre = this.genreFilter.value;
		if (genre !== "all") {
			filtered = filtered.filter((p) => p.genres.includes(Number(genre)));
		}

		// Sorting
		const sort = this.recentFilter.value;
		if (sort === "newest") {
			filtered.sort((a, b) => new Date(b.updated) - new Date(a.updated));
		} else if (sort === "oldest") {
			filtered.sort((a, b) => new Date(a.updated) - new Date(b.updated));
		}

		// Search filter
		const searchTerm = this.searchInput.value.toLowerCase();
		if (searchTerm) {
			filtered = filtered.filter((p) =>
				p.title.toLowerCase().includes(searchTerm)
			);
		}

		// Render
		this.cardRenderer.renderPodcasts(filtered);
	}
}
