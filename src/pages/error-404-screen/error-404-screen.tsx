import { Link } from 'react-router-dom';

export default function Error404Screen(): React.JSX.Element {
  return (
    <div className="page">
      <main className="page__main">
        <div
          className="container"
          style={{
            paddingTop: '20px',
            paddingBottom: '20px',
            textAlign: 'center',
            backgroundColor: '#f5f5f5'
          }}
        >
          <h1>404 Страница не найдена.</h1>
          <Link
            to='/'
            style={{
              display: 'inline-block',
              padding: '9px 21px 6px 11px',
              fontSize: '19px',
              lineHeight: '1.211,',
              fontWeight: '300',
              fontStyle: 'oblique',
              transform: 'skew(-15deg)',
              borderRadius: '3px',
              transition: 'background .3s, color .3s, text-shadow .3s',
              textShadow: '1px 0 0, .5px 0 0, -1px 0 0',
              color: '#fff',
              backgroundColor: '#4481c3'
            }}
          >
            <span
              style={{
                display: 'block',
                transform: 'skew(15deg)'
              }}
            >
              Вернуться на главную страницу
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
}
