import { render, screen } from '@testing-library/react';
import FavoritesSectionEmpty from './favorites-section-empty';

describe('Component: FavoritesSectionEmpty', () => {
  it('should render correctly', () => {
    const expectedTitleText = 'Favorites (empty)';
    const expectedStatusText = 'Nothing yet saved.';
    const expectedDescriptionText = 'Save properties to narrow down search or plan your future trips.';

    render(<FavoritesSectionEmpty />);
    expect(screen.getByText(expectedTitleText)).toBeInTheDocument();
    expect(screen.getByText(expectedStatusText)).toBeInTheDocument();
    expect(screen.getByText(expectedDescriptionText)).toBeInTheDocument();
  });
});
