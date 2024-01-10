import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { User } from 'src/app/model/User';
import { Member } from 'src/app/model/member';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.css']
})
export class MemberProfileComponent implements OnInit {
  @ViewChild('profileForm') profileForm: NgForm | undefined 
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.profileForm?.dirty) {
        $event.returnValue = true
    }
}
  member: Member | undefined
  user: User | undefined | null
  
  constructor(private toastr: ToastrService, 
    private accountService: AccountService, 
    private memberService: MembersService) 
{
      this.accountService.currentUser$.pipe(take(1)).subscribe({
          next: user => this.user = user
      })
  }

  ngOnInit(): void {
      this.loadMember()
  }
  updateProfile() {
    this.memberService.updateProfile(this.profileForm?.value).subscribe({
        next: _ => {
            this.toastr.success('Profile updated !!')
            this.profileForm?.reset(this.member)
        }
    })
}

  loadMember() {
      if (!this.user) return
      this.memberService.getMember(this.user.username).subscribe({
          next: user => this.member = user
      })
  }
  
}