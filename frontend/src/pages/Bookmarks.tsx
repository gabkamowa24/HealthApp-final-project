import { StatusMessage } from '../components/StatusMessage';
import { TopicCard } from '../components/TopicCard';
import { useAppContext } from '../context/AppContext';
import { useBookmarkActions, useBookmarks } from '../hooks/useBookmarks';

export const Bookmarks = () => {
  const { token } = useAppContext();
  const { data: bookmarks, isLoading } = useBookmarks(Boolean(token));
  const { removeMutation } = useBookmarkActions();

  if (!token) {
    return (
      <StatusMessage message="Sign in to start bookmarking your favorite resources." />
    );
  }

  if (isLoading) {
    return <StatusMessage message="Loading your bookmarks..." />;
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Saved Resources</h1>
        <p className="text-slate-600">Health topics you&apos;ve marked to revisit.</p>
      </header>
      {bookmarks && bookmarks.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {bookmarks.map((topic) => (
            <TopicCard
              key={topic._id}
              topic={topic}
              isBookmarked
              onRemoveBookmark={(topicId) => removeMutation.mutate(topicId)}
            />
          ))}
        </div>
      ) : (
        <StatusMessage message="No bookmarks yet. Save topics to curate your own health library." />
      )}
    </div>
  );
};

