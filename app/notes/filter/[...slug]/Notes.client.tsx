"use client";

import css from "./Notes.module.css";
import { fetchNotes } from "@/lib/api";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import { CategoryTag } from "@/types/note";

import Link from "next/link";

type NotesProps = {
  category?: CategoryTag;
};

export default function NotesClient({ category }: NotesProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

  const { data, error } = useQuery({
    queryKey: ["notes", query, currentPage, category],
    queryFn: () => fetchNotes(query, currentPage, category),
    placeholderData: keepPreviousData,
  });

  if (error) {
    throw error;
  }

  const handleQueryChange = useDebouncedCallback((newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1);
  }, 500);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onQueryEnter={handleQueryChange} />
          {data && data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
          <Link href="/notes/action/create">
            <button className={css.button}>Create note +</button>
          </Link>
        </header>
        {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      </div>
    </>
  );
}
