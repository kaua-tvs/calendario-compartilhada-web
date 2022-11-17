import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';


interface Member{
  email: string;
  nome: string;
  permitir_edicao: boolean;
}

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.sass'],
})
export class AddMembersComponent implements OnInit {
  membersForms: FormGroup;
  members: FormArray; //FormArray

  constructor(private fb: FormBuilder) {
    this.members = this.fb.array([]);

    this.membersForms = this.fb.group({
      members: this.fb.array([this.createMember()]),
    });
  }

  ngOnInit(): void {}
  
  get membersControls() {
    var arr = this.membersForms.get('members') as FormArray;
    return arr.controls;
  }

  submit(){
    if(this.membersForms.valid){
      let req: Array<any> = [];
      req = JSON.parse(localStorage.getItem('incluir-membros') || '[]');
      
      this.membersForms.value.members.forEach((item: any) => {
        req.push(item);
      });

      localStorage.setItem('incluir-membros', JSON.stringify(req));
    }
  }

  addMoreMember() {}

  createMember(): FormGroup {
    return this.fb.group({
      email: ['', Validators.required],
      nome: [''],
      permitir_edicao: false,
    });
  }

  addMembers(): void {
    this.members = this.membersForms.get('members') as FormArray;
    this.members.push(this.createMember());
  }

  removeMembers(i: number) {
    if(i > 0 || this.membersControls.length > 1)
      this.members.removeAt(i);
  }

  logValue() {
    console.log(this.members.value);
  }
}
