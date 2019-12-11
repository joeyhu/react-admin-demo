const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/api', {
      target: 'http://127.0.0.1:7001',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        // '^/s_user/api': '/api'
      }
      // cookieDomainRewrite: "http://localhost:3000"
    })
  )
}
