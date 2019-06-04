module.exports = function (gatewayExpressApp) {
    gatewayExpressApp.get('/healthcheck', (req, res) => {
        res.json({status: 'OK'});
    });
};
