import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({})
  @Output()isCancel = new EventEmitter()

  constructor(private formBuilder: FormBuilder, ) { }

  ngOnInit(): void {
    this.initForm()
  }
  register() {
    // this.accountService.register(this.model).subscribe({ ... })
    console.log(this.registerForm?.value)
  }
  cancel() {
    this.isCancel.emit(true);
  }
  initForm() {
    this.registerForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: [null, [Validators.required, this.matchValue('password')]],
    })
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: _ => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValue(matchTo: string): ValidatorFn {
    return (ctrl: AbstractControl) =>
      ctrl.value === ctrl.parent?.get(matchTo)?.value
        ? null
        : { notMatching: true }
  }
}
