import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-assignment',
  templateUrl: './reactive-assignment.component.html',
  styleUrls: ['./reactive-assignment.component.css'],
})
export class ReactiveAssignmentComponent implements OnInit {
  signupForm: FormGroup;
  pStatus = ['Stable', 'Critical', 'Finished'];
  ngOnInit() {
    this.signupForm = new FormGroup({
      projectName: new FormControl([Validators.required, this.forbiddenName]),
      mail: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl('Stable'),
    });
  }
  onSubmit() {
    console.log(this.signupForm.valid);
  }
  forbiddenName(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') {
      return { invalidName: true };
    }
    return null;
  }
}
