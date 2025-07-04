// import {SubscribeMessage,WebSocketGateway,WebSocketServer,OnGatewayInit,OnGatewayConnection,OnGatewayDisconnect,MessageBody,ConnectedSocket} from '@nestjs/websockets';
// import { Logger } from '@nestjs/common';
// import { Socket, Server } from 'socket.io';

// @WebSocketGateway({
//   cors: {
//     origin: '*',
//   },
// })
// export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer()
//   server: Server;
//   private logger = new Logger('EventsGateway');

//   afterInit(server: Server) {
//     this.logger.log('Initialized WebSocket Gateway');
//   }

//   handleConnection(client: Socket) {
//     this.logger.log(`Client connected: ${client.id}`);
//   }

//   handleDisconnect(client: Socket) {
//     this.logger.log(`Client disconnected: ${client.id}`);
//   }

//   @SubscribeMessage('messageToServer')
//   handleMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket): string {
//     return 'Message received: ' + data;
//   }

//   notifyTodoAssigned(userId: number, payload: any) {
//   this.server.emit(`todoAssigned:${userId}`, payload);
// }

// }


import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger, OnModuleInit } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('EventsGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized WebSocket Gateway');
  }

  handleConnection(client: Socket) {
  this.logger.log(`Client connected: ${client.id}`);

  this.notifyTodoAssigned(5, {
    todoId: 999,
    projectId: 1,
    message: 'Hello from server! (Test notification)'
  });
}


  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('messageToServer')
  handleMessage(@MessageBody() data: string, @ConnectedSocket() client: Socket): string {
    return 'Message received: ' + data;
  }

  notifyTodoAssigned(userId: number, payload: any) {
    this.server.emit(`todoAssigned:${userId}`, payload);
  }

  onModuleInit() {
    setTimeout(() => {
      const testUserId = 5;
      const payload = {
        todoId: 999,
        projectId: 1,
        message: 'Test todo assignment',
      };
      this.server.emit(`todoAssigned:${testUserId}`, payload);
      this.logger.log(`✅ Test emit sent to todoAssigned:${testUserId}`);
    }, 3000);
  }
}
