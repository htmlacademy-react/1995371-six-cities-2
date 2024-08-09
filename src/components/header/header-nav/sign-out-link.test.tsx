import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-component';
import SignOutLink from './sign-out-link';

describe('Component: SignOutLink', () => {
  it('Should render correctly', () => {
    const expectedSignoutText = 'Sign out';
    const {withStoreComponent} = withStore(<SignOutLink />);
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);
    expect(screen.getByText(expectedSignoutText)).toBeInTheDocument();
  });
});
