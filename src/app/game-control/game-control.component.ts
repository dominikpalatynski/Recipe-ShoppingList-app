import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css'],
})
export class GameControlComponent {
  @Output() intervalFired = new EventEmitter<number>();
  @Output() resetAll = new EventEmitter<any>();
  @Input() oddTab: number[];
  @Input() evenTab: number[];
  interval;
  lastNumber = 0;

  onStartGame() {
    this.interval = setInterval(() => {
      this.intervalFired.emit(this.lastNumber + 1);
      this.lastNumber++;
    }, 1000);
  }
  onStopGame() {
    clearInterval(this.interval);
  }
  onDelete() {
    this.resetAll.emit((this.lastNumber = 0));
    this.evenTab.splice(0, this.evenTab.length);
    this.oddTab.splice(0, this.oddTab.length);
  }
}
