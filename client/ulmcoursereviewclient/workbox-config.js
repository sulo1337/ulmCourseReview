module.exports = {
    globDirectory: './public/',
    globPatterns: ['\*\*/\*.{html,js,ico,png}'],
    swDest: './public/sw.js',
    clientsClaim: true,
    skipWaiting: true
};