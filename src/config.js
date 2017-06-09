const config = {
  'secret': 'siso-app-geolocation',
  'database': (user, password) => `mongodb://${user}:${password}@ds143231.mlab.com:43231/siso`
};

export {config};

