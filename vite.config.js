const { defineConfig } = require('vite');
module.exports = defineConfig({ server: {proxy: {'/api': 'http://127.0.0.1:3001'}} });
