exports.PORT =  process.env.PORT || 5000;

exports.MONGO_URI = process.env.NODE_ENV === 'production' ? process.env.MONGO_URI_PROD : MONGO_URI_DEV;

