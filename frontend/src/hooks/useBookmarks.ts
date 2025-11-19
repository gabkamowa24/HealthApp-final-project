import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addBookmark, fetchBookmarks, removeBookmark } from '../services/api';

export const useBookmarks = (enabled: boolean) =>
  useQuery({
    queryKey: ['bookmarks'],
    queryFn: fetchBookmarks,
    enabled,
  });

export const useBookmarkActions = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: addBookmark,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bookmarks'] }),
  });

  const removeMutation = useMutation({
    mutationFn: removeBookmark,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bookmarks'] }),
  });

  return { addMutation, removeMutation };
};

