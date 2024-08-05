import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';


@Component({
  selector: 'app-user-chat-body',
  standalone: true,
  imports: [CommonModule,FormsModule,PickerModule],
  templateUrl: './user-chat-body.component.html',
  styleUrl: './user-chat-body.component.scss'
})
export class UserChatBodyComponent {
  @Input() conversation;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  emojiPickerVisible;
  message : string = '';
  constructor() {}

  ngOnInit(): void {}

  submitMessage(event) {
    let value = event.target.value.trim();
    this.message = '';
    if (value.length < 1) return false;
    this.conversation.latestMessage = value;
    this.conversation.messages.unshift({
      id: 1,
      body: value,
      time: '10:21',
      me: true,
    });
    return true
  }

  emojiClicked(event: any) {
    this.message += event.emoji.native;
  }
}
