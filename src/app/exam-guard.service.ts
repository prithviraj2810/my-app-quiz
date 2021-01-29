import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import { tap, map, take } from 'rxjs/operators';

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ExamGuardService implements CanActivate {
  constructor(private router: Router, private authService: FirebaseService) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('exam_pin') != null) {
      return true;
    }
  this.router.navigate(['/profile']);
  return false;
}
  
}
