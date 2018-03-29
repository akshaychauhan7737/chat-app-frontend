import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HomeComponent } from '../../pages/home/home.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonMethodService } from '../../provider/common-method.service';
import { AppConfig } from '../../app.config';
@Component({
  selector: 'app-create-new-chat',
  templateUrl: './create-new-chat.component.html',
  styleUrls: ['./create-new-chat.component.css']
})
export class CreateNewChatComponent implements OnInit {
  /* Chat form instance */
  public newChatForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<HomeComponent>, private commonMehod: CommonMethodService,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) {
    this.newChatForm = this.formBuilder.group({
      message: ['', Validators.compose([
        Validators.required
      ])]
    });
  }
  /* Chat Modal cancel click event */
  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  /* Send Message Event */
  sendNewMessage() {
    this.commonMehod.serverRequest(AppConfig.SERVER_URLS.CREATE_CHAT_ROOMS, 'post', {
      reciver_id: this.data._id
    })
      .map((response: any) => response.json()).subscribe(
        (success: any) => {
          this.dialogRef.close({
            message: this.newChatForm.value.message,
            reciver_id: this.data._id,
            chat_room_id: success.chat_room._id
          });
        },
        (error: any) => {
          this.commonMehod.webApiError(error);
        })
  }

}
