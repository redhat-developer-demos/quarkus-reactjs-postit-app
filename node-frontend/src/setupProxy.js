const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {

    // gateway post to local quarkus
    var backend_quarkus_host = 'localhost';
    var backend_quarkus_port = '8080';

    if (process.env.COMPONENT_QUARKUS_BACKEND_HOST) {
        backend_quarkus_host = process.env.COMPONENT_QUARKUS_BACKEND_HOST;
    }

    if (process.env.COMPONENT_QUARKUS_BACKEND_PORT) {
        backend_quarkus_port = process.env.COMPONENT_QUARKUS_BACKEND_PORT;
    }

    app.use(
        '/posts',
        createProxyMiddleware({
            target: `http://${backend_quarkus_host}:${backend_quarkus_port}`,
            changeOrigin: true
        })
    );


    var uppercase_quarkus_host = 'localhost';
    var uppercase_quarkus_port = '8082';

    if (process.env.COMPONENT_QUARKUS_UPPERCASE_HOST) {
        uppercase_quarkus_host = process.env.COMPONENT_QUARKUS_UPPERCASE_HOST;
    }

    if (process.env.COMPONENT_QUARKUS_UPPERCASE_PORT) {
        uppercase_quarkus_port = process.env.COMPONENT_QUARKUS_UPPERCASE_PORT;
    }

    app.use(
        '/touppercase',
        createProxyMiddleware({
            target: `http://${uppercase_quarkus_host}:${uppercase_quarkus_port}`,
            changeOrigin: true
        })
    );
};

