import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CompromissosModel } from 'src/app/models/compromissos.model';


@Component({
  selector: 'app-modal-table',
  templateUrl: './modal-table.component.html',
  styleUrls: ['./modal-table.component.sass']
})
export class ModalTableComponent implements OnInit {
  @ViewChild('template') template: ElementRef|any;
  @Input() compromissos: Array<CompromissosModel> = [];

  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  openModal() {
    console.log(this.compromissos);
    this.modalRef = this.modalService.show(this.template);
  }

  removerData(id: string) {
    this.compromissos = this.compromissos.filter(function (item) {
      return item.id !== id;
    });

    localStorage.setItem('compromissos', JSON.stringify(this.compromissos));
  }

}
