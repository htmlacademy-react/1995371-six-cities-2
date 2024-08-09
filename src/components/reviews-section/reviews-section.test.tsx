import { render, screen } from '@testing-library/react';
import ReviewsSection from './reviews-section';
import { makeFakeStoreState } from '../../utils/mocks';
import { StoreNameSpace } from '../../const/store';
import { AuthorizationStatus } from '../../const/const';
import { withStore } from '../../utils/mock-component';

const reviewsListTestid = 'mocked ReviewsList';
vi.mock('./reviews-list/reviews-list', () => ({
  default: () => <div data-testid='mocked ReviewsList'>Mocked review&apos;s list</div>
}));

const reviewFormTestid = 'mocked ReviewForm';
vi.mock('./reviews-form/reviews-form', () => ({
  default: () => <div data-testid='mocked ReviewForm'>Mocked review&apos;s form</div>
}));

describe('Component: ReviewsList', () => {
  const reviewsAmountTestid = 'reviews amount element';
  const initialState = makeFakeStoreState();

  it('Should render correctly in case of user is authorized', () => {
    const stubInitialState = {
      ...initialState,
      [StoreNameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userEmail: ''
      }
    };
    const { withStoreComponent } = withStore(<ReviewsSection />, stubInitialState);

    render(withStoreComponent);

    expect(screen.getByTestId(reviewsAmountTestid).textContent).toBe(stubInitialState.data.currentOfferReviews.length.toString());
    expect(screen.getByTestId(reviewsListTestid)).toBeInTheDocument();
    expect(screen.getByTestId(reviewFormTestid)).toBeInTheDocument();
  });

  it('Should render correctly in case of user authorizationStatus is unknown', () => {
    const { withStoreComponent } = withStore(<ReviewsSection />, initialState);

    render(withStoreComponent);

    expect(screen.getByTestId(reviewsAmountTestid).textContent).toBe(initialState.data.currentOfferReviews.length.toString());
    expect(screen.getByTestId(reviewsListTestid)).toBeInTheDocument();
    expect(screen.queryByTestId(reviewFormTestid)).not.toBeInTheDocument();
  });
});
