import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-nombre',
  templateUrl: './edit-nombre.component.html',
  styleUrls: ['./edit-nombre.component.css']
})
export class EditNombreComponent {


  data:any;

  confirmChanges():void {
    this.dialogRef.close(this.data)
  }
  discardChanges():void {
    this.dialogRef.close(null)
  }



  constructor(
    private dialogRef: MatDialogRef<EditNombreComponent>,
    @Inject(MAT_DIALOG_DATA) data:any) {
    this.data = data
  }

}
