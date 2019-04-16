import app from './app'
import { init } from './init';

const {PORT} = process.env;

init().then(() => {
    app.listen(PORT, () => console.log(`Listening port ${PORT}`));
});
