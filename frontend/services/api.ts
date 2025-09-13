const API_BASE_URL = `http://192.168.2.103:3000`;

interface HealthResponse {
  status: string;
  service: string;
}

export const fatecCarpoolAPI = {
  checkHealth: async (): Promise<HealthResponse> => {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  }
};