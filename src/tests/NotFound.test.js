import React from 'react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente NotFound.js', () => {
  test('este se página contém um heading h2 com o texto Page requested not found', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const notFoundText = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const imageNotFound = getAllByRole('img');
    expect(imageNotFound[1]).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
