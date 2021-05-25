import React from 'react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste de Componente FavoritePokemon', () => {
  test('Mensagem de erro se a pessoa não tiver pokémons favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });
});

describe('Teste se é exibido todos os cards de pokémons favoritados', () => {
  test('selecionando dois pokémons para favoritos', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const route = '/pokemons/25';
    history.push(route);
    const favorited = getByText('Pokémon favoritado?');
    userEvent.click(favorited);
    const route2 = '/pokemons/4';
    history.push(route2);
    userEvent.click(favorited);
    const route3 = '/favorites';
    history.push(route3);
    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getByText('Charmander')).toBeInTheDocument();
  });
});
