// your-app/nuxt.config.js

const path = require('path');

module.exports = {
    loading: {
        color: '#92D3CE',
    },
    rootDir: path.resolve(__dirname),
    dev: process.env.NODE_ENV !== 'production',
};