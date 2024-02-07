import { CommonModule } from "@angular/common"
import { Component, OnInit, ViewChild } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { GalleryModule, GalleryItem, ImageItem } from "ng-gallery"
import { TabsModule, TabsetComponent, TabDirective } from "ngx-bootstrap/tabs"
import { TimeagoModule } from "ngx-timeago"
import { MembersService } from "src/app/_services/members.service"
import { MessageService } from "src/app/_services/message.service"
import { Message } from "src/app/model/Message"
import { Member } from "src/app/model/member"
import { MemberMessagesComponent } from "../member-messages/member-messages.component"

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  standalone: true,
  imports: [CommonModule, TabsModule, GalleryModule, TimeagoModule, MemberMessagesComponent]
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs', { static: true }) memberTabs?: TabsetComponent
  member: Member = {} as Member
  photos: GalleryItem[] = []
  activeTab?: TabDirective  
  messages: Message[] = []


  constructor(private messageService: MessageService, private memberService: MembersService, private route: ActivatedRoute) { }

  onTabActivated(tab: TabDirective) {
    this.activeTab = tab
    if (this.activeTab.heading === 'Messages') {
      this.loadMessages()
    }
  }

  ngOnInit(): void { //
    // this.loadMember()//<--ไม่ใช้แล้ว เพราะ ได้ member จาก resolver
    this.route.data.subscribe({
        next: data => {
            this.member = data['member'] //เพราะเราตั้งชื่อ member ใน app-routing.module.ts
            this.getImages()
        }
    })
    this.route.queryParams.subscribe({
        next: params => params['tab'] && this.selectTab(params['tab'])
    })
}

  getImages() {
    if (!this.member) return
    for (const photo of this.member.photos) {
      this.photos.push(new ImageItem({ src: photo.url, thumb: photo.url }))
    }
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username')
    if (!username) return
    this.memberService.getMember(username).subscribe({
      next: user => {
        this.member = user
        this.getImages()
      }
    })
  }

  loadMessages() {
    if (!this.member) return
    this.messageService.getMessagesThread(this.member.userName).subscribe({
      next: response => this.messages = response
    })
  }

  selectTab(tabHeading: string) {
    if (!this.memberTabs) return
    const tab = this.memberTabs.tabs.find(tab => tab.heading === tabHeading)
    if (!tab) return
    tab.active = true
  }

}
