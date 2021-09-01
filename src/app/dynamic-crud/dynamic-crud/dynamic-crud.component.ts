import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Kpi } from 'app/shared/model/Kpi';
import { KpiService } from 'app/shared/service/kpi.service';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';
import { SaveDialogComponent } from '../components/save-dialog/save-dialog.component';
import { SaveTresholdDialogComponent } from '../components/save-treshold-dialog/save-treshold-dialog.component';

@Component({
  selector: 'app-dynamic-crud',
  templateUrl: './dynamic-crud.component.html',
  styleUrls: ['./dynamic-crud.component.css']
})
export class DynamicCrudComponent implements OnInit {
  
    constant = 'Costant'
    constantAux: any[] = [this.constant];
    operators = [
        '+',
        '-',
        '*',
        '/',
        '(',
        ')',
        '[',
        ']',
        '{',
        '}',
    ];
    
    kpiInUse = [];
    trash = [];
    allKpiBlocks: any = [];

    constructor(
        public dialog: MatDialog,
        private kpiService: KpiService
    ) { }

    ngOnInit(): void {
        this.getAllKpi();
    }

    getAllKpi(): void {
        this.kpiService.getAllKpi().subscribe(
            elements =>  this.allKpiBlocks = elements
        );
    }

    drop(event: CdkDragDrop<any[]>, ignore?: boolean) {
        if(!ignore){
            if (event.previousContainer != event.container) {
            // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
            // } else {
                    copyArrayItem(event.previousContainer.data,
                                    event.container.data,
                                    event.previousIndex,
                                    event.currentIndex);
                }
        }
    }

    dropInUse(event: CdkDragDrop<any[]>) {
        if (event.previousContainer.data === this.kpiInUse) {
            transferArrayItem(event.previousContainer.data,
                            event.container.data,
                            event.previousIndex,
                            event.currentIndex);
        }
    }
    //refil($event)
    refil(event: CdkDragDrop<any[]>) {
        if (event.previousContainer != event.container) {
        event.previousContainer.data.push(JSON.parse(JSON.stringify(event.container.data[event.currentIndex])))
        }
    }

    modifyKpi(){
        let inputs = ['Totale voli in orario','/','Totale voli'];
        this.kpiInUse.push(...inputs);
    }

    addTresholdKpi() {
        const dialogRef = this.dialog.open(SaveTresholdDialogComponent, {
            width: '500px',
            height: '400px',
            data: {algo: this.kpiInUse}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }
    //elimina KPI chiedere conferma con un dialog
    deleteKpi(kpi: Kpi) {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '500px',
            height: '300px',
            data: kpi
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.kpiService.deleteKpi(kpi).subscribe(
                    //.............
                )
            }
        });
    }
    //pulisce il KPI maker
    clear() {
        this.kpiInUse = [];
    }
    //rimuove un oggetto dal KPI maker
    removeItem(item){

    }

    save() {
        const dialogRef = this.dialog.open(SaveDialogComponent, {
            width: '500px',
            height: '400px',
            data: {algo: this.kpiInUse}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    checkSing() {
        /*let operator = this.todo.find((el) => (el == '+' || el == '-' || el == '*' || el == '/'));
        console.log(operator)
        if(operator){
        this.todo.splice(this.todo.indexOf(operator), 1);
        }*/

    }

}
