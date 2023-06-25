import { render, screen } from '@testing-library/react';
import { FilmReviewsList } from './FilmReviewsList';
import { renderWithProviders } from '@/app/store/storeMock';


xdescribe('#FilmReviewsList', () => {
  it('should render reviews when data is loaded', async () => {
    const mockReviews = [{ id: '1', title: 'Test Review' }];

    renderWithProviders(<FilmReviewsList filmId="123" />, {
      preloadedState: {
        films: {
          queries: {
            getReviewsByFilm: {
              '123': { lalala: 'foooffooof' }
            }
          }
        }
      }
    });

    expect(screen.getByText(mockReviews[0].title)).toBeInTheDocument();
  });

  xit('should not render reviews when data is loading', async () => {
    const mockUseGetReviewsByFilmQuery = jest.fn(() => ({
      data: null,
      isLoading: true,
    }));
    jest.mock('@/app/store/services/filmsApi', () => ({
      useGetReviewsByFilmQuery: mockUseGetReviewsByFilmQuery,
    }));

    render(<FilmReviewsList filmId="123" />);

    // Expect that there is no child element rendered when loading
    expect(screen.queryByText(/./)).not.toBeInTheDocument();
  });
});