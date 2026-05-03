import { Note } from '@/types/note';
import {create} from 'zustand';
import { persist } from 'zustand/middleware';

const initialDraft = {
    title: '',
    content: '',
    tag: 'Todo' as Note['tag'],
}

type Draft = {
    title: string,
    content: string,
    tag: Note['tag'],
}

type NoteDraftStore = {
    draft: Draft,
    setDraft: (note:Draft) => void,
    clearDraft: () => void,
    
}

export const useNoteDraftStore = create<NoteDraftStore>()(persist((set) => ({
  draft: initialDraft,
  setDraft: (note) => set(() => ({ draft: note })),
  clearDraft: () => set(() => ({ draft: initialDraft })),
}), {
    name: 'note-draft',
    partialize: (state) => ({ draft: state.draft }),
}));

