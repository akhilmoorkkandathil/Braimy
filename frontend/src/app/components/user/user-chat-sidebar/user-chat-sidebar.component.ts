import { Component, EventEmitter, Output } from '@angular/core';import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-chat-sidebar',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-chat-sidebar.component.html',
  styleUrl: './user-chat-sidebar.component.scss'
})
export class UserChatSidebarComponent {
  @Output() conversationClicked: EventEmitter<any> = new EventEmitter();
  searchText: string;
  conversations = [
    {
      name: 'David',
      time: '8:21',
      latestMessage: 'Hi there!!',
      latestMessageRead: false,
      messages: [
        { id: 1, body: 'Hello worldd', time: '8:21', me: true },
        { id: 2, body: 'How are you?', time: '8:21', me: false },
        { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
        { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
      ],
    },
    {
      name: 'James',
      time: '8:21',
      latestMessage: 'wow',
      latestMessageRead: true,
      messages: [
        { id: 1, body: 'Hello worldddd', time: '8:21', me: true },
        { id: 2, body: 'How are you?', time: '8:21', me: false },
        { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
        { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
      ],
    },
    {
      name: 'Andrew',
      time: '8:21',
      latestMessage: 'I am fine',
      latestMessageRead: false,
      messages: [
        { id: 1, body: 'Hello worlddddd', time: '8:21', me: true },
        { id: 2, body: 'How are you?', time: '8:21', me: false },
        { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
        { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
      ],
    },
    {
      name: 'Richard',
      time: '8:21',
      latestMessage: 'lol',
      latestMessageRead: true,
      messages: [
        { id: 1, body: 'Hello worddldddd', time: '8:21', me: true },
        { id: 2, body: 'How are you?', time: '8:21', me: false },
        { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
        { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
      ],
    },
    {
      name: 'Dyno',
      time: '8:21',
      latestMessage: 'Alright',
      latestMessageRead: false,
      messages: [
        { id: 1, body: 'Hello world', time: '8:21', me: true },
        { id: 2, body: 'How are you?', time: '8:21', me: false },
        { id: 3, body: 'I am fine thanks', time: '8:21', me: true },
        { id: 4, body: 'Glad to hear that', time: '8:21', me: false },
      ],
    }
  ];

  get filteredConversations() {
    return this.conversations.filter((conversation) => {
      return (
        conversation.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        conversation.latestMessage
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
      );
    });
  }
}
