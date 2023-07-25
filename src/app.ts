// region Project Libraries
import ExpressServer from './infra/servers/ExpressServer';
// endregion

const server = new ExpressServer();

server.start();
