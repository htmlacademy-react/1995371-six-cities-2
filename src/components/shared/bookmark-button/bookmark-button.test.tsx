import { render, screen } from '@testing-library/react';
import { AuthorizationStatus } from '../../../const/const';
import { StoreNameSpace } from '../../../const/store';
import { BookmarkButtonMode } from '../../../const/mode';
import { makeFakeShortOffer } from '../../../utils/mocks';
import { withStore } from '../../../utils/mock-component';
import BookmarkButton from './bookmark-button';

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

  it('should render correctly in case of is favorite', () => {
    const activeButtonClassName = `${defaultBookmarkButtonMode}__bookmark-button--active`;

    const { withStoreComponent } = withStore(<BookmarkButton offer={{...stubOffer, isFavorite: true}} />, initialState);
    render(withStoreComponent);

    expect(screen.getByTestId(bookmarkButtonTestid).classList.contains(activeButtonClassName)).toBeTruthy();
    expect(screen.getByTestId(bookmarkImgTestid)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correctly in case of is not favorite', () => {
    const buttonClassName = `${defaultBookmarkButtonMode}__bookmark-button`;
    const activeButtonClassName = `${defaultBookmarkButtonMode}__bookmark-button--active`;

    const { withStoreComponent } = withStore(<BookmarkButton offer={{...stubOffer, isFavorite: false}} />, initialState);
    render(withStoreComponent);

    expect(screen.getByTestId(bookmarkButtonTestid).classList.contains(buttonClassName)).toBeTruthy();
    expect(screen.getByTestId(bookmarkButtonTestid).classList.contains(activeButtonClassName)).toBeFalsy();
    expect(screen.getByTestId(bookmarkImgTestid)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render correctly in case of specific mode', () => {
    const stubMode = BookmarkButtonMode.Offer;
    const buttonClassName = `${stubMode}__bookmark-button`;

    const { withStoreComponent } = withStore(<BookmarkButton offer={stubOffer} bookmarkButtonMode={stubMode} />, initialState);
    render(withStoreComponent);

    expect(screen.getByTestId(bookmarkButtonTestid).classList.contains(buttonClassName)).toBeTruthy();
    expect(screen.getByTestId(bookmarkImgTestid)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
