import { render, screen } from '@testing-library/react';
import Spinner from './spinner';

describe('Component: Spinner', () => {
  it('Should render correctly', () => {
    const expectedText = 'test description';
    render(<Spinner description={expectedText} />);
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
