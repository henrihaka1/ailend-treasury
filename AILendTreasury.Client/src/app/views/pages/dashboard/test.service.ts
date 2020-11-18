import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyBalance } from 'src/app/core/_models/CurrencyBalance';

var headerz = new HttpHeaders({'Content-Type': 'application/json'});

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

  submitNewBalance() :Observable<any>{
    const newBalance:CurrencyBalance[] = [
      {label:"ALL", amount:10000000},
      {label:"EUR", amount: 2000000},
      {label:"USD", amount: 3000000},
      {label:"GDP", amount: 2000000},
      {label:"CHF", amount: 2000000},
      {label:"AUD", amount: 1500000},
      {label:"SGD", amount: 1000000},
      {label:"CAD", amount: 2000000},
    ];
    const balanceDTO = {
      "SubmitedDate": new Date(),
      "Balance": JSON.stringify(newBalance),
    };

    return this.http.post<any>("http://localhost:5000/api/balance/update/current", balanceDTO, {headers:headerz});
  }

  submitNewTransaction(newTransaction):Observable<any>
  {
    // const newTransaction = {
    //   SoldCurrency : "ALL",
    //   BoughtCurrency: "EUR",
    //   SoldAmount:10000,
    //   ExchangeRate: 0.91,
    //   CreatedDate: new Date(),
    //   Customer:"Henri Haka",
    //   ApprovedBy:{ 
    //     Id:2,
    //     FirstName: "Genti",
    //     LastName:"Zotaj",
    //     Email:"asdada",
    //     KeycloakId:"adada",
    //     Department:"sales",
    //     AutomaticTransactions:[],
    //     ManualTransactions:[],
    //     FXTransactions:[]
    //   }
    // };
    return this.http.post<any>("http://localhost:5000/api/transaction/new", newTransaction, {headers:headerz});
  }
}
