import { keepPreviousData, useQuery } from '@tanstack/react-query';
import NoteList from '../NoteList/NoteList.tsx'
import css from './App.module.css'
import { fetchNotes } from '../../services/noteService.ts';
import { useState } from 'react';
import Pagination from '../Pagination/Pagination.tsx';
import { useDebouncedCallback } from 'use-debounce';
import SearchBox from '../SearchBox/SearchBox';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';



function App() {

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

const closeModal = () => {
  setIsModalOpen(false);
};

  const { data, isLoading, isError } = useQuery({
  queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, search }),
    placeholderData: keepPreviousData,
  });
  
  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const debouncedSearch =
  useDebouncedCallback(
    (value: string) => {
      setSearch(value);

      setPage(1);
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
		<button className={css.button} onClick={openModal}>
  Create note +
    </button>
        </header>
        {isLoading && <p>loading...</p>}

      {isError && <p>Error...</p>}
         {notes.length > 0 && (
        <NoteList notes={notes}
/>
      )}

      {isModalOpen && (
  <Modal onClose={closeModal}>
    <NoteForm onClose={closeModal} />
  </Modal>
)}
</div>
    
  )
}

export default App 
