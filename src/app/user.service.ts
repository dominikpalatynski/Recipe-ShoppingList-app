import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CounterService } from './counter.service';

@Injectable()
export class UserService implements OnInit {
  constructor(private counter: CounterService) {}
  activatedButt = new Subject<boolean>();
  activeUsers = ['max', 'bro'];
  inactiveUsers = ['dominik', 'ola'];
  activeToInactive: number;
  inactiveToActive: number;
  ngOnInit() {
    this.activeToInactive = this.counter.activeToInactive;
    this.inactiveToActive = this.counter.inactiveToActive;
  }

  setToInactive(id: number) {
    this.inactiveUsers.push(this.activeUsers[id]);
    this.activeUsers.splice(id, 1);
    this.counter.onInactiveToActive();
  }

  setToActive(id: number) {
    this.activeUsers.push(this.inactiveUsers[id]);
    this.inactiveUsers.splice(id, 1);
    this.counter.onActiveToInactive();
  }
  printArr() {
    console.log(`active: ${this.activeUsers}`);
    console.log(`inactive ${this.inactiveUsers}`);
  }
}
