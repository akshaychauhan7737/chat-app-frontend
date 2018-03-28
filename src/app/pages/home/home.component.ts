import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { AppConfig } from '../../app.config';
import { CommonMethodService } from '../../provider/common-method.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private socket: any; // The client instance of socket.io
  constructor(private commonMehod: CommonMethodService) {
    console.log(this.commonMehod.current_user)
    this.socket = io.connect(AppConfig.SERVER_DEMAIN, { query: "user_id=" + this.commonMehod.current_user._id });;
  }

  ngOnInit() {
    this.socket.on('connect',() => {
      console.log('connect')
    });
    this.socket.on('get-list', (chat_list) => {
      console.log('chat_list', chat_list)
    });
  }

}
