import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http:HttpClient) { 
  }

  test():Observable<any> {
    const header = new HttpHeaders();
    return this.http.get<any>("http://localhost:5000/api/position/test");
  }
}
