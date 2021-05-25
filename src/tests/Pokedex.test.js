import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const nomeBotãoNext = 'Próximo pokémon';

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
    const buttonNext = getByText(nomeBotãoNext);
    expect(buttonNext).toBeInTheDocument();
  });
  test('Os próximos Pokémons da lista devem ser mostrados', () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonNext = getByText(nomeBotãoNext);
    userEvent.click(buttonNext);
    const pokemon = getByText('Charmander');
    expect(pokemon).toBeInTheDocument();
  });
  test('O picachu voltou', () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonNext = getByText(nomeBotãoNext);
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
  test('O texto do botão deve corresponder ao nome do tipo', () => {
    const { getByRole } = renderWithRouter(<App />);
    const buttonElectric = getByRole('button', { name: 'Electric' });
    expect(buttonElectric).toBeInTheDocument();
    const buttonFire = getByRole('button', { name: 'Fire' });
    expect(buttonFire).toBeInTheDocument();
    const buttonBug = getByRole('button', { name: 'Bug' });
    expect(buttonBug).toBeInTheDocument();
    const buttonPoison = getByRole('button', { name: 'Poison' });
    expect(buttonPoison).toBeInTheDocument();
    const buttonPsychic = getByRole('button', { name: 'Psychic' });
    expect(buttonPsychic).toBeInTheDocument();
    const buttonNormal = getByRole('button', { name: 'Normal' });
    expect(buttonNormal).toBeInTheDocument();
    const buttonDragon = getByRole('button', { name: 'Dragon' });
    expect(buttonDragon).toBeInTheDocument();
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  test('O texto do botão deve ser All', () => {
    const { getByRole } = renderWithRouter(<App />);
    const buttonAll = getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
  });
  test('mostrar os Pokémons normalmente (sem filtros)', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const buttonAll = getByRole('button', { name: 'All' });
    userEvent.click(buttonAll);
    const buttonNext = getByText(nomeBotãoNext);
    userEvent.click(buttonNext);
    expect(getByText('Charmander')).toBeInTheDocument();
  });
  test('Ao carregar a página, o filtro selecionado deverá ser All', () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonNext = getByText(nomeBotãoNext);
    userEvent.click(buttonNext);
    expect(getByText('Charmander')).toBeInTheDocument();
  });
});

describe('botão de filtro para cada tipo de Pokémon criado dinamicamente', () => {
  test('Os botões de filtragem devem ser dinâmicos', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const buttonsType = getAllByTestId('pokemon-type-button');
    expect(buttonsType.length).toBeGreaterThan(0);
  });

  test(('Deve existir um botão para cada tipo de Pokémon disponível nos dados'), () => {
    const { getByRole } = renderWithRouter(<App />);
    pokemons.forEach(({ type }) => {
      const buttonType = getByRole('button', { name: type });
      expect(buttonType).toBeInTheDocument();
    });
  });

  test('Um botão para cada um dos tipos. O botão All sempre visível', () => {
    const { getByRole } = renderWithRouter(<App />);
    const buttonAll = getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();
    const buttonElectric = getByRole('button', { name: 'Electric' });
    expect(buttonElectric).toBeInTheDocument();
    const buttonFire = getByRole('button', { name: 'Fire' });
    expect(buttonFire).toBeInTheDocument();
    const buttonBug = getByRole('button', { name: 'Bug' });
    expect(buttonBug).toBeInTheDocument();
    const buttonPoison = getByRole('button', { name: 'Poison' });
    expect(buttonPoison).toBeInTheDocument();
    const buttonPsychic = getByRole('button', { name: 'Psychic' });
    expect(buttonPsychic).toBeInTheDocument();
    const buttonNormal = getByRole('button', { name: 'Normal' });
    expect(buttonNormal).toBeInTheDocument();
    const buttonDragon = getByRole('button', { name: 'Dragon' });
    expect(buttonDragon).toBeInTheDocument();
  });

  test('Próximo pokémon desabilitado se tiver um só pokémon', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);
    const buttonNext = getByText(nomeBotãoNext);
    const buttonBug = getByRole('button', { name: 'Bug' });
    userEvent.click(buttonBug);
    expect(buttonNext).toHaveAttribute('disabled');
  });
});
