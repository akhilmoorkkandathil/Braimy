import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserChatSidebarComponent } from '../user-chat-sidebar/user-chat-sidebar.component';
import { UserChatBodyComponent } from '../user-chat-body/user-chat-body.component';

@Component({
  selector: 'app-user-chat',
  standalone: true,
  imports: [CommonModule,FormsModule,UserChatSidebarComponent,UserChatBodyComponent],
  templateUrl: './user-chat.component.html',
  styleUrl: './user-chat.component.scss',
})
export class UserChatComponent{

  conversation;


  onConversationSelected(conversation){
    this.conversation = conversation;
  }
}
