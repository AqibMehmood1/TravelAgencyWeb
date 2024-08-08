import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  team: FormGroup;
  savebtn: string = "save";
  showModal: boolean = false;
  hidePassword = true;
  constructor(private fb: FormBuilder) {
    this.team = this.fb.group({
    });
  }
  ngOnInit(): void {
    this.team = this.fb.group({
      Name: ['', [Validators.required, Validators.maxLength(30)]],
      Email: [null, Validators.required],
      Password: ['', [Validators.required, Validators.maxLength(30)]]
    });
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  OnCreateAction(){
    this.openModal();
  }
  onFormSubmite(){}
  OnEditAction(id:any){}
  deleteProducts(id:any){}
  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
