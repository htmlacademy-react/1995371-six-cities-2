import { render, screen } from '@testing-library/react';
import { AuthorizationStatus } from '../../../const/const';
import { DEFAULT_CITY } from '../../../const/citypack';
import { StoreNameSpace } from '../../../const/store';
import { makeFakeFullOffer } from '../../../utils/mocks';
import { withHistory, withStore } from '../../../utils/mock-component';
import { defaultSort } from '../../../utils/sort-utils';
import ProfileLink from './profile-link';

describe('Component: ProfileLink', () => {
  const userNameTestid = 'username element';
  const favoritesCountTestid = 'favorites count element';
  const signInTestid = 'sign in element';

  const stubFavoriteOffers = [
    makeFakeFullOffer({}),
    makeFakeFullOffer({})
  ];
  const stubEmail = 'test@email.com';

  const initialState = {
    [StoreNameSpace.Data]: {
      currentCity: DEFAULT_CITY,
      offers: [],
      favoriteOffers: stubFavoriteOffers,
      cityOffers: [],
      nearbyOffers: [],
      currentOffer: null,
      currentOfferReviews: [],
      sortType: defaultSort,
      isLoading: false,
      isNoCurrentOffer: false,
      isFormDisabled: false,
    },
    [StoreNameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Unknown,
      userEmail: stubEmail,
    }
  };

  it('Should render correctly in case of athorized', () => {

    const { withStoreComponent } = withStore(<ProfileLink isAuthorized/>, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    expect(screen.queryByTestId(signInTestid)).toBeFalsy();
    expect(screen.getByTestId(userNameTestid)).toBeInTheDocument();
    expect(screen.getByTestId(favoritesCountTestid)).toBeInTheDocument();
  });

  it('Should render correctly in case of unathorized', () => {
    const { withStoreComponent } = withStore(<ProfileLink isAuthorized={false}/>, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    expect(screen.queryByTestId(userNameTestid)).toBeFalsy();
    expect(screen.queryByTestId(favoritesCountTestid)).toBeFalsy();
    expect(screen.getByTestId(signInTestid)).toBeInTheDocument();
  });
});
