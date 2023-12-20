import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../model/User';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  model: { username: string | undefined, password: string | undefined } = {
      username: undefined,
      password: undefined
  }
  currentUser$: Observable<User | null> = of(null) // isLogin = false
    router: any;

    
    constructor(private toastr: ToastrService, public accountService: AccountService) { }
    ngOnInit(): void {
        this.currentUser$ = this.accountService.currentUser$
    }
    getCurrentUser() {
        this.accountService.currentUser$.subscribe({
            next: user => {}, // user?true:false
            error: err => console.log(err)
        })
    }
    login(): void {
        this.accountService.login(this.model).subscribe({
            next: _ => this.router.navigateByUrl('/members'),
            // error: err => this.toastr.error(err.error)
        })
        }
    
    logout() {
        this.accountService.logout()
        this.router.navigateByUrl('/')

    }
}
