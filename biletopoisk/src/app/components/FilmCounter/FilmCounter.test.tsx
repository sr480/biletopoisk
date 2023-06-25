import { selectFilmAmount } from '@/app/store/features/cart/selector';
import { RenderResultExtended, renderWithProviders } from '@/app/store/storeMock';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { FilmCounter } from './FilmCounter';

jest.mock("../AppModal/AppModal", () => {
  return {
    AppModal: () => {
      return <div>AppModal</div>;
    },
  };
});

describe('#FilmCounter', () => {
  const filmId = 'abcd';
  let container: RenderResultExtended;
  const initialCounter = 1;

  describe('without reset button', () => {
    beforeEach(() => {
      container = renderWithProviders(<FilmCounter filmId={filmId} />, {
        preloadedState: {
          cart: {
            [filmId]: initialCounter,
          }
        }
      });
    });

    it('should render initial count and buttons without reset', () => {
      expect(container.getByTitle('Убавить')).toBeInTheDocument();
      expect(container.getByText(`${initialCounter}`)).toBeInTheDocument();
      expect(container.getByTitle('Добавить')).toBeInTheDocument();
      expect(container.queryByTitle('Удалить')).not.toBeInTheDocument();
    });

    it('should increment on + click', () => {
      fireEvent.click(container.getByText('+'));
      expect(container.getByText(`${initialCounter + 1}`)).toBeInTheDocument();
      expect(selectFilmAmount(container.store.getState(), filmId)).toBe(initialCounter + 1);
    });

    it('should decrement on - click', () => {
      fireEvent.click(container.getByTitle('Убавить'));
      expect(container.getByText(`${initialCounter - 1}`)).toBeInTheDocument();
      expect(selectFilmAmount(container.store.getState(), filmId)).toBe(initialCounter - 1);
    });

    it('should disable - button on 0', () => {
      fireEvent.click(container.getByText('-'));
      expect(container.getByTitle('Убавить')).toBeDisabled();
    });
  });
  describe('with reset button', () => {
    beforeEach(() => {
      container = renderWithProviders(<FilmCounter filmId={filmId} allowReset={true} />, {
        preloadedState: {
          cart: {
            [filmId]: initialCounter,
          }
        }
      });
    });

    it('should render buttons with reset', () => {
      expect(container.getByTitle('Убавить')).toBeInTheDocument();
      expect(container.getByText(`${initialCounter}`)).toBeInTheDocument();
      expect(container.getByTitle('Добавить')).toBeInTheDocument();
      expect(container.getByTitle('Удалить')).toBeInTheDocument();
    });
    
    it('should reset on reset click', () => {
      expect(container.getByText('1')).toBeInTheDocument();
      fireEvent.click(container.getByTitle('Удалить'));
      expect(container.getByText('AppModal')).toBeInTheDocument();
    });
  });
});
