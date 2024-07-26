const BASE_URL = 'https://13.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

enum APIRoute {
  Offers = '/offers',
  FavoriteOffers = '/favorite',
  Login = '/login',
  Comments = '/comments',
  NearbyOffers = '/nearby'
}

const FavoriteStatus = {
  Add: 1,
  Remove : 2
} as const;

export {
  BASE_URL,
  REQUEST_TIMEOUT,
  APIRoute,
  FavoriteStatus
};
