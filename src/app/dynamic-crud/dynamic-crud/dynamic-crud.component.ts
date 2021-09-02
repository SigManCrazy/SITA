import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BasicElement } from 'app/shared/model/Basicelements';
import { Kpi } from 'app/shared/model/Kpi';
import { BasicElementsService } from 'app/shared/service/basic-elements.service';
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
  
    constant = '';
    valueFilter = '';
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
    
    kpiInUse = []; //elements all'interno del KPI maker
    trash = [];
    
    //components = basic elements + kpis
    //filtrati
    components: any = [];
    //non filtrati
    allComponents: any = [];

    constructor(
        public dialog: MatDialog,
        private kpiService: KpiService,
        private basicElementsService: BasicElementsService
    ) { }

    ngOnInit(): void {
        this.initElementsList() //lista di kpis e basic elements
    }

    initElementsList(): void {
        this.getAllKpi();
        this.getAllBasicElements();
    }

    getAllKpi(): void {
        this.kpiService.getAllKpi().subscribe(
            elements => {
                this.components = [...this.components, ...elements];
                this.allComponents = [...this.allComponents, ...elements];
            }
        );
    }

    getAllBasicElements(): void{
        this.basicElementsService.getAllBasicElements().subscribe(
            elements => {
                this.components = [...this.components, ...elements];
                this.allComponents = [...this.allComponents, ...elements];
            }
        )
    }

    searchData() {
        this.components = this.allComponents.filter((item) => {
        return item.label.toLowerCase().includes(this.valueFilter.toLowerCase());
        });
    }

    isKpi(val): boolean { 
        //le kpi hanno la formula
        return val.hasOwnProperty('formula'); 
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

        dialogRef.afterClosed().subscribe(toDelete => {
            if(toDelete){
                //elimino nel db
                this.kpiService.deleteKpi(kpi).subscribe(
                    //.............
                )
                //elimino localmente
                for (let i = 0; i < this.components.length; i++) {
                    if (this.components[i].name === kpi.name) {
                        this.components.splice(i--, 1);
                    }
                }
                for (let i = 0; i < this.allComponents.length; i++) {
                    if (this.allComponents[i].name === kpi.name) {
                        this.allComponents.splice(i--, 1);
                    }
                }
            }
        });
    }

    //pulisce il KPI maker
    clear() {
        this.kpiInUse = [];
    }
    //rimuove un oggetto dal KPI maker
    removeItem(index){
        this.kpiInUse.splice(index, 1)
    }
    //salva la formula appena creata nel KPI maker
    save() {
        const dialogRef = this.dialog.open(SaveDialogComponent, {
            width: '500px',
            height: '400px',
            data: {algo: this.kpiInUse}
        });
    
        dialogRef.afterClosed().subscribe(newKpi => {
            if(newKpi.isToCreate){
                let kpi = {
                    name: '', //newKpi.name, ?? compito del BE o FE? //TODO
                    label: newKpi.label,
                    formula: [...this.kpiInUse],
                    threshold: newKpi.threshold
                }
                console.log(kpi)
                this.components.unshift(kpi);
                this.allComponents.unshift(kpi);
            }
        });
    }

    getAlg(): string {
        let alg = '[  ';
        this.kpiInUse.forEach(el => {
            if(typeof el === 'string'){
                alg += '"' + el + '"';
            }else{
                alg += '"' + el.label + '"';
            }
            alg += ', ';
        })
        alg = alg.slice(0, -2);
        return alg += ']';
    }

    getLabel(item): string {
        if(typeof item === 'string'){
            return item;
        }
        return item.label;
    }

    checkSing() {
        /*let operator = this.todo.find((el) => (el == '+' || el == '-' || el == '*' || el == '/'));
        console.log(operator)
        if(operator){
        this.todo.splice(this.todo.indexOf(operator), 1);
        }*/

    }

}
