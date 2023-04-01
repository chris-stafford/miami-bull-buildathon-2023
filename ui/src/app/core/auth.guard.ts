import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtService } from '../shared/jwt/jwt.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router, 
        private jwtService: JwtService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let token =  this.jwtService.getToken();
        if (token) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}