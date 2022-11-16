import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CardComponent } from "./card/card.component";
import { CalendarComponent } from './calendar/calendar.component';
import { ModalTableComponent } from './modal-table/modal-table.component';

@NgModule({
    declarations:[
        CardComponent,
        CalendarComponent,
        ModalTableComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CardComponent,
        CalendarComponent,
        ModalTableComponent
    ]
})
export class ComponentsModule{}