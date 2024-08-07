import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import Error404Screen from './error-404-screen';

describe('Component: Error 404 screen', () => {
  it('should render correctly', () => {
    const expectedTitleText = '404 Страница не найдена.';
    const expectedLinkText = 'Вернуться на главную страницу';

    render(withHistory(<Error404Screen />));

    expect(screen.getByText(expectedTitleText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
