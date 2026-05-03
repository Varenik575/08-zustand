import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "@/app/notes/filter/[...slug]/Notes.client";
import { fetchNotes } from "@/lib/api";
import { CategoryTag } from "@/types/note";
import { Metadata } from "next";

type NotesProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: NotesProps): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `${slug[0]} Notes`,
    description:
      "Notes filtered by tags for a quick and useful search and review.",
    openGraph: {
      title: `${slug[0]} Notes`,
      description:
        "Notes filtered by tags for a quick and useful search and review.",
      siteName: "NoteHub App",
      url: `https://08-zustand-nu-two.vercel.app/notes/filter/${slug[0]}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Notehub App",
        },
      ],
    },
  };
}

export default async function Notes({ params }: NotesProps) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const category = slug[0] === "All" ? undefined : (slug[0] as CategoryTag);

  try {
    await queryClient.prefetchQuery({
      queryKey: ["notes", "", category],
      queryFn: () => fetchNotes("", 1, category),
    });
  } catch (error) {
    throw error;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient category={category} />
    </HydrationBoundary>
  );
}
