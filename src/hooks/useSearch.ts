import { useMemo } from 'react';
import Fuse from 'fuse.js';
import { questions, type Question } from '../data/questions';

const fuse = new Fuse(questions, {
  keys: [
    { name: 'question', weight: 0.4 },
    { name: 'answer', weight: 0.3 },
    { name: 'tags', weight: 0.2 },
    { name: 'category', weight: 0.1 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
});

interface SearchFilters {
  category?: string;
  difficulty?: string;
  bookmarkedOnly?: boolean;
  completedOnly?: boolean;
  bookmarks?: number[];
  completed?: number[];
}

export function useSearch(query: string, filters?: SearchFilters) {
  return useMemo(() => {
    let results: Question[];

    if (query.trim().length < 2) {
      results = [...questions];
    } else {
      results = fuse.search(query).map((r) => r.item);
    }

    if (filters?.category) {
      results = results.filter(
        (q) => q.category.toLowerCase() === filters.category!.toLowerCase()
      );
    }

    if (filters?.difficulty) {
      results = results.filter((q) => q.difficulty === filters.difficulty);
    }

    if (filters?.bookmarkedOnly && filters.bookmarks) {
      results = results.filter((q) => filters.bookmarks!.includes(q.id));
    }

    if (filters?.completedOnly && filters.completed) {
      results = results.filter((q) => filters.completed!.includes(q.id));
    }

    return results;
  }, [query, filters?.category, filters?.difficulty, filters?.bookmarkedOnly, filters?.completedOnly, filters?.bookmarks, filters?.completed]);
}
