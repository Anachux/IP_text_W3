import { Component, OnInit } from '@angular/core';
import { MessageService } from '../_services/message.service';
import { Pagination } from '../model/Pagination';
import { Message } from '../model/Message';
import { faEnvelope, faEnvelopeOpen,faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages?: Message[]
  pagination?: Pagination
  label = 'Unread'  // 'Inbox'
  pageNumber = 1
  pageSize = 5
  faEnvelopeOpen = faEnvelopeOpen
  faEnvelope = faEnvelope
  faPaperPlane = faPaperPlane
  faTrashCan = faTrashCan
  constructor(private messageService: MessageService) { }
  ngOnInit(): void {
    this.loadMessage()
  }
  loading = false
  loadMessage() {
    this.loading = true
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.label).subscribe({
      next: response => {
        this.messages = response.result
        this.pagination = response.pagination
      }
    })
    this.loading = false
  }
  pageChanged(event: any) {
    if (this.pageNumber === event.page) return
    this.pageNumber = event.page
    this.loadMessage()
  }
  deleteMessage(id: number) {
    this.messageService.deleteMessage(id).subscribe({
      next: _ => this.messages?.splice(this.messages.findIndex(ms => ms.id === id), 1)
    })
  }
}