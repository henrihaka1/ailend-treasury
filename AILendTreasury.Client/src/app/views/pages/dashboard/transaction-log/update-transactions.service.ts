import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const TRANSACTION_URL = "http://localhost:5000/api/transaction";

@Injectable({
  providedIn: 'root'
})
export class UpdateTransactionsService {

  constructor(private http: HttpClient) { }

  getSalesTransactionsByFilter(firstCurrecy: string, secondCurrency: string): Observable<any>{
    const URL = TRANSACTION_URL + '/sales/get/' + firstCurrecy + '/' + secondCurrency;
    return this.http.get<any>(URL);
  }
}
