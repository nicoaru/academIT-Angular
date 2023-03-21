import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() show:boolean;
  @Input() styles:Object;
  @Output() onClose = new EventEmitter<any>();
  

  closeModal():void {
    console.log("Entró en closeModal() en hijo");
    this.onClose.emit();
    // this.show = false;
    console.log("show en hijo: ", this.show)
   }
}
