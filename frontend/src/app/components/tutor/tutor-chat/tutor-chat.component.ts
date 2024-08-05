import { Component , OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatServiceService } from '../../../services/chat-service.service';
import { ChatMessage } from '../../../interfaces/chatMessage';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tutor-chat',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './tutor-chat.component.html',
  styleUrl: './tutor-chat.component.css'
})
export class TutorChatComponent implements OnInit {
  @ViewChild('chatBox') private chatBox!: ElementRef;
  messages: ChatMessage[] = [];
  newMessage: string = '';
  roomId: string = 'user-tutor-room';

  constructor(private chatService: ChatServiceService) { }

  ngOnInit() {
    this.chatService.joinRoom('tutor', this.roomId);

    this.chatService.getMessages().subscribe((message: ChatMessage) => {
      this.messages.push(message);
      this.scrollToBottom();
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage(this.roomId, this.newMessage, 'tutor');
      this.messages.push({ message: this.newMessage, sender: 'tutor' });
      this.newMessage = '';
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    try {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
