exports.PORT = process.env.NODE_ENV === 'production' ?  process.env.PORT : 5000;

exports.MONGO_URI = process.env.NODE_ENV === 'production' ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;

exports.JWT_EMAIL_VERIFY_SIGN_OPTIONS = process.env.NODE_ENV === 'production' ? { expiresIn: '24h' } : { expiresIn: '24h' };

exports.SENDGRID_APIKEY = process.env.NODE_ENV === 'production' ? process.env.SEND_GRID_KEY_PROD : process.env.SEND_GRID_KEY_DEV;

exports.JWT_EMAIL_VERIFY_SIGN_KEY = process.env.NODE_ENV === 'production' ? process.env.JWT_EMAIL_VERIFY_SIGN_PROD : process.env.JWT_EMAIL_VERIFY_SIGN_DEV;

exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production' 
  ? process.env.CLIENT_ORIGIN
  : 'http://localhost:3000';

exports.PROJECT_EMAIL = process.env.NODE_ENV === 'production' ? process.env.PROJECT_EMAIL_PROD : process.env.PROJECT_EMAIL_DEV;