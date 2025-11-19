import { useParams } from 'react-router-dom';
import { StatusMessage } from '../components/StatusMessage';
import { useTopic } from '../hooks/useTopics';

export const TopicDetail = () => {
  const { id } = useParams();
  const { data: topic, isLoading, isError } = useTopic(id);

  if (isLoading) {
    return <StatusMessage message="Loading topic..." />;
  }

  if (isError || !topic) {
    return <StatusMessage message="Topic not found." variant="error" />;
  }

  return (
    <article className="space-y-6 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
      <header className="space-y-2">
        <p className="text-sm font-semibold text-primary">{topic.category?.name}</p>
        <h1 className="text-3xl font-bold text-slate-900">{topic.title}</h1>
        <p className="text-sm text-slate-500">
          {topic.estimatedReadTime || 4} min read ·{' '}
          {new Date(topic.createdAt).toLocaleDateString()}
        </p>
      </header>
      <p className="text-lg text-slate-700">{topic.summary}</p>
      <div className="prose prose-slate max-w-none">
        {topic.content.split('\n').map((paragraph, index) => (
          <p key={`paragraph-${index}`}>{paragraph}</p>
        ))}
      </div>
      {topic.sources && topic.sources.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-slate-900">Sources</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
            {topic.sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
};

