import css from "@/app/app.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteHub App - Not Found",
  description: "Sorry, the page you are looking for doesn't exist.",
  openGraph: {
    title: "Notehub App - Not Found",
    description: "Sorry, the page you are looking for doesn't exist.",
    type: "article",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Notehub App - Not Found",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
