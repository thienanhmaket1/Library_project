import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent implements OnInit {
  
  @Input() message: any

  constructor(public selfDialog: NbDialogRef<Component>,) { }

  ngOnInit(): void {
  }

  close(confirm) {
    this.selfDialog.close({ confirm })
 }

}
