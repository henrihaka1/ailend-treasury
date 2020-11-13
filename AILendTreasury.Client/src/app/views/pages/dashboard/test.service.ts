import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import date from 'src/assets/plugins/formvalidation/src/js/validators/date';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  today = new Date();

  constructor(private http:HttpClient) { 
  }

  test():Observable<any>{ 
    return this.http.get<any>("http://localhost:5000/api/currencies/get");
  }

  submitNewBalance(){
    console.log("ok");
    const newBalance = {
      ALL: 10000000,
      EUR: 2000000,
      USD: 3000000,
      GDP: 2000000,
      CHF: 2000000,
      AUD: 1500000,
      SGD: 1000000,
      CAD: 2000000,
    };
    const balanceDTO = {
      "SubmitedDate": new Date(),
      "Balance": JSON.stringify(newBalance),
    };
    var headerz = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>("http://localhost:5000/api/balance/update/current", balanceDTO, {headers:headerz});
  }
}
