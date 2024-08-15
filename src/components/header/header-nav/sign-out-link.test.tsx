import { render, screen } from '@testing-library/react';
import { withHistory } from '../../../utils/mock-component';
import SignOutLink from './sign-out-link';
import userEvent from '@testing-library/user-event';

describe('Component: SignOutLink', () => {
  const stubOnclickFunction = vi.fn();

  it('Should render correctly', () => {
    const expectedSignoutText = 'Sign out';
    const preparedComponent = withHistory(<SignOutLink onClick={stubOnclickFunction} />);
    render(preparedComponent);
    expect(screen.getByText(expectedSignoutText)).toBeInTheDocument();
  });

  it('Should call onClick function when user click', async () => {
    const signOutLinkElementTestid = 'sign out link';
    const preparedComponent = withHistory(<SignOutLink onClick={stubOnclickFunction} />);
    render(preparedComponent);

    await userEvent.click(screen.getByTestId(signOutLinkElementTestid));

    expect(stubOnclickFunction).toBeCalledTimes(1);
  });
});
