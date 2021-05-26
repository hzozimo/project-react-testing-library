import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const moreDetails = 'More details';

describe('As informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  test('A página deve conter um texto com o nome do Pokémon', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const { id, name } = pokemons[0];
    const route = `/pokemons/${id}`;
    history.push(route);
    expect(getByText(name)).toBeInTheDocument();
  });

  test('Não deve existir o link de navegação na página', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    const linkMoreDetails = getByRole('link', { name: moreDetails });
    const { id } = pokemons[0];
    const route = `/pokemons/${id}`;
    history.push(route);
    expect(linkMoreDetails).not.toBeInTheDocument();
  });

  test('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const { history, getByRole } = renderWithRouter(<App />);
    const { id } = pokemons[0];
    const route = `/pokemons/${id}`;
    history.push(route);
    const summary = getByRole('heading', {
      name: 'Summary',
      level: 2,
    });
    expect(summary).toBeInTheDocument();
  });

  test('contem um parágrafo com o resumo do Pokémon específico sendo visualizado', () => {
    const { history, getByText } = renderWithRouter(<App />);
    const { id, summary } = pokemons[0];
    const route = `/pokemons/${id}`;
    history.push(route);
    const summaryText = getByText(summary);
    expect(summaryText).toBeInTheDocument();
  });
});

describe('Existe na página uma seção com os mapas', () => {
  test(`Deverá existir um heading h2 com o texto Game Locations of <name>;
   onde <name> é o nome do Pokémon exibido.`, () => {
    const { history, getByRole } = renderWithRouter(<App />);
    const { id, name } = pokemons[0];
    const route = `/pokemons/${id}`;
    history.push(route);
    const locationsTitle = getByRole('heading', {
      name: `Game Locations of ${name}` });
    expect(locationsTitle).toBeInTheDocument();
  });

  test(`Todas as localizações do Pokémon 
  devem ser mostradas na seção de detalhes`, () => {

  });
});
