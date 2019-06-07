module.exports = {
    version: '1.3.0',
    init: function (pluginContext) {
        pluginContext.registerGatewayRoute(require('./routes/healthcheck'));
    }
};
