export class CounterService {
  activeToInactive: number = 0;
  inactiveToActive: number = 0;

  onActiveToInactive() {
    this.activeToInactive++;
  }
  onInactiveToActive() {
    this.inactiveToActive++;
  }
}
