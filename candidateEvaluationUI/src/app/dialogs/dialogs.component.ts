import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent implements OnInit {

  message = "";
  private $selectedOption = new BehaviorSubject<boolean>(false);
  @ViewChild("container") container;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {}

  openDialog(message) {
    this.message = message;
    this.renderer.setStyle(this.container.nativeElement,'display', 'flex');
    
  }

  closeDialog() {
    this.renderer.setStyle(this.container.nativeElement,'display', 'none');
  }

  onSuccess() {
    this.closeDialog();
    this.$selectedOption.next(true);
  }

  onCancel() {
    this.closeDialog();
    this.$selectedOption.next(false);
  }

  getSelectedOption() {
    return this.$selectedOption;
  }
}
