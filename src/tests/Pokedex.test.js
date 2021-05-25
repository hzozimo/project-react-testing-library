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
  test('O picachu voltou', () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonNext = getByText('Próximo pokémon');
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    const pokemon = getByText('Pikachu');
    expect(pokemon).toBeInTheDocument();
  });
});

describe('Teste se é mostrado apenas um Pokémon por vez', () => {
  test('Só um pokemon é mostrado', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const pokemonsInScreen = getAllByRole('img');
    expect(pokemonsInScreen.length).toBe(1);
  });
});

describe('Teste se a Pokédex tem os botões de filtro', () => {
  test('A Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    const { getByText, getByRole } = renderWithRouter(<App />);
    const typeFire = getByRole('button', { name: 'Fire' });
    userEvent.click(typeFire);
    expect(getByText('Charmander')).toBeInTheDocument();
    const buttonNext = getByText('Próximo pokémon');
    userEvent.click(buttonNext);
    expect(getByText('Rapidash')).toBeInTheDocument();
    const typeBug = getByRole('button', { name: 'Bug' });
    userEvent.click(typeBug);
    expect(getByText('Caterpie')).toBeInTheDocument();
  });
});
