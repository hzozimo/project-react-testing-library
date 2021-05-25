import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
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
  test('Os próximos Pokémons da lista devem ser mostrados', () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonNext = getByText('Próximo pokémon');
    userEvent.click(buttonNext);
    const pokemon = getByText('Charmander');
    expect(pokemon).toBeInTheDocument();
  });
});
