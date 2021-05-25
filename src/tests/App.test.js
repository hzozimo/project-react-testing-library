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
  test('Encontra o texto Encountered pokémons na página', () => {
    const { getByText } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: /Home/i,
    });
    userEvent.click(homeLink);
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});

describe('redireciona para a página About, na URL /about ao clicar no link About', () => {
  test('Encontra o texto About Pokédex na página', () => {
    const { getByText } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {
      name: /About/i,
    });
    userEvent.click(aboutLink);
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });
});

describe('redireciona para Pokémons Favoritados ao clicar em Favorite Pokémons', () => {
  test('Encontra o texto About Pokédex na página', () => {
    const { getByText } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(aboutLink);
    expect(getByText('Favorite Pokémons')).toBeInTheDocument();
  });
});

describe('Redireciona para a página Not Found ao entrar em uma URL desconhecida', () => {
  test('Texto Page requested not found encontrado', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const route = '/url-desconhecida';
    history.push(route);
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
