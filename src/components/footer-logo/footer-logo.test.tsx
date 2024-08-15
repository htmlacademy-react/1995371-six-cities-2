import { render, screen } from '@testing-library/react';
import FooterLogo from './footer-logo';
import { withHistory } from '../../utils/mock-component';

describe('Component: Footer Logo', () => {
  it('Should render correctly', () => {
    const expectedAlt = '6 cities logo';
    const preparedComponent = withHistory(<FooterLogo />);

    render(preparedComponent);
    expect(screen.getByAltText(expectedAlt)).toBeInTheDocument();
  });
});
