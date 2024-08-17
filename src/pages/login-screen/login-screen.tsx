import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-action';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import { HeaderMode } from '../../const/mode';
import Header from '../../components/header/header';
import { getRandomCity } from '../../utils/mocks';
import { updateCurrentCity, updateCityOffersList } from '../../store/data-process/data-process.slice';

export default function LoginScreen(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const currentAuthorizationStatus = useAppSelector(getAuthorizationStatus);

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const randomCity = getRandomCity();

  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        email: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };

  const handleCityFilterButtonClick = () => {
    dispatch(updateCurrentCity(randomCity));
    dispatch(updateCityOffersList());
  };

  return (
    currentAuthorizationStatus === AuthorizationStatus.Auth
      ? <Navigate to={AppRoute.Main} />
      : (
        <div className="page page--gray page--login">
          <Helmet>
            <title>Six cities. Login</title>
          </Helmet>
          <Header headerMode={HeaderMode.LoginScreen}/>
          <main className="page__main page__main--login">
            <div className="page__login-container container">
              <section className="login">
                <h1 className="login__title" data-testid='screen title element'>Sign in</h1>
                <form
                  className="login__form form"
                  action="#"
                  method="post"
                  onSubmit={handleFormSubmit}
                  data-testid='login form element'
                >
                  <div className="login__input-wrapper form__input-wrapper">
                    <label className="visually-hidden">E-mail</label>
                    <input
                      ref={loginRef}
                      className="login__input form__input"
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      data-testid='login element'
                    />
                  </div>
                  <div className="login__input-wrapper form__input-wrapper">
                    <label className="visually-hidden">Password</label>
                    <input
                      ref={passwordRef}
                      className="login__input form__input"
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                      data-testid='password element'
                    />
                  </div>
                  <button
                    className="login__submit form__submit button"
                    type="submit"
                    data-testid='submit button element'
                  >
                    Sign in
                  </button>
                </form>
              </section>
              <section className="locations locations--login locations--current">
                <div className="locations__item">
                  <Link
                    to={AppRoute.Main}
                    className="locations__item-link"
                    onClick={handleCityFilterButtonClick}
                    data-testid='city filter button element'
                  >
                    <span>{randomCity.name}</span>
                  </Link>
                </div>
              </section>
            </div>
          </main>
        </div>
      )
  );
}
