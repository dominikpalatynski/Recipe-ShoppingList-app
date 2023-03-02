import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {
  genders = ['male', 'female'];
  forbiddenNames = ['ola', 'dominik'];

  signupForm: FormGroup;
  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl('elo', [
          Validators.required,
          this.forbiddenNam.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails
        ),
      }),

      genders: new FormControl('male'),
      hobbies: new FormArray([]),
    });
    this.signupForm.statusChanges.subscribe((status) => {
      console.log(status);
    });
  }
  onSubmit() {
    console.log(this.signupForm.get('userData.email'));
  }
  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }
  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }
  forbiddenNam(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenNames.indexOf(control.value)) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  //async validatos
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailisForbidden: true });
        }
      }, 1500);
    });
    return promise;
  }
}
