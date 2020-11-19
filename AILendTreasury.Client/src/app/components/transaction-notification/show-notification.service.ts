import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Transaction } from 'src/app/core/_models/TransactionDTO';

class AiNotification {
  transaction: Transaction;
  manual: boolean;

  constructor(transaction, manual?) { 
    this.transaction = transaction;
    this.manual = manual || false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ShowNotificationService {

  constructor() { }

  private subject = new Subject<any>();

  createMessage(transaction: Transaction)
  {
    let x = false;
    if ((transaction.soldAmount > 50000 && transaction.soldCurrency!="ALL") || (transaction.soldAmount > 500000 && transaction.soldCurrency == "ALL"))
      x=true;
    const notification = new AiNotification(transaction, x);
    this.subject.next(notification);
  }

  getMessage(): Observable<any>{
    return this.subject.asObservable();
  }
}