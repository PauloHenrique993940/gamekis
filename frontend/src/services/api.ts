import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
});

export const getQuestions = async (level?: number) => {
  const response = await api.get(`/questions${level ? `?level=${level}` : ''}`);
  return response.data;
};

export const registerPlayer = async (name: string) => {
  const response = await api.post('/player', { name });
  return response.data;
};

export const saveScore = async (id: string, level: number, score: number, totalQuestions: number, badge?: string) => {
  const response = await api.post('/score', { id, level, score, totalQuestions, badge });
  return response.data;
};

export const getRanking = async () => {
  const response = await api.get('/ranking');
  return response.data;
};

export default api;
