import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css'],
})
export class ActiveUsersComponent implements OnInit {
  constructor(private user: UserService) {}
  active: string[];
  ngOnInit() {
    this.active = this.user.activeUsers;
  }
  onSetToInactive(id: number) {
    this.user.setToInactive(id);
  }
}
