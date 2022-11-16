import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'calendario-compartilhada';

  form: FormGroup;
  compromissos: Array<any> = [];

  constructor(builder: FormBuilder) {
    this.form = builder.group({
      data_compromisso: new FormControl(''),
      titulo_compromisso: new FormControl(''),
      horario_inicio: new FormControl(''),
      horario_fim: new FormControl(''),
      eh_dia_todo: false
    });
  }
  ngOnInit(): void {
    this.compromissos = JSON.parse(localStorage.getItem('compromissos') || '[]');
  }

  montarDadosParaSalvar() {
    if (this.compromissos.length > 0) {
      const id = this.compromissos.at(0).id + 1;

      const req = {
        id: id,
        data: this.dadosReq()
      };

      this.salvarData(req);
    } else {
      const req = {
        id: 0,
        data: this.dadosReq()
      }

      this.salvarData(req);
    }
  }

  dadosReq() {
    const data = this.form.controls['data_compromisso'].value?.split('-');
    return {
      data_compromisso: `${data[2]}/${data[1]}/${data[0]}`,
      titulo_compromisso: this.form.controls['titulo_compromisso'].value,
      horario_inicio: this.form.controls['horario_inicio'].value,
      horario_fim: this.form.controls['horario_fim'].value,
      eh_dia_todo: this.form.controls['eh_dia_todo'].value,
    };
  }

  salvarData(req: any) {
    this.compromissos.push(req)
    localStorage.setItem('compromissos', JSON.stringify(this.compromissos))
  }

  removerData(id: number) {
    this.compromissos = this.compromissos.filter(function (item) {
      return item.id !== id
    });

    localStorage.setItem('compromissos', JSON.stringify(this.compromissos))
  }

  mock() {
    return [{
      id: 1,
      data: {
        titulo_compromisso: 'Teste 1',
        data_compromisso: '1',
        horario_inicio: '2',
        horario_fim: '3',
        eh_dia_todo: ''
      }
    }]
  }
}
