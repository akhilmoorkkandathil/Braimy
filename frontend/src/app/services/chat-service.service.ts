import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  private socket: Socket;
  private url = 'http://localhost:8000';

  constructor() {
    this.socket = io(this.url); // Replace with your server URL
  }
  joinRoom(userId: string, room: string) {
    this.socket.emit('joinRoom', { userId, room });
  }

  sendMessage(room: string, message: string, sender: 'student' | 'tutor') {
    this.socket.emit('chatMessage', { room, message, sender });
  }

  getMessages(): Observable<{ message: string, sender: 'student' | 'tutor' }> {
    return new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    });
  }

  disconnect() {
    this.socket.disconnect();
  }
}
