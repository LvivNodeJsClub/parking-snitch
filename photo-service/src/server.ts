import restify from 'restify';

const server = restify.createServer({ name: 'photo-service' });

server.use(
	restify.plugins.bodyParser({
		keepExtensions: true,
		multiples: true,
	})
);

export default server;
