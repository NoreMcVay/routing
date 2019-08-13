import { CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService,
                private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.isAuthenticated()
        .then(
          (authenticated: boolean) => {
            if (authenticated) {
                return true;
            } else {
              this.router.navigate(['/']);
            }
        });
    }
    canActivateChild(route: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.canActivate(route, state);

    }
}

// canActivate and canActivateChild either returns an observable, a promise or just a boolean
// canActivate used to control access to a route

// guards protect the routes - it guards certain actions like navigating to or away from a route
// angular will execute this code BEFORE a route is loaded so it will give us this data; we need to handle it.
// AuthGuard can now protect both a single route, or all child routes with canActivate and canActivateChild
