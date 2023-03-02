import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}
  allowServer = true;
  serverStatus: string;
  serverChanger = false;
  serverName = '';
  showLabel = false;
  server: { id: number; name: string; status: string };
  changer = () => {
    this.serverChanger
      ? (this.serverStatus = 'server was created ' + this.serverName)
      : (this.serverStatus = 'server was not created');
  };

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    this.route.params.subscribe((params: Params) => {});
  }

  onCreateServer() {
    this.serverChanger = !this.serverChanger;
    this.changer();
    this.showLabel = !this.showLabel;
    console.log(this.showLabel);
  }
  onUpdateServer(event: Event) {
    this.showLabel
      ? (this.serverName = (<HTMLInputElement>event.target).value)
      : (this.serverName = ' ');
    console.log(this.serverName);
  }
  onAddQuery(id: number) {
    this.router.navigate(['/servers', id, 'edit'], {
      queryParams: { allowEdit: id },
      fragment: 'loading',
    });
  }
}
