import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/core/_models/TransactionDTO';

var headerz = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class ManualTransactionService {

  constructor(private http: HttpClient) { }

  sendFxTransaction(transaction: Transaction, exchangeRate):Observable<any>{
    var payload = {
      SoldCurrency : transaction.soldCurrency,
      BoughtCurrency: transaction.boughtCurrency,
      SoldAmount: transaction.soldAmount,
      ExchangeRate: exchangeRate,
      CreatedDate: new Date(),
      Customer:transaction.customer,
      ApprovedBy:{ 
        Id:2,
        FirstName: "RFS",
        LastName:"",
        Email:"asdada",
        KeycloakId:"adada",
        Department:"sales",
        AutomaticTransactions:[],
        ManualTransactions:[],
        FXTransactions:[]
      }
    };
    transaction.boughtAmount = transaction.soldAmount * exchangeRate;
    return this.http.post<any>("http://localhost:5000/api/transaction/fx/new", payload, {headers:headerz});
  }

  sendManualTransaction(transaction: Transaction, exchangeRate):Observable<any>
  {
    var payload = {
      SoldCurrency : transaction.soldCurrency,
      BoughtCurrency: transaction.boughtCurrency,
      SoldAmount: transaction.soldAmount,
      ExchangeRate: exchangeRate,
      CreatedDate: new Date(),
      Customer:transaction.customer,
      ApprovedBy:{ 
        Id:2,
        FirstName: "Genti",
        LastName:"Zotaj",
        Email:"asdada",
        KeycloakId:"adada",
        Department:"sales",
        AutomaticTransactions:[],
        ManualTransactions:[],
        FXTransactions:[]
      }
    };
    transaction.boughtAmount = transaction.soldAmount * exchangeRate;
    return this.http.post<any>("http://localhost:5000/api/transaction/new", payload, {headers:headerz});
    //return newTransaction;
  }
}
