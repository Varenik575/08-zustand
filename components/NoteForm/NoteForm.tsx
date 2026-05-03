"use client";
import css from "./NoteForm.module.css";
import { useId } from "react";
import type { Note } from "../../types/note";
import { createNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";

interface NoteFormValues {
  title: string;
  content: string;
  tag: Note["tag"];
}

export default function NoteForm() {
  const id = useId();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({ ...draft, [event.target.name]: event.target.value });
  };

  const mutationCreate = useMutation({
    mutationFn: async (values: NoteFormValues) =>
      createNote(values.title, values.content, values.tag),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back();
    },
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tag = formData.get("tag") as Note["tag"];

    mutationCreate.mutate({ title, content, tag });
  };

  const handleCancel = () => router.back();

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${id}-title`}>Title</label>
        <input
          id={`${id}-title`}
          type="text"
          name="title"
          className={css.input}
          onChange={handleChange}
          defaultValue={draft?.title}
        />
        {/* <span name="title" className={css.error} /> */}
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${id}-content`}>Content</label>
        <textarea
          id={`${id}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          onChange={handleChange}
          defaultValue={draft?.content}
        />
        {/* <span name="content" className={css.error} /> */}
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${id}-tag`}>Tag</label>
        <select
          id={`${id}-tag`}
          name="tag"
          className={css.select}
          onChange={handleChange}
          defaultValue={draft?.tag}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {/* <span name="tag" className={css.error} /> */}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create note
        </button>
      </div>
    </form>
  );
}

// interface NoteFormProps {
//   onClose: () => void;
// }

// const NoteFormSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, 'Your title should be at least 3 letters long!')
//     .max(50, 'Title should be shorter than 50 letters!')
//     .required('Title is a required field'),
//   content: Yup.string().max(
//     500,
//     'The note should be shorter than 500 letters!'
//   ),
//   tag: Yup.string()
//     .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
//     .required('Tag is a required field too!'),
// });
