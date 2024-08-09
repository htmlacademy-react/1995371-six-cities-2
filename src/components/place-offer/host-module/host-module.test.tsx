import { render, screen } from '@testing-library/react';
import { makeFakeBaseUser, makeFakeDescription } from '../../../utils/mocks';
import HostModule from './host-module';

describe('Component: HostModule', () => {
  const proMarkerTestid = 'pro marker element';
  const hostAvatarTestid = 'host avatar element';
  const hostNameTestid = 'hostName element';

  const stubBaseHost = makeFakeBaseUser();
  const stubDescription = makeFakeDescription();
  const expectedTitleText = 'Meet the host';

  it('Should render correctly in case of is Pro', () => {
    const stubHost = {
      ...stubBaseHost,
      isPro: true
    };

    render(<HostModule hostInfo={stubHost} description={stubDescription} />);
    expect(screen.getByTestId(proMarkerTestid)).toBeInTheDocument();
    expect(screen.getByTestId(hostAvatarTestid).getAttribute('src')).toBe(stubHost.avatarUrl);
    expect(screen.getByTestId(hostNameTestid).textContent).toBe(stubHost.name);
    expect(screen.getByText(expectedTitleText)).toBeInTheDocument();
    expect(screen.getByText(stubDescription)).toBeInTheDocument();
  });

  it('Should render correctly in case of is not Pro', () => {
    const stubHost = {
      ...stubBaseHost,
      isPro: false
    };

    render(<HostModule hostInfo={stubHost} description={stubDescription} />);
    expect(screen.queryByTestId(proMarkerTestid)).toBeFalsy();
    expect(screen.getByTestId(hostAvatarTestid).getAttribute('src')).toBe(stubHost.avatarUrl);
    expect(screen.getByTestId(hostNameTestid).textContent).toBe(stubHost.name);
    expect(screen.getByText(expectedTitleText)).toBeInTheDocument();
    expect(screen.getByText(stubDescription)).toBeInTheDocument();
  });
});
