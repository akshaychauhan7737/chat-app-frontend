import { Component, OnInit, Inject } from '@angular/core';
import * as io from 'socket.io-client';
import { AppConfig } from '../../app.config';
import { CommonMethodService } from '../../provider/common-method.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateNewChatComponent } from '../../pages/create-new-chat/create-new-chat.component';
import * as _ from "lodash";
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  /* Client instance of socket.io */
  private socket: any;
  /* User list for new chat */
  public users: Array<any> = [];
  /* Existing chat rooms list*/
  public chat_rooms: Array<any> = [];
  /* Existing message list for selected room */
  public messages: Array<any> = [];
  /* Chat window height variable */
  public chat_window_height: string = '0px';
  /* Chat new message form */
  public newChatForm: FormGroup;
  /* Selected room information */
  public selectedRoom: any = null;
  constructor(public commonMehod: CommonMethodService, private router: Router, private dialog: MatDialog, private formBuilder: FormBuilder) {
    this.newChatForm = this.formBuilder.group({
      message: ['', Validators.compose([
        Validators.required
      ])]
    });
    this.chat_window_height = this.commonMehod.innerHeight - 89 + 'px';
    this.socket = io.connect(AppConfig.SERVER_DEMAIN, { query: "user_id=" + this.commonMehod.current_user._id });;
  }
  /* Get chat room and user list on init and get message list for first active user */
  ngOnInit() {
    this.getChatRooms(0, 10);
    this.getUserList();
    this.socket.on('connect', () => {
      console.log('connect')
    });
    /* Socket update chat event */
    this.socket.on('update-chat', (update_chat) => {
      if (this.selectedRoom && update_chat._id === this.selectedRoom._id) {
        this.messages.push(update_chat.last_message);
        this.commonMehod.scrollChat();
      }
      let is_chat_room_exist = _.findIndex(this.chat_rooms, ['_id', update_chat._id])
      if (is_chat_room_exist === -1) {
        this.chat_rooms.push(update_chat);
        if ((update_chat.is_new && update_chat.last_message.sender_id === this.commonMehod.current_user._id) || this.chat_rooms.length === 1) {
          this.selectedRoom = update_chat;
          this.getMessageList(0, 100, update_chat._id)
        }
      } else {
        this.chat_rooms[is_chat_room_exist] = update_chat;
      }
      this.chat_rooms = _.orderBy(this.chat_rooms, 'last_message.createdAt', 'desc');
    });
    /* Socket acknowledgement chat event after send message */
    this.socket.on('acknowledgement-chat', (acknowledgement_chat) => {
      console.log('acknowledgement_chat', acknowledgement_chat)
      if (!acknowledgement_chat.is_success) {
        this.commonMehod.openSnackBar(AppConfig.ERROR_MESSAGE.SEND_MESSAGE_ERROR);
      }
    });
    /* Socket acknowledgement logout event after any current user logout from different window */
    this.socket.on('acknowledgement-logout', (acknowledgement_logout) => {
      console.log('acknowledgement_logout', acknowledgement_logout)
      if (acknowledgement_logout.is_logout) {
        this.logoutUser(true);
      }
    })
  }
  /* Get chat rooms list method using web calling */
  getChatRooms(offset: number, limit: number) {
    this.commonMehod.serverRequest(AppConfig.SERVER_URLS.GET_CHAT_ROOMS + '?offset=' + offset + '&limit=' + limit, 'get', null)
      .map((response: any) => response.json()).subscribe(
        (success: any) => {
          console.log(success)
          if (success.chat_room.docs.length) {
            this.chat_rooms = _.orderBy(success.chat_room.docs, 'last_message.createdAt', 'desc');

            this.selectedRoom = this.chat_rooms[0];
            this.getMessageList(0, 100, this.chat_rooms[0]._id)
          } else {
            this.chat_rooms = [];
          }
        },
        (error: any) => {
          if (error.status === 401) {
            this.socket.disconnect();
          }
          this.commonMehod.webApiError(error);
        })
  }
  /* Get user list method using web calling */
  getUserList() {
    this.commonMehod.serverRequest(AppConfig.SERVER_URLS.GET_USERS, 'get', null)
      .map((response: any) => response.json()).subscribe(
        (success: any) => {
          console.log(success)
          this.users = success.users;
        },
        (error: any) => {
          if (error.status === 401) {
            this.socket.disconnect();
          }
          this.commonMehod.webApiError(error);
        })
  }

  /* Create new chat rooms method
   * Show new chat modal
  */
  createNewChat(user: any): void {
    let dialogRef = this.dialog.open(CreateNewChatComponent, {
      width: '250px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (navigator.onLine) {
        this.socket.emit('send-message', {
          chat_room_id: result.chat_room_id,
          information: result.message,
          type: 'text',
          is_new: true
        });
      } else
        this.commonMehod.openSnackBar(AppConfig.ERROR_MESSAGE.NO_INTERNET_ERROR);

    });
  }
  /* Get selected chat room message list method using web calling */
  getMessageList(offset: number, limit: number, chat_room_id: string) {
    this.commonMehod.serverRequest(AppConfig.SERVER_URLS.GET_MESSAGES + '/' + chat_room_id + '?offset=' + offset + '&limit=' + limit, 'get', null)
      .map((response: any) => response.json()).subscribe(
        (success: any) => {
          this.messages = success.messages.docs;
          setTimeout(() => {
            this.commonMehod.scrollChat();
          }, 100);
        },
        (error: any) => {
          if (error.status === 401) {
            this.socket.disconnect();
          }
          this.commonMehod.webApiError(error);
        })
  }
  /* Send new message to backend using socket send-message event */
  sendMessage() {
    if (navigator.onLine) {
      this.socket.emit('send-message', {
        chat_room_id: this.selectedRoom._id,
        information: this.newChatForm.value.message,
        type: 'text'
      });
      this.newChatForm.reset();
    } else
      this.commonMehod.openSnackBar(AppConfig.ERROR_MESSAGE.NO_INTERNET_ERROR);

  }
  /* Select new room from existing list */
  selectChatRoom(select_room: any) {
    this.selectedRoom = select_room;
    this.getMessageList(0, 100, select_room._id)
  }


  /* Logout or remove sesson from backend and call logout socket event for remove session from other browser */
  logoutUser(byAcknowledgement?: boolean) {
    if (!byAcknowledgement && navigator.onLine)
      this.socket.emit('logout', {});
    this.commonMehod.serverRequest(AppConfig.SERVER_URLS.LOGOUT, 'get', null)
      .map((response: any) => response.json()).subscribe(
        (success: any) => {
          this.commonMehod.openSnackBar(AppConfig.SUCCESS_MESSAGE.LOGOUT_SUCCESS);
          this.router.navigate(['./login']);
          this.socket.disconnect();
        },
        (error: any) => {
          if (error.status === 401) {
            this.socket.disconnect();
          }
          this.commonMehod.webApiError(error);
        })
  }
}