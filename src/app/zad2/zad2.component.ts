import { Component } from '@angular/core';

@Component({
  selector: 'app-zad2',
  templateUrl: './zad2.component.html',
  styleUrls: ['./zad2.component.css'],
})
export class Zad2Component {
  name: string = ' ';
  showP: boolean = false;
  serverStatus: string = '';
  servers = ['server'];
  table = [];
  showDet: boolean = true;

  updateName(event: Event) {
    this.name = (<HTMLInputElement>event.target).value;
  }
  toggleShow() {
    this.showP = !this.showP;
  }
  onCreate() {
    this.servers.push(this.name);
  }
  onDelete() {
    this.servers.pop();
  }
  resetString() {
    this.name = '';
  }
  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'offline' : 'online';
  }
  getColor = () => (this.serverStatus === 'online' ? 'green' : 'red');

  createDetail = () => this.table.push(this.name);
  showD = () => this.table.splice(0, this.table.length);
  getBackGround(index: number): string {
    return index < 5 ? 'green' : 'red';
  }
}
