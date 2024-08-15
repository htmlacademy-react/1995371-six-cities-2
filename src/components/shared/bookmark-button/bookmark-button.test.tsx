import { render, screen } from '@testing-library/react';
import { AppRoute, AuthorizationStatus } from '../../../const/const';
import { StoreNameSpace } from '../../../const/store';
import { BookmarkButtonMode } from '../../../const/mode';
import { makeFakeShortOffer } from '../../../utils/mocks';
import { withStore } from '../../../utils/mock-component';
import BookmarkButton from './bookmark-button';
import userEvent from '@testing-library/user-event';
import * as action from '../../../store/action';
import * as apiAction from '../../../store/api-action';

describe('Component: BookmarkButton', () => {
  const bookmarkButtonTestid = 'bookmark button element';
  const bookmarkImgTestid = 'bookmark img';
  const expectedText = 'To bookmarks';

  const defaultBookmarkButtonMode = BookmarkButtonMode.Card;
  const stubOffer = makeFakeShortOffer({});
  const initialState = {
    [StoreNameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      userEmail: ''
    }
  };

  it('Should render correctly in case of is favorite', () => {
    const activeButtonClassName = `${defaultBookmarkButtonMode}__bookmark-button--active`;

    const { withStoreComponent } = withStore(<BookmarkButton offer={{...stubOffer, isFavorite: true}} />, initialState);
    render(withStoreComponent);

    expect(screen.getByTestId(bookmarkButtonTestid).classList.contains(activeButtonClassName)).toBeTruthy();
    expect(screen.getByTestId(bookmarkImgTestid)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('Should render correctly in case of is not favorite', () => {
    const buttonClassName = `${defaultBookmarkButtonMode}__bookmark-button`;
    const activeButtonClassName = `${defaultBookmarkButtonMode}__bookmark-button--active`;

    const { withStoreComponent } = withStore(<BookmarkButton offer={{...stubOffer, isFavorite: false}} />, initialState);
    render(withStoreComponent);

    expect(screen.getByTestId(bookmarkButtonTestid).classList.contains(buttonClassName)).toBeTruthy();
    expect(screen.getByTestId(bookmarkButtonTestid).classList.contains(activeButtonClassName)).toBeFalsy();
    expect(screen.getByTestId(bookmarkImgTestid)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('Should render correctly in case of specific mode', () => {
    const stubMode = BookmarkButtonMode.Offer;
    const buttonClassName = `${stubMode}__bookmark-button`;

    const { withStoreComponent } = withStore(<BookmarkButton offer={stubOffer} bookmarkButtonMode={stubMode} />, initialState);
    render(withStoreComponent);

    expect(screen.getByTestId(bookmarkButtonTestid).classList.contains(buttonClassName)).toBeTruthy();
    expect(screen.getByTestId(bookmarkImgTestid)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should dispatch redirect to login screen in case of click and user is not authorized', async () => {
    const stubState = {
      [StoreNameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userEmail: ''
      }
    };

    const redirectToRouteSpy = vi.spyOn(action, 'redirectToRoute');

    const { withStoreComponent } = withStore(<BookmarkButton offer={stubOffer} />, stubState);
    render(withStoreComponent);

    await userEvent.click(screen.getByTestId(bookmarkButtonTestid));

    expect(redirectToRouteSpy).toHaveBeenCalledWith({ route: AppRoute.Login });
  });

  it('should dispatch setOfferFavoriteStatusAction in case of click and user is authorized', async () => {
    const setOfferFavoriteStatusActionSpy = vi.spyOn(apiAction, 'setOfferFavoriteStatusAction');

    const { withStoreComponent } = withStore(<BookmarkButton offer={stubOffer} />, initialState);
    render(withStoreComponent);

    await userEvent.click(screen.getByTestId(bookmarkButtonTestid));

    expect(setOfferFavoriteStatusActionSpy).toHaveBeenCalledWith({offerId: stubOffer.id, isFavorite: !stubOffer.isFavorite});
  });
});
