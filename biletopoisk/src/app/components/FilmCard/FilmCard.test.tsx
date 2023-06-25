import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FilmCard } from './FilmCard';

jest.mock("../FilmCounter/FilmCounter", () => {
  return {
    FilmCounter: () => {
      return <div>Counter</div>;
    },
  };
});
describe('#FilmCard', () => {
  const mockFilm = {
    id: '1',
    title: 'Mock Film Title',
    posterUrl: '/mock-poster-url.jpg',
    genre: 'action',
  };

  it('should render the film title', () => {
    const { getByText } = render(<FilmCard film={mockFilm} />);
    
    expect(getByText('Mock Film Title')).toBeInTheDocument();
  });

  it('should render the film poster', () => {
    const { getByAltText } = render(<FilmCard film={mockFilm} />);
    
    const poster = getByAltText('Mock Film Title');
    expect(poster).toBeInTheDocument();
    expect(poster.tagName).toBe('IMG');
  });

  it('should render film genre', () => {
    const { getByText } = render(<FilmCard film={mockFilm} />);

    expect(getByText('Боевик')).toBeInTheDocument();
  });

  it('should render the film counter', () => {
    const { getByText } = render(<FilmCard film={mockFilm}/>);

    expect(getByText('Counter')).toBeInTheDocument();
  });
});
