import { render, screen } from '@testing-library/react';
import RatingStarButton from './rating-star-button';
import userEvent from '@testing-library/user-event';


describe('Component: RatingStarButton', () => {
  const inputTestid = 'starButton input';
  const inputLabelTestid = 'starButton label';
  const svgTestid = 'starButton img';
  const stubTitle = 'test title text';
  const stubOnRatingChangeFunction = vi.fn();
  const stubValue = 4;

  it('Should render correctly', () => {

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

  it('Should render correctly in case of isDisabled', () => {

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

  it('Should call onClick function when user clicks', async () => {
    render(
      <RatingStarButton
        title={stubTitle}
        value={stubValue}
        isChecked={false}
        onRatingChange={stubOnRatingChangeFunction}
        isDisabled={false}
      />
    );

    await userEvent.click(screen.getByTestId(inputLabelTestid));

    expect(stubOnRatingChangeFunction).toBeCalledTimes(1);
  });
});
