import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css'],
})
export class InactiveUsersComponent implements OnInit {
  constructor(private user: UserService) {}
  inactive: string[];

  ngOnInit() {
    this.inactive = this.user.inactiveUsers;
  }
  setToActive(id: number) {
    this.user.setToActive(id);
  }
}
