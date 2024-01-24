import { Component, Input } from '@angular/core';
import { faUser ,faHeart,faEnvelope} from '@fortawesome/free-regular-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from 'src/app/_services/members.service';
import { Member } from 'src/app/model/member';


@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent {
  faUser = faUser
  faHeart = faHeart
  faEnvelope = faEnvelope
  @Input() member: Member | undefined
  toastr: any;
  constructor(private memberService: MembersService, toastr: ToastrService) { }

  addLike(member: Member) {
    this.memberService.addLike(member.userName).subscribe({
      next: _ => this.toastr.success(`You have liked ${member.userName}`)
    })
  }
}