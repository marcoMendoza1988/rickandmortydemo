import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="w-[80%] flex space-x-2 relative flex content-center">
      <Input value={query} onChange={handleInputChange} placeholder="Search by Name" />
      <div className='absolute right-0 p-1'>
        <Button onClick={handleSearch}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
