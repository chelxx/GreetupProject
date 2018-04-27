import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../chat.service';
import * as io from "socket.io-client";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  user: String;
  room: String;
  messageText: String;
  messageArray: Array<{ user: String, message: String }> = [];
  constructor(private _chatService: ChatService) {
    this._chatService.newUserJoined()
      .subscribe(data => this.messageArray.push(data));


    this._chatService.userLeftRoom()
      .subscribe(data => this.messageArray.push(data));

    this._chatService.newMessageReceived()
      .subscribe(data => this.messageArray.push(data));
  }

  join() {
    this._chatService.joinRoom({ user: this.user, room: this.room });
  }

  leave() {
    this._chatService.leaveRoom({ user: this.user, room: this.room });
  }

  sendMessage() {
    this._chatService.sendMessage({ user: this.user, room: this.room, message: this.messageText });
    this.messageText = ""; 
  }

}