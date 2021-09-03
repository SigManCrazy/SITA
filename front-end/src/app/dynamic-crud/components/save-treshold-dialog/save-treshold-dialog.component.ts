import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { data } from 'jquery';

@Component({
  selector: 'app-save-treshold-dialog',
  templateUrl: './save-treshold-dialog.component.html',
  styleUrls: ['./save-treshold-dialog.component.css']
})
export class SaveTresholdDialogComponent {

    threshold: number;

    constructor(
        public dialogRef: MatDialogRef<SaveTresholdDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.threshold = 12 //this.data.threshold;
    }

    confirm(): void {
        this.dialogRef.close({isToUpdate: true, threshold: this.threshold});
    }

    refuse(): void {
        this.dialogRef.close({isToUpdate: false});
    }

}
