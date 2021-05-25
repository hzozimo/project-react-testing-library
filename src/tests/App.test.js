import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

// test('renders a reading with the text `Pokédex`', () => {
//   const { getByText } = renderWithRouter(<App />);
//   const heading = getByText(/Pokédex/i);
//   expect(heading).toBeInTheDocument();
// });

test('shows the Pokédex when the route is `/`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const route = '/';
  history.push(route);
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const route = '/';
    history.push(route);
    expect(getByText('Home')).toBeInTheDocument();
  });

  test('O segundo link deve possuir o texto About', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const route = '/';
    history.push(route);
    expect(getByText('About')).toBeInTheDocument();
  });

  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const route = '/';
    history.push(route);
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });
});

describe('redireciona para a página inicial, na URL / ao clicar no link Home', () => {
  test('', () => {
    const { getByText } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: /Home/i,
    });
    userEvent.click(homeLink);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});
