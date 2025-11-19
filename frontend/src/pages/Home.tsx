import { AuthPanel } from '../components/AuthPanel';
import { CategoryFilter } from '../components/CategoryFilter';
import { StatusMessage } from '../components/StatusMessage';
import { TopicCard } from '../components/TopicCard';
import { useAppContext } from '../context/AppContext';
import { useBookmarkActions, useBookmarks } from '../hooks/useBookmarks';
import { useCategories } from '../hooks/useCategories';
import { useTopics } from '../hooks/useTopics';

export const Home = () => {
  const { search, selectedCategory, setSelectedCategory, token } = useAppContext();
  const { data: categories } = useCategories();
  const { data: topics, isLoading, isError } = useTopics({
    q: search || undefined,
    category: selectedCategory || undefined,
  });
  const { data: bookmarks } = useBookmarks(Boolean(token));
  const { addMutation, removeMutation } = useBookmarkActions();
  const bookmarkedIds = new Set(bookmarks?.map((topic) => topic._id) ?? []);

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Explore Health Topics</h1>
        <p className="text-slate-600">
          Browse curated, evidence-based guides covering prevention, chronic conditions,
          nutrition, and wellness. Use the filters to zero in on what matters most.
        </p>
        {categories && (
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onChange={setSelectedCategory}
          />
        )}
      </section>

      {isLoading && <StatusMessage message="Loading topics..." />}
      {isError && (
        <StatusMessage message="Unable to load topics. Please try again." variant="error" />
      )}

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="grid gap-6 md:grid-cols-2">
          {topics?.map((topic) => (
            <TopicCard
              key={topic._id}
              topic={topic}
              isBookmarked={bookmarkedIds.has(topic._id)}
              onBookmark={token ? (topicId) => addMutation.mutate(topicId) : undefined}
              onRemoveBookmark={
                token ? (topicId) => removeMutation.mutate(topicId) : undefined
              }
            />
          ))}
        </div>
        <AuthPanel />
      </section>

      {!isLoading && topics?.length === 0 && (
        <StatusMessage message="No topics match your search yet. Try a different keyword." />
      )}
    </div>
  );
};

