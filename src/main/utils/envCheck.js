const isProd = () => process.env.NODE_ENV === 'production';
const isDev = () => process.env.NODE_ENV === 'development';
const isDebuggingProd = () => process.env.DEBUG_PROD === 'true';

exports.isProd = isProd;
exports.isDev = isDev;
exports.isDebuggingProd = isDebuggingProd;
