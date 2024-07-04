import { Offers, FullOffersPack } from '../types/offers';

import { AVATAR_TEMP_URL } from '../const/const';
import { CityPack } from '../const/citypack';

const offers: Offers = [
  {
    'id': '37fc5e64-0f59-46a7-b57f-d85caeae73cb',
    'title': 'Penthouse, 4-5 rooms + 5 balconies',
    'type': 'Private room',
    'price': 137,
    'previewImage': 'https://13.design.htmlacademy.pro/static/hotel/12.jpg',
    'city': CityPack.Amsterdam,
    'location': {
      'latitude': 52.3909553943508,
      'longitude': 4.85309666406198,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 4.4,
  },
  {
    'id': 'ad4abd3a-5935-4e14-b5b4-f9ad2f26f45a',
    'title': 'Tile House',
    'type': 'Hotel',
    'price': 341,
    'previewImage': 'https://13.design.htmlacademy.pro/static/hotel/8.jpg',
    'city': CityPack.Amsterdam,
    'location': {
      'latitude': 52.3609553943508,
      'longitude': 4.85309666406198,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 2.8,
  },
  {
    'id': '5bacd8cb-0b3f-440b-bf3d-fcc1d4f4c5ec',
    'title': 'The house among olive ',
    'type': 'House',
    'price': 888,
    'previewImage': 'https://13.design.htmlacademy.pro/static/hotel/19.jpg',
    'city': CityPack.Amsterdam,
    'location': {
      'latitude': 52.3909553943508,
      'longitude': 4.929309666406198,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 3.9,
  },
  {
    'id': 'd7a375b7-f2a3-4a46-9f51-ea9208292722',
    'title': 'Tile House',
    'type': 'House',
    'price': 834,
    'previewImage': 'https://13.design.htmlacademy.pro/static/hotel/3.jpg',
    'city': CityPack.Amsterdam,
    'location': {
      'latitude': 52.3809553943508,
      'longitude': 4.939309666406198,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 2.2,
  },
];

const fullOffers: FullOffersPack = {
  '37fc5e64-0f59-46a7-b57f-d85caeae73cb': {
    'id': '37fc5e64-0f59-46a7-b57f-d85caeae73cb',
    'title': 'Penthouse, 4-5 rooms + 5 balconies',
    'type': 'Private room',
    'price': 137,
    'city': CityPack.Amsterdam,
    'location': {
      'latitude': 52.3909553943508,
      'longitude': 4.85309666406198,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 4.4,
    'description': 'Private balconies this exclusive residence offers the ultimate in privacy and luxury The sleek and modern design combined with the panoramic city views creates a truly unparalleled living experience',
    'bedrooms': 3,
    'goods': [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Coffee machine',
      'Kitchen',
      'Dishwasher',
      'Cabel TV',
      'Fridge',
    ],
    'host': {
      'name': 'Oliver Conner',
      'avatarUrl': AVATAR_TEMP_URL,
      'isPro': false
    },
    'images': [
      'https://13.design.htmlacademy.pro/static/hotel/12.jpg',
      'https://13.design.htmlacademy.pro/static/hotel/5.jpg',
      'https://13.design.htmlacademy.pro/static/hotel/7.jpg',
      'https://13.design.htmlacademy.pro/static/hotel/1.jpg'
    ],
    'maxAdults': 4
  },
  'ad4abd3a-5935-4e14-b5b4-f9ad2f26f45a': {
    'id': 'ad4abd3a-5935-4e14-b5b4-f9ad2f26f45a',
    'title': 'Tile House',
    'type': 'Hotel',
    'price': 341,
    'city': CityPack.Amsterdam,
    'location': {
      'latitude': 52.3609553943508,
      'longitude': 4.85309666406198,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 2.8,
    'description': 'The building is fairly rounded in shape. The house is half surrounded by wooden sunscreens structures. The second floor is smaller than the first, which allowed for several balconies on the sides of the house. This floor has roughly the same style as the floor below.',
    'bedrooms': 3,
    'goods': [
      'Wi-Fi',
      'Towels',
      'Heating',
      'Kitchen',
      'Cabel TV',
      'Fridge',
    ],
    'host': {
      'name': 'Mary Martinez',
      'avatarUrl': AVATAR_TEMP_URL,
      'isPro': true
    },
    'images': [
      'https://13.design.htmlacademy.pro/static/hotel/8.jpg',
      'https://13.design.htmlacademy.pro/static/hotel/15.jpg',
      'https://13.design.htmlacademy.pro/static/hotel/10.jpg'
    ],
    'maxAdults': 4
  },
  '5bacd8cb-0b3f-440b-bf3d-fcc1d4f4c5ec': {
    'id': '5bacd8cb-0b3f-440b-bf3d-fcc1d4f4c5ec',
    'title': 'The house among olive ',
    'type': 'House',
    'price': 888,
    'city': CityPack.Amsterdam,
    'location': {
      'latitude': 52.3909553943508,
      'longitude': 4.929309666406198,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 3.9,
    'description': 'From the outside this house looks posh and extravagant. It has been built with white cedar wood and has fir wooden decorations. Tall, large windows let in plenty of light and have been added to the house in a fairly asymmetrical pattern. The house is equipped with an average kitchen and three bathrooms, it also has a fairly small living room, three bedrooms, a small dining room, a library and a cozy basement.',
    'bedrooms': 3,
    'goods': [
      'Wi-Fi',
      'Washing machine',
      'Towels',
      'Heating',
      'Coffee machine',
      'Kitchen',
      'Cabel TV',
      'Fridge',
    ],
    'host': {
      'name': 'Michael Ramsey',
      'avatarUrl': AVATAR_TEMP_URL,
      'isPro': true
    },
    'images': [
      'https://13.design.htmlacademy.pro/static/hotel/18.jpg',
      'https://13.design.htmlacademy.pro/static/hotel/19.jpg',
      'https://13.design.htmlacademy.pro/static/hotel/20.jpg'
    ],
    'maxAdults': 4
  },
  'd7a375b7-f2a3-4a46-9f51-ea9208292722': {
    'id': 'd7a375b7-f2a3-4a46-9f51-ea9208292722',
    'title': 'Tile House',
    'type': 'House',
    'price': 834,
    'city': CityPack.Amsterdam,
    'location': {
      'latitude': 52.3809553943508,
      'longitude': 4.939309666406198,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 2.2,
    'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'bedrooms': 3,
    'goods': [
      'Wi-Fi',
      'Towels',
      'Heating',
      'Coffee machine',
      'Kitchen',
      'Dishwasher',
      'Fridge',
    ],
    'host': {
      'name': 'William Allison',
      'avatarUrl': AVATAR_TEMP_URL,
      'isPro': false
    },
    'images': [
      'https://13.design.htmlacademy.pro/static/hotel/16.jpg',
      'https://13.design.htmlacademy.pro/static/hotel/3.jpg',
      'https://13.design.htmlacademy.pro/static/hotel/2.jpg'
    ],
    'maxAdults': 4
  },
};

export { offers, fullOffers };
