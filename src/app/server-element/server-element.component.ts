import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  OnChanges,
  AfterContentInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
})
export class ServerElementComponent {
  @Input('srvElement') element: { type: string; name: string; content: string };
  @Input() name: string;

  constructor() {
    console.log('constructor called');
  }
  ngOnChanges() {
    console.log('onChanges calles');
  }
  ngOnInit() {
    console.log('ngOnInit called!');
  }

  ngOnDestroy() {
    console.log('Destroyed');
  }
}
