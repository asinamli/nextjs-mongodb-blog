"use client";

import SearchBar from "./SearchBar";

interface SearchSectionProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  resultCount: number;
}

export default function SearchSection({onSearch, searchQuery, resultCount}: SearchSectionProps) {
  return (
    <section className="bg-white dark:bg-gray-800 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <SearchBar onSearchAction={onSearch}  />
        {searchQuery && (
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              &ldquo;<span className="font-semibold">{searchQuery}</span>&rdquo; için {resultCount} sonuç bulundu
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
