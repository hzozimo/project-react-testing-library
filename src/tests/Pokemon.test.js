import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const moreDetails = 'More details';

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

describe('O card do Pokémon indicado na Pokédex contém um link detalhes', () => {
  test('O link deve possuir a URL com id do Pokémon exibido', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkMoreDetails = getByText(moreDetails);
    const { id } = pokemons[0];
    expect(linkMoreDetails).toHaveAttribute(
      'href',
      `/pokemons/${id}`,
    );
  });
});

describe('Clicar no link redireciona para a página de detalhes', () => {
  test('Redirecionamento', () => {
    const { getByText } = renderWithRouter(<App />);
    const linkMoreDetails = getByText(moreDetails);
    const { name } = pokemons[0];
    userEvent.click(linkMoreDetails);
    expect(getByText(name)).toBeInTheDocument();
  });
});

describe('A URL muda para contendo a ID do pokemon', () => {
  test('id encontrada', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkMoreDetails = getByText(moreDetails);
    const { id } = pokemons[0];
    userEvent.click(linkMoreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });
});

describe('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  test('Estrela encontrada com src correto', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const linkMoreDetails = getByText(moreDetails);
    userEvent.click(linkMoreDetails);
    const pokemonFavoritado = getByText('Pokémon favoritado?');
    userEvent.click(pokemonFavoritado);
    const star = getAllByRole('img');
    expect(star[1]).toHaveAttribute(
      'src',
      '/star-icon.svg',
    );
    expect(star[1]).toBeInTheDocument();
  });

  test('Estrela encontrada com alt correto', () => {
    const { getByText, getAllByRole } = renderWithRouter(<App />);
    const linkMoreDetails = getByText('More details');
    const { name } = pokemons[0];
    userEvent.click(linkMoreDetails);
    const star = getAllByRole('img');
    expect(star[1]).toHaveAttribute(
      'alt',
      `${name} is marked as favorite`,
    );
  });
});
