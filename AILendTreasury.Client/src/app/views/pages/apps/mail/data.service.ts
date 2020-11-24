import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getBalances():Observable<any> {
    return this.http.get<any>("http://localhost:5000/api/balance/get/balances");
  }

  getTodayBalances():Observable<any>{
    return this.http.get<any>("http://localhost:5000/api/balance/get/today");
  }
}
