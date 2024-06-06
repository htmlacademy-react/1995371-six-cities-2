import { Link } from 'react-router-dom';

export default function Error404Screen(): React.JSX.Element {
  return (
    <>
      <h1>404. Страница не найдена.</h1>
      <Link to='/'>Вернуться на главную страницу</Link>
    </>
  );
}
