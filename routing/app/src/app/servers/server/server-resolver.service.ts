import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { ServersService } from '../servers.service';

interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable()
export class ServerResolver implements Resolve<Server> {
  constructor(private serversService: ServersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> |
  Promise<Server> | Server {
    return this.serversService.getServer(+route.params.id);
  }
}


// we use resolvers to run code BEFORE a route is delivered.. it does some pre-loading before displaying route
// we include resolvers inside the path we want to use eg......
// { path:':id', component: ServerComponent, resolve: {server: ServerResolver} },
// the resolver IS NOT a guard, it always gives us the component in the end
// however its a service just like canActivate and canDeactivate.

// ngOnInit() {
//   this.route.data
//   .subscribe(
//     (data: Data) => {
//       this.server = data.server; // data.server has to match the resolve{server: ServerResolver} in app-routing
//     }
//   );
// }

