import { fireEvent, render, screen } from '@testing-library/react';
import { withStore } from '../../../utils/mock-component';
import { makeFakeStoreState } from '../../../utils/mocks';
import ReviewForm from './reviews-form';
import userEvent from '@testing-library/user-event';
import * as apiAction from '../../../store/api-action';

type TMockRatingChooserProps = {
  currentRatingValue: number;
  onRatingChange: (newValue: number) => void;
  isDisabled: boolean;
}
const mockRatingChooserTestid = 'mocked RatingChooser';
vi.mock('../../rating-chooser/rating-chooser', () => ({
  default: (props: TMockRatingChooserProps) => <div onClick={() => props.onRatingChange(props.currentRatingValue + 1)} data-testid={mockRatingChooserTestid}>{props.currentRatingValue}</div>
}));

describe('Component: ReviewForm', () => {
  const reviewFormTestid = 'review form element';
  const reviewTitleText = 'Your review';
  const submitButtonText = 'Submit';
  const reviewTextTestid = 'review text element';
  const helpElementTestid = 'help text element';
  const stubReviewText = 'There is some test text review for some review form';

  const initialState = makeFakeStoreState();

  it('Should render correctly', () => {
    const { withStoreComponent } = withStore(<ReviewForm />, initialState);
    render(withStoreComponent);

    expect(screen.getByText(reviewTitleText)).toBeInTheDocument();
    expect(screen.getByTestId(reviewTextTestid)).toBeInTheDocument();
    expect(screen.getByTestId(helpElementTestid)).toBeInTheDocument();
    expect(screen.getByText(submitButtonText)).toBeInTheDocument();
  });

  it('Should render correctly when user enter review description', async () => {
    const { withStoreComponent } = withStore(<ReviewForm />, initialState);
    render(withStoreComponent);

    await userEvent.type(
      screen.getByTestId(reviewTextTestid),
      stubReviewText
    );

    expect(screen.getByDisplayValue(stubReviewText)).toBeInTheDocument();
  });

  it('Should render correctly when user click at rating chooser', async () => {
    const { withStoreComponent } = withStore(<ReviewForm />, initialState);
    render(withStoreComponent);

    await userEvent.click(
      screen.getByTestId(mockRatingChooserTestid)
    );

    expect(screen.getByTestId(mockRatingChooserTestid).textContent).toBe('1');
  });

  it('Should dispatch postNewOfferReviewAction in case of submit valid review data', async () => {
    const postNewOfferReviewActionSpy = vi.spyOn(apiAction, 'postNewOfferReviewAction');

    const { withStoreComponent } = withStore(<ReviewForm />, initialState);
    render(withStoreComponent);

    await userEvent.type(
      screen.getByTestId(reviewTextTestid),
      stubReviewText
    );

    await userEvent.click(
      screen.getByTestId(mockRatingChooserTestid)
    );

    fireEvent.submit(screen.getByTestId(reviewFormTestid));

    expect(postNewOfferReviewActionSpy).toHaveBeenCalledTimes(1);
  });
});
