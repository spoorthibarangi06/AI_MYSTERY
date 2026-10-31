import api from './api';

export const mysteryService = {
  async createMystery(data) {
    return api.post('/mysteries', data);
  },

  async getMysteries() {
    return api.get('/mysteries');
  },

  async getMystery(id) {
    return api.get(`/mysteries/${id}`);
  },

  async getMysteryStatus(id) {
    return api.get(`/mysteries/${id}/status`);
  },

  async deleteMystery(id) {
    return api.delete(`/mysteries/${id}`);
  },

  async getSuspects(id) {
    return api.get(`/mysteries/${id}/suspects`);
  },

  async getEvidence(id) {
    return api.get(`/mysteries/${id}/evidence`);
  },

  async getTimeline(id) {
    return api.get(`/mysteries/${id}/timeline`);
  },

  async getProgress(id) {
    return api.get(`/mysteries/${id}/progress`);
  },

  async updateProgress(id, reviewedEvidenceIds) {
    return api.put(`/mysteries/${id}/progress`, { reviewedEvidenceIds });
  },

  async updateBookmarks(id, bookmarkedEvidenceIds) {
    return api.put(`/mysteries/${id}/bookmarks`, { bookmarkedEvidenceIds });
  },

  async submitAccusation(id, { selectedSuspectId, reasoning }) {
    return api.post(`/mysteries/${id}/accusation`, { selectedSuspectId, reasoning });
  },

  async getResult(id) {
    return api.get(`/mysteries/${id}/result`);
  },
};
