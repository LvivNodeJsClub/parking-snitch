import restify from "restify";

const server = restify.createServer({ name: "image-server" });

server.use(restify.plugins.bodyParser({
    keepExtensions: true,
    multiples: true,
}));

export default server;
