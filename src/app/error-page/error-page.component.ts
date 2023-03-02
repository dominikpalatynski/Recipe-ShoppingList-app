import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
})
export class ErrorPageComponent implements OnInit {
  constructor(private router: ActivatedRoute) {}
  errorMsg: string;

  ngOnInit() {
    // this.errorMsg = this.router.snapshot.data['message'];
    this.router.data.subscribe((data: Route) => {
      this.errorMsg = data['message'];
    });
  }
}
