import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Transaction } from 'src/app/core/_models/TransactionDTO';

@Injectable({
  providedIn: 'root'
})
export class TransferTransactionsService {

  private subject = new Subject<any>();

  insertTransaction(transaction: Transaction)
  {
    this.subject.next(transaction);
  }

  getTransaction(): Observable<Transaction>{
    return this.subject.asObservable();
  }
}
