import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.css']
})
export class SaveDialogComponent {

  constructor(    
        public dialogRef: MatDialogRef<SaveDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
      }
}
