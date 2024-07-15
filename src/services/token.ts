export type TToken = string;

const AUTH_TOKEN_NAME = 'six-cities-token';

function getToken(): TToken {
  const token = localStorage.getItem(AUTH_TOKEN_NAME);

  return token ?? '';
}

function saveToken(token: TToken) {
  localStorage.setItem(AUTH_TOKEN_NAME, token);
}

function removeToken() {
  localStorage.removeItem(AUTH_TOKEN_NAME);
}

export {
  getToken,
  saveToken,
  removeToken
};
