import { FirebaseService } from './firebase.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import { tap, map, take } from 'rxjs/operators';

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Guard implements CanActivate {
    constructor(private router: Router, private authService: FirebaseService) { }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        return this.authService.user.pipe(
             take(1),
             map(user => !!user), 
             tap(loggedIn => {
               if (!loggedIn) {
                 console.log('access denied')
                 this.router.navigate(['/login']);
               }
           })
      )
    }
  }