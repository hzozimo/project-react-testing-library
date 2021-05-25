import React from 'react';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import App from '../App';

test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
  const { getByRole } = renderWithRouter(<App />);
  const pokemon = getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });
  expect(pokemon).toBeInTheDocument();
});

describe('É exibido o próximo Pokémon quando o botão Próximo pokémon é clicado', () => {
  test('O botão deve conter o texto Próximo pokémon', () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonNext = getByText('Próximo pokémon');
    expect(buttonNext).toBeInTheDocument();
  });
});
