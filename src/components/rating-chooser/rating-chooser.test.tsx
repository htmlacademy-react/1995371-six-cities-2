import { render, screen } from '@testing-library/react';
import RatingChooser from './rating-chooser';
import { RatingStarTitle } from '../../const/const';

const starButtonTestid = 'mocked RatingStarButton';
vi.mock('./rating-star-button/rating-star-button', () => ({
  default: () => <div data-testid='mocked RatingStarButton'>Mocked button</div>
}));

const stubOnRatingChangeFunction = vi.fn();

describe('Component: RatingChooser', () => {
  it('Should render correctly', () => {
    const expectedButtonsAmount = Object.keys(RatingStarTitle).length;
    render(<RatingChooser currentRatingValue={1} onRatingChange={stubOnRatingChangeFunction} isDisabled={false} />);
    expect(screen.getAllByTestId(starButtonTestid).length).toBe(expectedButtonsAmount);
  });
});
