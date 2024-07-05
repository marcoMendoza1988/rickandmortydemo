import React from 'react';

interface CharacterCardProps {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: string;
  location: string;
  image: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  status,
  species,
  gender,
  image,
}) => {
  return (
    <div className="border rounded shadow-md border-[#a9f3fd70] shadow-[#a9f3fd70]">
      <img src={image} alt={name} className="w-full h-64 object-cover rounded" />
      <div className='p-4'>
        <h2 className="text-xl font-bold mt-2 text-[#4cb5c3]">{name}</h2>
        <p className='text-[#87d1db]'>Status: {status}</p>
        <p className='text-[#87d1db]'>Species: {species}</p>
        <p className='text-[#87d1db]'>Gender: {gender}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
