import { Injectable } from '@angular/core';
@Injectable()
export class LoggingServices {
  logStatusChange(status: string) {
    console.log('test' + status);
  }

  accounts = [
    {
      name: 'dominik',
      status: 'student',
    },
    {
      name: 'Jeremiasz',
      status: 'student',
    },
    {
      name: 'Mikolaj',
      status: 'student',
    },
  ];
  loadS: string;

  onAdd(nameU: string, statusU: string) {
    this.accounts.push({ name: nameU, status: statusU });
  }
  onUpdate(id: number, statusU2: string) {
    this.accounts[id].status = statusU2;
  }
  onPrintArray(acc) {
    console.log(acc);
  }
  onNavigate(s: string) {
    this.loadS = s;
  }
}
