const BASE_URL = 'https://13.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

const FavoriteStatusPathNumber = {
  Add: 1,
  Remove : 0
} as const;

enum APIRoute {
  Offers = '/offers',
  FavoriteOffers = '/favorite',
  Login = '/login',
  Comments = '/comments',
  NearbyOffers = '/nearby'
}

export {
  BASE_URL,
  REQUEST_TIMEOUT,
  FavoriteStatusPathNumber,
  APIRoute
};
