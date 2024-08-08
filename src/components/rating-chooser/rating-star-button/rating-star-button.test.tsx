import { render, screen } from '@testing-library/react';
import RatingStarButton from './rating-star-button';


describe('Component: RatingStarButton', () => {
  const inputTestid = 'starButton input';
  const svgTestid = 'starButton input';
  const stubTitle = 'test title text';
  const stubOnRatingChangeFunction = vi.fn();
  const stubValue = 4;

  it('should render correctly', () => {

    render(
      <RatingStarButton
        title={stubTitle}
        value={stubValue}
        isChecked
        onRatingChange={stubOnRatingChangeFunction}
        isDisabled={false}
      />
    );

    const inputElement = screen. getByTestId(inputTestid);
    expect(inputElement).not.toBeDisabled();
    expect(inputElement.getAttribute('value')).toBe(stubValue.toString());
    expect(screen.getByTitle(stubTitle)).toBeInTheDocument();
    expect(screen.getByTestId(svgTestid)).toBeInTheDocument();
  });

  it('should render correctly in case of isDisabled', () => {

    render(
      <RatingStarButton
        title={stubTitle}
        value={stubValue}
        isChecked
        onRatingChange={stubOnRatingChangeFunction}
        isDisabled
      />
    );

    const inputElement = screen. getByTestId(inputTestid);
    expect(inputElement).toBeDisabled();
    expect(inputElement.getAttribute('value')).toBe(stubValue.toString());
    expect(screen.getByTitle(stubTitle)).toBeInTheDocument();
    expect(screen.getByTestId(svgTestid)).toBeInTheDocument();
  });
});
