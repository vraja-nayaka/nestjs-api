import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class CursorGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('cursor')
  handleMessage(@MessageBody() message: [number, number]): void {
    this.server.emit('cursor', message);
  }
}
