import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment } from "@angular/router";
import { filter, map, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanLoad {

    constructor(private authService:AuthService,private router: Router){}

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean>  {
        
        return this.authService.isAuthenticated.pipe(
            filter( isAuthenticated => isAuthenticated != null),
            take(1),
            map( isAuthenticated => {
                if(isAuthenticated){
                    return true
                }
                else{
                    return false
                }
            })
        )
    }
}