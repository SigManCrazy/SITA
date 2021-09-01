import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-save-treshold-dialog',
  templateUrl: './save-treshold-dialog.component.html',
  styleUrls: ['./save-treshold-dialog.component.css']
})
export class SaveTresholdDialogComponent {


constructor(    public dialogRef: MatDialogRef<SaveTresholdDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
        this.dialogRef.close();
        }

}
