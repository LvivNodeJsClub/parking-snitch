import server from './server';

const {PORT = 3000} = process.env;

server
    .then((app) => {
        app.listen(PORT, () => console.log(`Listening port ${PORT}`));
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
