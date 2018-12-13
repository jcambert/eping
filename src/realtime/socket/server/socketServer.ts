import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

export interface Message {
    from?:string;
    content?:string;
}

export class SocketServer{
    public static readonly PORT:number = 8081;
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number  ;

    constructor() {
        this.app = express();
        this.port =  SocketServer.PORT;

        this.server = createServer(this.app);
        this.io = socketIo(this.server);
        this.listen();
    }

    

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', this.port);
            socket.on('message', (m: Message) => {
                console.log('[server](message): %s', JSON.stringify(m));
                this.io.emit('message', m);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    public getApp(): express.Application {
        return this.app;
    }
}

export default new SocketServer()