import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
  ColorMapModel,
  HeatMapModel,
  SimpleDate,
} from 'src/app/components/calendar/calendar.component';
import { ModalTableComponent } from 'src/app/components/modal-table/modal-table.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  @ViewChild('simpleCalender') simpleCalender: ElementRef | any;
  @ViewChild('modalTable') modalTable: ElementRef | any;
  form: FormGroup;
  compromissos: Array<any> = [];
  public selDate: SimpleDate = { date: 11, month: 10, year: 2022 };
  public heatmap: HeatMapModel;
  public highlightToday: boolean;
  public colorMap: ColorMapModel;
  // public modalRef: BsModalRef = [];

  constructor(builder: FormBuilder) {
    this.form = builder.group({
      data_compromisso: new FormControl(''),
      titulo_compromisso: new FormControl(''),
      horario_inicio: new FormControl(''),
      horario_fim: new FormControl(''),
      eh_dia_todo: false,
    });

    this.heatmap = {};
    this.highlightToday = true;
    this.colorMap = {
      heatMapColor: '',
      primaryColor: '',
      primaryForeground: '',
      backgroundColor: '',
      previousDateColor: '',
    };
  }

  ngOnInit(): void {
    this.carregarCalendario();
  }

  carregarCalendario() {
    this.selDate = {
      date: new Date().getDay(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
    };

    this.compromissos = JSON.parse(
      localStorage.getItem('compromissos') || '[]'
    );

    this.compromissos.map((m) => {
      const dateSplit = m.data_compromisso.split('/');
      
      this.heatmap[Number(dateSplit[2] + dateSplit[1] + dateSplit[0])] = {
        color: '#f28500 ',
        opacity: 1,
        idDate: { data_inicial: m.data_compromisso },
      };

      this.highlightToday = true;
    });
  }

  dateChanged(date: SimpleDate) {}

  monthChanged(date: SimpleDate) {}

  //Open Modal with information of event
  viewEventCalendar(dayEvent: any) {
    const data = this.compromissos.find(f => f.data_compromisso === dayEvent)
    if(data != undefined){
      
        this.modalTable.openModal();
    }
  }

  montarDadosParaSalvar() {
      const req = this.dadosReq()

      this.salvarData(req);
  }

  dadosReq() {
    const id = this.compromissos.length > 0 ? this.compromissos.at(0).id + 1 : 0;
    const data = this.form.controls['data_compromisso'].value?.split('-');
    return {
      id: id,
      data_compromisso: `${data[2]}/${data[1]}/${data[0]}`,
      titulo_compromisso: this.form.controls['titulo_compromisso'].value,
      horario_inicio: this.form.controls['horario_inicio'].value,
      horario_fim: this.form.controls['horario_fim'].value,
      eh_dia_todo: this.form.controls['eh_dia_todo'].value,
    };
  }

  salvarData(req: any) {
    this.compromissos.push(req);
    localStorage.setItem('compromissos', JSON.stringify(this.compromissos));
    this.carregarCalendario();
  }
}
