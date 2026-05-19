import axios from "axios";
import type { Note } from "../types/note";

export interface NotesResponseProps {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesProps {
  page: number;
  search: string;
}

export const fetchNotes = async ({page, search,}: FetchNotesProps): Promise<NotesResponseProps> => {
  const response = await axios.get<NotesResponseProps>(
    'https://notehub-public.goit.study/api/notes',
    {
      params: {
        page,
        search,
      },
    }   
    );
     return response.data;
}


interface CreateNoteProps {
  title: string;
  content: string;
}

export const createNote = async (newNote: CreateNoteProps): Promise<Note> => {
    const response = await axios.post <Note>('https://notehub-public.goit.study/api/notes', newNote);
    return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const response = await axios.delete <Note>(`https://notehub-public.goit.study/api/notes/${id}`);
    return response.data;
};  
