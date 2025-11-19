export type Category = {
  _id: string;
  name: string;
  description?: string;
};

export type Topic = {
  _id: string;
  title: string;
  summary: string;
  content: string;
  category: Category;
  tags: string[];
  sources?: { label: string; url: string }[];
  isFeatured?: boolean;
  estimatedReadTime?: number;
  createdAt: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  token: string;
};

