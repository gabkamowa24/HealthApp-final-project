import axios from 'axios';
import type { Topic, Category, User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const setAuthToken = (token?: string | null) => {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common.Authorization;
  }
};

type TopicQueryParams = Record<string, string | undefined>;

const sanitizeParams = (params?: TopicQueryParams) => {
  if (!params) return undefined;
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null && value !== ''
    )
  ) as Record<string, string>;
};

export const fetchTopics = async (params?: TopicQueryParams) => {
  const { data } = await apiClient.get<Topic[]>('/topics', { params: sanitizeParams(params) });
  return data;
};

export const fetchTopic = async (id: string) => {
  const { data } = await apiClient.get<Topic>(`/topics/${id}`);
  return data;
};

export const fetchCategories = async () => {
  const { data } = await apiClient.get<Category[]>('/categories');
  return data;
};

export const login = async (payload: Pick<User, 'email'> & { password: string }) => {
  const { data } = await apiClient.post<User>('/auth/login', payload);
  return data;
};

export const register = async (payload: { name: string; email: string; password: string }) => {
  const { data } = await apiClient.post<User>('/auth/register', payload);
  return data;
};

export const fetchBookmarks = async () => {
  const { data } = await apiClient.get<Topic[]>('/bookmarks');
  return data;
};

export const addBookmark = async (topicId: string) => {
  await apiClient.post('/bookmarks', { topicId });
};

export const removeBookmark = async (topicId: string) => {
  await apiClient.delete(`/bookmarks/${topicId}`);
};

