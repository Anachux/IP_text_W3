import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MembersService } from 'src/app/_services/members.service';
import { Member } from 'src/app/model/member';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members$: Observable<Member[]> | undefined
  constructor(private memberService: MembersService) { }
  ngOnInit(): void {
    this.members$ = this.memberService.getMembers()
  }
  // ngOnInit(): void {
  //   this.loadMember()
  // }

  // loadMember() {
  //   this.memberService.getMembers().subscribe({
  //     next: users => this.members = users
  //   })
  // }
}