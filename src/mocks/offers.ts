import { AVATAR_TEMP_URL } from '../const';
import { Offers } from '../types/offers';

const offers: Offers = [
  {
    'id': '37fc5e64-0f59-46a7-b57f-d85caeae73cb',
    'title': 'Penthouse, 4-5 rooms + 5 balconies',
    'type': 'room',
    'price': 137,
    'previewImage': 'https://13.design.htmlacademy.pro/static/hotel/12.jpg',
    'city': {
      'name': 'Cologne',
      'location': {
        'latitude': 50.938361,
        'longitude': 6.959974,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 50.941361,
      'longitude': 6.956974,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': true,
    'rating': 4.4,
    'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'bedrooms': 3,
    'goods': [
      'Heating'
    ],
    'host': {
      'name': 'Oliver Conner',
      'avatarUrl': AVATAR_TEMP_URL,
      'isPro': false
    },
    'images': [
      'https://url-to-image/image.png'
    ],
    'maxAdults': 4
  },
  {
    'id': 'ad4abd3a-5935-4e14-b5b4-f9ad2f26f45a',
    'title': 'Tile House',
    'type': 'hotel',
    'price': 341,
    'previewImage': 'https://13.design.htmlacademy.pro/static/hotel/8.jpg',
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.37454,
        'longitude': 4.897976,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 52.385540000000006,
      'longitude': 4.902976,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 2.8,
    'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'bedrooms': 3,
    'goods': [
      'Heating'
    ],
    'host': {
      'name': 'Mary Martinez',
      'avatarUrl': AVATAR_TEMP_URL,
      'isPro': true
    },
    'images': [
      'https://url-to-image/image.png'
    ],
    'maxAdults': 4
  },
  {
    'id': '5bacd8cb-0b3f-440b-bf3d-fcc1d4f4c5ec',
    'title': 'The house among olive ',
    'type': 'house',
    'price': 888,
    'previewImage': 'https://13.design.htmlacademy.pro/static/hotel/19.jpg',
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.37454,
        'longitude': 4.897976,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 52.397540000000006,
      'longitude': 4.9099759999999995,
      'zoom': 16
    },
    'isFavorite': true,
    'isPremium': false,
    'rating': 3.9,
    'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'bedrooms': 3,
    'goods': [
      'Heating'
    ],
    'host': {
      'name': 'Michael Ramsey',
      'avatarUrl': AVATAR_TEMP_URL,
      'isPro': true
    },
    'images': [
      'https://url-to-image/image.png'
    ],
    'maxAdults': 4
  },
  {
    'id': 'd7a375b7-f2a3-4a46-9f51-ea9208292722',
    'title': 'Tile House',
    'type': 'house',
    'price': 834,
    'previewImage': 'https://13.design.htmlacademy.pro/static/hotel/3.jpg',
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.37454,
        'longitude': 4.897976,
        'zoom': 13
      }
    },
    'location': {
      'latitude': 52.37454,
      'longitude': 4.881976,
      'zoom': 16
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 2.2,
    'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'bedrooms': 3,
    'goods': [
      'Heating'
    ],
    'host': {
      'name': 'William Allison',
      'avatarUrl': AVATAR_TEMP_URL,
      'isPro': false
    },
    'images': [
      'https://url-to-image/image.png'
    ],
    'maxAdults': 4
  },
];

export { offers };
