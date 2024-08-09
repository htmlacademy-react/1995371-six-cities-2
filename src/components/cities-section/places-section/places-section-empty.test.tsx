import { render, screen } from '@testing-library/react';
import PlacesSectionEmpty from './places-section-empty';

describe('Component: PlacesSectionEmpty', () => {
  it('Should render correctly', () => {
    const stubCityName = 'Saint-Petersburg';
    const expectedStatusText = 'No places to stay available';
    const expectedDescriptionText = `We could not find any property available at the moment in ${stubCityName}`;

    render(<PlacesSectionEmpty cityTitle={stubCityName} />);
    expect(screen.getByText(expectedStatusText)).toBeInTheDocument();
    expect(screen.getByText(expectedDescriptionText)).toBeInTheDocument();
  });
});
