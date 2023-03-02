import { Component } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  constructor(private user: UserService) {}
  users = [
    {
      id: 1,
      name: 'domin',
    },
    {
      id: 2,
      name: 'max',
    },
    {
      id: 3,
      name: 'ola',
    },
  ];
  onActivate() {
    this.user.activatedButt.next(true);
  }
}
