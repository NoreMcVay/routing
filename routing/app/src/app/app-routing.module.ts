import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { UserComponent } from './users/user/user.component';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactive-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server-resolver.service';

const appRoutes: Routes = [
    { path: '' , component: HomeComponent },
    { path: 'users', component: UsersComponent, children: [
    { path: ':id/:name', component: UserComponent }
    ] },
    { path: 'servers',
    //   canActivate: [AuthGuard], - means we can only access servers and servers children if AuthGuard = true!
    // AuthGuard can now protect both a single route, or all child routes with canActivate and canActivateChild
      canActivateChild: [AuthGuard],
      component: ServersComponent,
      children: [
      { path: ':id', component: ServerComponent, resolve: {noresServer: ServerResolver} },
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
    ] },
    // { path: 'not-found', component: PageNotFoundComponent },
    { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
    { path: '**', redirectTo: '/not-found' } // always keep this path at the bottom! routes get parsed top 2 bottom
];

@NgModule({
    imports: [
      // RouterModule.forRoot(appRoutes, {useHash: true})
      RouterModule.forRoot(appRoutes) // here we configure the router module....
    ],
    exports: [RouterModule] // .....now we export it
})

export class AppRoutingModule {

}


