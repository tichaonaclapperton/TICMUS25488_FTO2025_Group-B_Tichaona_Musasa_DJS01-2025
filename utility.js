/**
 * Utility functions
 */
export class Utils {
    /**
     * Format ISO date string to human-readable format
     * @param {string} dateStr
     * @returns {string} formatted date
     */
    static formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  }
  