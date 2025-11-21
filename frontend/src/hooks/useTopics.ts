import { useQuery } from '@tanstack/react-query';
import { fetchTopic, fetchTopics } from '../services/api';
import type { Topic } from '../types';

type TopicQueryParams = Record<string, string | undefined>;

export const useTopics = (params?: TopicQueryParams) =>
  useQuery({
    queryKey: ['topics', params],
    queryFn: () => fetchTopics(params),
  });

export const useTopic = (id?: string) =>
  useQuery<Topic>({
    queryKey: ['topic', id],
    queryFn: () => {
      if (!id) {
        throw new Error('Topic ID is required');
      }
      return fetchTopic(id);
    },
    enabled: Boolean(id),
  });

