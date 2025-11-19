import { Link } from 'react-router-dom';
import type { Topic } from '../types';

type TopicCardProps = {
  topic: Topic;
  onBookmark?: (topicId: string) => void;
  onRemoveBookmark?: (topicId: string) => void;
  isBookmarked?: boolean;
};

export const TopicCard = ({
  topic,
  onBookmark,
  onRemoveBookmark,
  isBookmarked,
}: TopicCardProps) => (
  <article className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-primary">{topic.category?.name}</p>
        <h2 className="mt-1 text-xl font-semibold text-slate-900">{topic.title}</h2>
      </div>
      {onBookmark && (
        <button
          type="button"
          className={`rounded-full border px-3 py-1 text-xs font-medium ${
            isBookmarked ? 'border-primary text-primary' : 'border-slate-200 text-slate-600'
          }`}
          onClick={() =>
            isBookmarked ? onRemoveBookmark?.(topic._id) : onBookmark?.(topic._id)
          }
        >
          {isBookmarked ? 'Saved' : 'Save'}
        </button>
      )}
    </div>
    <p className="text-sm text-slate-600">{topic.summary}</p>
    <div className="flex flex-wrap gap-2 text-xs text-slate-500">
      {topic.tags?.map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-slate-100 px-3 py-1 text-slate-600"
        >
          #{tag}
        </span>
      ))}
    </div>
    <div className="flex items-center justify-between text-sm text-slate-500">
      <span>{topic.estimatedReadTime || 4} min read</span>
      <Link
        to={`/topics/${topic._id}`}
        className="text-primary transition hover:underline"
      >
        Read more
      </Link>
    </div>
  </article>
);

