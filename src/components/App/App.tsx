import { useQuery } from '@tanstack/react-query';
import NoteList from '../NoteList/NoteList.tsx'
import css from './App.module.css'
import { fetchNotes } from '../../services/noteService.ts';
import { useState } from 'react';
import Pagination from '../Pagination/Pagination.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../../services/noteService';
import { useDebouncedCallback } from 'use-debounce';
import SearchBox from '../SearchBox/SearchBox';



function App() {

  const queryClient = useQueryClient();

  const mutation = useMutation({
  mutationFn: deleteNote,

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['notes'],
    });
  },
});

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading, isError } = useQuery({
  queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, search }),
  });
  
  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const debouncedSearch = useDebouncedCallback(
  (value: string) => {
    setSearch(value);
  },
  1000
);

  return (  
   
        <div className={css.app}>
	<header className={css.toolbar}>
		<SearchBox onSearch={debouncedSearch} />
		{totalPages > 1 && (
        <Pagination
          pageCount={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
		<button className={css.button}>Create note +</button>
        </header>
        {isLoading && <p>loading...</p>}

      {isError && <p>Error...</p>}
         {notes.length > 0 && (
        <NoteList
  notes={notes}
  onDelete={(id) => mutation.mutate(id)}
/>
      )}
</div>
    
  )
}

export default App 
