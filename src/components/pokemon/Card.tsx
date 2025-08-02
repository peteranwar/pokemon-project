import React from 'react';

interface CardProps {
  name: string;
  imageUrl: string;
  onClick?: () => void;
}

const PokemonCard: React.FC<CardProps> = ({ name, imageUrl, onClick }) => {
  return (
    <div
      className="p-2 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer bg-white"
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-40 object-contain bg-gray-50"
      />
      <div className="p-4">
        <h3 className="text-center font-semibold capitalize">{name}</h3>
      </div>
    </div>
  );
};

export default PokemonCard;