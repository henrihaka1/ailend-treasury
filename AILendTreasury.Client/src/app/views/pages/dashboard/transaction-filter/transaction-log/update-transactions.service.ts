import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../../../../../core/_models/TransactionDTO';

const TRANSACTION_URL = "http://localhost:5000/api/transaction";

@Injectable({
  providedIn: 'root'
})
export class UpdateTransactionsService {

  constructor(private http: HttpClient) { }

  getSalesTransactionsByFilter(firstCurrecy: string, secondCurrency: string, date: Date): Observable<any>{
    const params = new HttpParams().append('targetDate', date.toDateString())
      
    const URL = TRANSACTION_URL + '/sales/get/' + firstCurrecy + '/' + secondCurrency;
    return this.http.get<any>(URL, {params: params});
  }

  getCurrencies()
  {
    return this.http.get<any>("http://localhost:5000/api/currencies/get");
  }

  getAllTransactions(date: Date):Observable<Transaction[]>{
    const params = new HttpParams().append('targetDate', date.toDateString())
      
    const URL = TRANSACTION_URL + '/sales/get';
    return this.http.get<Transaction[]>(URL, {params: params});
  }

  getAllFxTransactions(date: Date):Observable<Transaction[]>{
    const params = new HttpParams().append('targetDate', date.toDateString())
      
    const URL = TRANSACTION_URL + '/fx/get';
    return this.http.get<Transaction[]>(URL, {params: params});
  }
}
