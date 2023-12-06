import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 // @Input() usersFromHomeComponent: any
  @Output() isCancel = new EventEmitter()

  model: any = {}
  router: any;
  constructor(private toastr: ToastrService,private accountService: AccountService) { }
  
  register() {
    this.accountService.register(this.model).subscribe({
       error: err => this.toastr.error(err.error),
      next: response => {
        this.router.navigateByUrl('/members')
      }
    })
  }
  cancel() {
    this.isCancel.emit(true)
  }
}