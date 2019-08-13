import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Router, Data } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data // data: any static/resolved data returned & stored on this.route.data which is an Observable
    .subscribe(
      (data: Data) => {
        this.server = data.noresServer; // drilling into the specific data of the resolver service
      }
    );
    // const id =  +this.route.snapshot.params.id;
    // this.server = this.serversService.getServer(id);
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.server = this.serversService.getServer(+params.id);
    //     }
    //   );
  }

  onEdit() {
    // this.router.navigate(['/servers', this.server.id, 'edit'], {queryParamsHandling: 'preserve'});
    // above = we are already on this path so alternatively -
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
    // localhost:4200/servers/3/edit?allowEdit=1
  }

}
