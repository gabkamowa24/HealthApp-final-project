import type { Category } from '../types';

type Props = {
  categories: Category[];
  selected: string;
  onChange: (categoryId: string) => void;
};

export const CategoryFilter = ({ categories, selected, onChange }: Props) => (
  <div className="flex flex-wrap gap-2">
    <button
      type="button"
      className={`rounded-full border px-4 py-2 text-sm ${
        !selected
          ? 'border-primary bg-primary text-white'
          : 'border-slate-200 text-slate-500'
      }`}
      onClick={() => onChange('')}
    >
      All topics
    </button>
    {categories.map((category) => (
      <button
        key={category._id}
        type="button"
        onClick={() => onChange(category._id)}
        className={`rounded-full border px-4 py-2 text-sm ${
          selected === category._id
            ? 'border-primary bg-primary text-white'
            : 'border-slate-200 text-slate-500'
        }`}
      >
        {category.name}
      </button>
    ))}
  </div>
);

