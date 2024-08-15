import { render, screen } from '@testing-library/react';
import { makeFakeCityImageUrl } from '../../../utils/mocks';
import Gallery from './gallery';

describe('Component: Gallery', () => {
  const imageTestid = 'gallery image';
  it('Should render correctly', () => {
    const stubImageUrls = [
      makeFakeCityImageUrl(),
      makeFakeCityImageUrl()
    ];

    render(<Gallery imageUrls={stubImageUrls} />);
    expect(screen.getAllByTestId(imageTestid).length).toBe(stubImageUrls.length);
  });
});
