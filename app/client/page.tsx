"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const ClientPage: React.FC = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const offset = (currentPage - 1) * 50;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`);
      setPokemons(response.data.results);
    };
    fetchData();
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <h1>Liste des Pokémons</h1>
      <ul>
  {pokemons.map((pokemon) => (
    <li key={pokemon.name}>
      <Link href={`/client/${pokemon.name}`}>{pokemon.name ?? 'Pokémon inconnu'}</Link>
    </li>
  ))}
</ul>
  
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Précédent
        </button>
        <button onClick={handleNextPage}>Suivant</button>
      </div>
    </div>
  );
};

export default ClientPage;
