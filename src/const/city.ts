const City = {
  Paris: {
    name: 'Paris',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 13
    }
  },
  Cologne: {
    name: 'Cologne',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 13
    }
  },
  Brussels: {
    name: 'Brussels',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 13
    }
  },
  Amsterdam: {
    name: 'Amsterdam',
    location: {
      latitude: 52.37052366645486,
      longitude: 4.9013696820795,
      zoom: 12
    }
  },
  Hamburg: {
    name: 'Hamburg',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 13
    }
  },
  Dusseldorf: {
    name: 'Dusseldorf',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 13
    }
  },
} as const;

const DEFAULT_CITY = City.Amsterdam;

export { City, DEFAULT_CITY };
