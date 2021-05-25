import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Renderiza um card com as informações de determinado pokémon', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const { name } = pokemons[0];
    expect(getByTestId('pokemon-name')).toHaveTextContent(name);
  });

  test('O tipo correto do pokémon deve ser mostrado na tela', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const { type } = pokemons[0];
    expect(getByTestId('pokemon-type')).toHaveTextContent(type);
  });

  test('O peso médio do pokémon deve ser exibido no formato correto', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const { averageWeight: { value, measurementUnit } } = pokemons[0];
    const avarageWightText = `Average weight: ${value} ${measurementUnit}`;
    expect(getByTestId('pokemon-weight')).toHaveTextContent(avarageWightText);
  });

  test('A imagem do Pokémon deve ser exibida', () => {
    const { getByRole } = renderWithRouter(<App />);
    const { image, name } = pokemons[0];
    const pokemonImage = getByRole('img');
    expect(pokemonImage).toHaveAttribute(
      'src',
      image,
    );
    expect(pokemonImage).toHaveAttribute(
      'alt',
      `${name} sprite`,
    );
  });
});
