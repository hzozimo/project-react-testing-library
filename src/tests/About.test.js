import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Teste se a página contém as informações sobre a Pokédex', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutText = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutText).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getAllByText } = renderWithRouter(<About />);

    const paragraphQuant = getAllByText(/Pokémons/);
    expect(paragraphQuant.length).toBe(2);
  });
});
