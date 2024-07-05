import React, { useEffect, Suspense, startTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchCharacters, setPage, setQuery } from '../api/charactersSlice';
import SearchBar from '../components/molecules/SearchBar';
import Pagination from '../components/molecules/Pagination';
import { useTheme } from '../context/ThemeContext';
import SkeletonCard from '../components/molecules/SkeletonCard';
import rickandmorty from '../assets/rickandmorty.jpg';

const CharacterCard = React.lazy(() => import('../components/organisms/CharacterCard'));

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { characters, loading, error, currentPage, totalPages, query } = useSelector(
    (state: RootState) => state.characters
  );
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    startTransition(() => {
      dispatch(fetchCharacters({ page: currentPage, query }));
    });
  }, [dispatch, currentPage]);

  const handleSearch = (query: string) => {
    startTransition(() => {
      dispatch(setQuery(query));
      dispatch(fetchCharacters({ page: 1, query }));
      dispatch(setPage(1));
    });
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      startTransition(() => {
        dispatch(setPage(page));
        dispatch(fetchCharacters({ page, query }));
      });
    }
  };

  return (
    <>
      <header className='w-full mb-12 flex justify-center relative'>
        <img 
          style={{
            width: '100%',
            height: 350,
            objectFit: 'cover'
          }}
          src={rickandmorty} 
          alt='rickandmorty background'/>
        <div className="flex justify-around items-center gap-4 p-4 rounded-2xl bg-[#a9f3fd38] absolute w-[80%] bottom-2">
          <SearchBar onSearch={handleSearch} />
          <button
            onClick={toggleTheme}
            className="p-1 bg-[#35c9dd] text-white rounded"
          >
            {theme === 'dark' ? 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>        
            : 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>          
            }
          </button>
        </div>
      </header>
      <div className="container mx-auto p-4 flex flex-col gap-4">
        {error && <p>Error: {error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          <Suspense fallback={<SkeletonCard />}>
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
            ) : (
              characters.map((character:any) => (
                <CharacterCard key={character.id} {...character} />
              ))
            )}
          </Suspense>
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </>
  );
};

export default Home;
