import { Component, OnInit } from '@angular/core';

import {
  ActivatedRoute,
  RouterModule,
  Route,
  Router,
  Params,
} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: { id: number; name: string };
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.user = {
        id: this.route.snapshot.params['id'],
        name: this.route.snapshot.params['name'],
      };
    });
  }
  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
