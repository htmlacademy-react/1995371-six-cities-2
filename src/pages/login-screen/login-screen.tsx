import { Offers } from '../../types/offers';

import { HeaderMode } from '../../const/mode';
import Header from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-action';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const/const';

type LoginScreenProps = {
  offers: Offers;
}

export default function LoginScreen({offers}: LoginScreenProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const currentAuthorizationStatus = useAppSelector((store) => store.authorizationStatus);

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        email: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };

  return (
    currentAuthorizationStatus === AuthorizationStatus.Auth
      ? <Navigate to={AppRoute.Main} />
      : (
        <div className="page page--gray page--login">
          <Helmet>
            <title>Six cities. Login</title>
          </Helmet>
          <Header headerMode={HeaderMode.LoginScreen} offers={offers}/>
          <main className="page__main page__main--login">
            <div className="page__login-container container">
              <section className="login">
                <h1 className="login__title">Sign in</h1>
                <form
                  className="login__form form"
                  action="#"
                  method="post"
                  onSubmit={handleFormSubmit}
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
                    />
                  </div>
                  <button className="login__submit form__submit button" type="submit">Sign in</button>
                </form>
              </section>
              <section className="locations locations--login locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>Amsterdam</span>
                  </a>
                </div>
              </section>
            </div>
          </main>
        </div>
      )
  );
}
