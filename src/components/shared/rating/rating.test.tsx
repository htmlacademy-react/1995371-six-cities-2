import { render, screen } from '@testing-library/react';
import { RatingViewMode } from '../../../const/mode';
import { roundToInteger } from '../../../utils/utils';
import Rating from './rating';

describe('Component: Rating', () => {
  it('should render correctly in case of default rating mode', () => {
    const ratingContainerTestid = 'rating container';
    const ratingStarsTestid = 'rating stars';
    const defaultRatingMode = RatingViewMode.Card;
    const expectedText = 'Rating';
    const expectedContainerClassName = `${defaultRatingMode}__rating rating`;
    const stubOfferRating = 4;
    const ratingWidthValue = `${2 * roundToInteger(stubOfferRating)}0%`;

    render(<Rating offerRating={stubOfferRating} />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(ratingContainerTestid)).toBeInTheDocument();
    expect(screen.getByTestId(ratingContainerTestid).className).toBe(expectedContainerClassName);
    expect(screen.getByTestId(ratingStarsTestid)).toBeInTheDocument();
    expect(screen.getByTestId(ratingStarsTestid).style.width).toBe(ratingWidthValue);
  });

  it('should render correctly in case of specific rating mode', () => {
    const ratingContainerTestid = 'rating container';
    const ratingStarsTestid = 'rating stars';
    const ratingMode = RatingViewMode.Reviews;
    const expectedText = 'Rating';
    const expectedContainerClassName = `${ratingMode}__rating rating`;
    const stubOfferRating = 4;
    const ratingWidthValue = `${2 * roundToInteger(stubOfferRating)}0%`;

    render(<Rating offerRating={stubOfferRating} ratingViewMode={ratingMode} />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(ratingContainerTestid)).toBeInTheDocument();
    expect(screen.getByTestId(ratingContainerTestid).className).toBe(expectedContainerClassName);
    expect(screen.getByTestId(ratingStarsTestid)).toBeInTheDocument();
    expect(screen.getByTestId(ratingStarsTestid).style.width).toBe(ratingWidthValue);
  });
});
