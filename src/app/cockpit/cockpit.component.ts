import {
  Component,
  EventEmitter,
  Output,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css'],
})
export class CockpitComponent {
  @ViewChild('serverContentInput', { static: true })
  serverContentInput: ElementRef;
  @Output() serverCreated = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();
  @Output() blueprintCreated = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();
  @Output() deleted = new EventEmitter<any[]>();
  @Output() deletedPerm = new EventEmitter<boolean>();

  newServerName = '';
  deletePermision = false;

  newServerContent = '';

  onAddServer(nameInput) {
    console.log(nameInput.value);
    this.serverCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value,
    });
    console.log(this.serverContentInput.nativeElement.value);
  }
  onAddBlueprint() {
    this.blueprintCreated.emit({
      serverName: this.newServerName,
      serverContent: this.serverContentInput.nativeElement.value,
    });
  }
  onDeleteElements() {
    this.deleted.emit();
  }
  onDeletedPerm() {
    this.deletedPerm.emit(this.deletePermision);
  }
}

// @ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;
