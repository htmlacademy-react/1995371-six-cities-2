import { render, screen } from '@testing-library/react';
import { makeFakeReview } from '../../../utils/mocks';
import { huminizeDateString } from '../../../utils/date-utils';
import ReviewItem from './review-item';

const ratingTestid = 'mocked Rating';
vi.mock('../../shared/rating/rating', () => ({
  default: () => <div data-testid='mocked Rating'>Mocked rating</div>
}));

describe('Component: ReviewItem', () => {
  it('Should render correctly', () => {
    const authorAvatarTestid = 'review author avatar';
    const stubReview = makeFakeReview();
    const stubDateText = huminizeDateString(stubReview.date);

    render(<ReviewItem review={stubReview} />);

    expect(screen.getByTestId(authorAvatarTestid).getAttribute('src')).toBe(stubReview.user.avatarUrl);
    expect(screen.getByText(stubReview.user.name)).toBeInTheDocument();
    expect(screen.getByTestId(ratingTestid)).toBeInTheDocument();
    expect(screen.getByText(stubReview.comment)).toBeInTheDocument();
    expect(screen.getByText(stubDateText)).toBeInTheDocument();
  });
});
