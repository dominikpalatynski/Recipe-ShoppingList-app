import {
  Component,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { BoundElementProperty } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  // serverElements = [
  //   { type: 'server', name: 'TestServer', content: 'just a test' },
  // ];
  // onAddServer(serverData: { serverName: string; serverContent: string }) {
  //   this.serverElements.push({
  //     type: 'server',
  //     name: serverData.serverName,
  //     content: serverData.serverContent,
  //   });
  // }
  // onAddBlueprint(blueprintData: { serverName: string; serverContent: string }) {
  //   this.serverElements.push({
  //     type: 'blueprint',
  //     name: blueprintData.serverName,
  //     content: blueprintData.serverContent,
  //   });
  // }
  // onDeleteElements() {
  //   // this.serverElements.splice(0, this.serverElements.length);
  //   this.serverElements.pop();
  // }
  // onDeletedPerm(dPerm: boolean) {
  //   this.serverElements.length === 0 ? (dPerm = true) : (dPerm = false);
  // }
  // onChangeFirst() {
  //   if (this.serverElements.length >= 0)
  //     this.serverElements[0].name = 'Changed!';
  // }
  // firedNumTable = [];
  // oddTab = [];
  // evenTab = [];
  // labelElement: number;
  // onIntervalFired(firedNumber: number) {
  //   this.firedNumTable.push(firedNumber);
  //   console.log(firedNumber);
  //   console.log(this.firedNumTable);
  //   this.labelElement = this.firedNumTable.pop();
  //   this.labelElement % 2 === 0
  //     ? this.oddTab.push(this.labelElement)
  //     : this.evenTab.push(this.labelElement);
  // }
  // onDelete() {}

  defaultColor: string = 'white';
  loadFeature: string = '';
  accounts: { name: string; status: string }[];
  activeToInactive: number;
  inactiveToActive: number;
  actBut: boolean = false;
  private activatedSub: Subscription;
  onNavigate(feature: string) {
    this.loadFeature = feature;
    console.log(this.loadFeature);
  }

  constructor(
    public router: Router,
    public route: ActivatedRoute,
 
  ) {}

  onServiceTest() {

  }
  ngOnInit() {

  
  }
  ngOnDestroy() {
    this.activatedSub.unsubscribe();
  }
  ngOnChange() {
    console.log(this.loadFeature);
   
  }
  onDebug() {
    
  }
  onLoadServers() {
    this.router.navigate(['servers']);
  }
  onLoadUsers() {
    this.router.navigate(['users']);
  }

  defaultQa: string = 'pet';
  answer: string = '';
  genders: string[] = ['man', 'woman'];
  defaultG: string = 'man';
  users = {
    username: '',
    email: '',
    secret: '',
    answer: '',
    gender: '',
  };
  submitted: boolean = false;
  onSubmit() {}
  onSuggest() {
    // this.signupForm.setValue({
    //   userData: {
    //     username: this.defaultG,
    //     email: '',
    //     secret: this.defaultQa,
    //     questionAnswer: '',
    //     g: 'male',
    //   },
    // });
  }
}
