import { Injectable } from '@angular/core';
import { Credentials } from './credentials.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject,from,Observable, of, switchMap, tap } from 'rxjs';
import { Preferences } from '@capacitor/preferences'


const ACCESS_TOKEN_KEY = 'access-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);
  currentAccessToken : string | null = null;
  url = 'http://localhost:3333/api'

  constructor(private http: HttpClient) { 
    this.loadToken()
  }

  async loadToken(){
    const getResult =  await Preferences.get({ key:ACCESS_TOKEN_KEY})
    if(getResult && getResult.value){
      this.currentAccessToken = getResult.value
      this.isAuthenticated.next(true)
    }
    else{
      this.isAuthenticated.next(false)
    }
  }

  signUp(credentials:Credentials):Observable<any>{
    return this.http.post(`${this.url}/users`,credentials) 
  }

  logout(){
    this.currentAccessToken = null
    from(Preferences.remove({ key:ACCESS_TOKEN_KEY})).pipe(
      tap(_ =>{
        this.isAuthenticated.next(false)
      })
    ).subscribe()
  }


  login(credentials:Credentials):Observable<any>{
    
    return this.http.post(`${this.url}/login`,credentials).pipe(
      switchMap((response:any)=>{
        this.currentAccessToken = response.accessToken;
        return from(Preferences.set({ key:ACCESS_TOKEN_KEY, value:response.accessToken}))
      }),
      tap(_ =>{
        this.isAuthenticated.next(true)
      })
    )
  }
}
