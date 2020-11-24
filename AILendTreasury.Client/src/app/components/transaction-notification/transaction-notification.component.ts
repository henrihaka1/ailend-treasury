import { Component, OnInit, OnDestroy, ElementRef, ViewChildren, QueryList, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { Transaction } from 'src/app/core/_models/TransactionDTO';
import { ManualTransactionService } from './manual-transaction.service';
import { ShowNotificationService } from './show-notification.service';
import { TransferTransactionsService } from '../../views/pages/dashboard/transfer-transactions.service';

@Component({
  selector: 'ai-transaction-notification',
  templateUrl: './transaction-notification.component.html',
  styleUrls: ['./transaction-notification.component.scss']
})
export class TransactionNotificationComponent implements OnInit {

  public Input:string;
  showError = false;

  messages: any[] = [];
  exhangeRate:number;
  subscription: Subscription;
  timerId = null;

  @ViewChildren('messageToHide') private displayedNotifications: QueryList<ElementRef>;
  constructor(
    private notificationService: ShowNotificationService,
    private transactionService: ManualTransactionService,
    private transferTransaction: TransferTransactionsService) 
    { }

  insertTransaction(transaction){
    if(this.Input!='')
    {
      if(transaction.transaction.customer =='BKT' || transaction.transaction.customer =='OTP' || transaction.transaction.customer =='TRB')
      {
        this.transactionService.sendFxTransaction(transaction.transaction, parseFloat(this.Input)).subscribe(response => {
          let newTransaction = new Transaction();
          newTransaction.soldAmount = transaction.transaction.soldAmount;
          newTransaction.soldCurrency = transaction.transaction.soldCurrency;
          newTransaction.boughtCurrency = transaction.transaction.boughtCurrency;
          newTransaction.customer = transaction.transaction.customer;
          newTransaction.exchangeRate = parseFloat(this.Input);
          newTransaction.boughtAmount = newTransaction.soldAmount * newTransaction.exchangeRate;
          newTransaction.createdDate = new Date();
          this.transferTransaction.insertTransaction(newTransaction);
          this.removeNotification(transaction);
          this.Input = '';
        })
      }
      else{
        this.transactionService.sendManualTransaction(transaction.transaction, parseFloat(this.Input)).subscribe(response => {
          let newTransaction = new Transaction();
          newTransaction.soldAmount = transaction.transaction.soldAmount;
          newTransaction.soldCurrency = transaction.transaction.soldCurrency;
          newTransaction.boughtCurrency = transaction.transaction.boughtCurrency;
          newTransaction.customer = transaction.transaction.customer;
          newTransaction.exchangeRate = parseFloat(this.Input);
          newTransaction.boughtAmount = newTransaction.soldAmount * newTransaction.exchangeRate;
          newTransaction.createdDate = new Date();
          this.transferTransaction.insertTransaction(newTransaction);
          this.removeNotification(transaction);
          this.Input = '';
        });
      }
    }

  }

  ngOnInit(): void {
    this.subscription = this.notificationService.getMessage().subscribe( notification => {
      if(notification)
      {
        this.messages.push(notification);
        if(!notification.manual)
          this.timerId = setTimeout(()=>{this.removeNotification(notification)}, 5000);
      } 
    });
  }

  ngOnDestroy()
  {
    this.messages = [];
    this.subscription.unsubscribe();
  }

  removeNotification(element: any)
  {
    const index = this.messages.indexOf(element);
    if(index>=0)
    {
      this.displayedNotifications.toArray()[index].nativeElement.classList.add('hide-notification');
      setTimeout(()=>{this.messages.splice(index, 1);}, 500);
    }
  }


  formatNumber(x) {
    if(x === undefined)
      return
    var parts = x.toString().split(".");
    parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
    return parts.join(",");
  }



}

