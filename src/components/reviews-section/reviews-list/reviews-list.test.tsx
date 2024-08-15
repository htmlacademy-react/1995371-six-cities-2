import { render, screen } from '@testing-library/react';
import { makeFakeReview } from '../../../utils/mocks';
import ReviewsList from './reviews-list';

const reviewTestid = 'mocked ReviewItem';
vi.mock('../review-item/review-item', () => ({
  default: () => <div data-testid='mocked ReviewItem'>Mocked review</div>
}));

describe('Component: ReviewsList', () => {
  it('Should render correctly', () => {
    const reviewsListTestid = 'reviews list element';
    const stubReviews = [makeFakeReview(), makeFakeReview()];

    render(<ReviewsList reviews={stubReviews} />);

    expect(screen.getByTestId(reviewsListTestid)).toBeInTheDocument();
    expect(screen.getAllByTestId(reviewTestid).length).toBe(stubReviews.length);
  });
});
