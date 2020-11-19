import { Component, OnInit, OnDestroy, ElementRef, ViewChildren, QueryList, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { Transaction } from 'src/app/core/_models/TransactionDTO';
import { ManualTransactionService } from './manual-transaction.service';
import { ShowNotificationService } from './show-notification.service';
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
    private transactionService: ManualTransactionService) 
    { }

  insertTransaction(transaction:Transaction){
    if(this.Input!='')
    {
      this.transactionService.sendManualTransaction(transaction, parseFloat(this.Input)).subscribe(response => {
        console.log(response);
      });
    }

  }

  ngOnInit(): void {
    this.subscription = this.notificationService.getMessage().subscribe( notification => {
      if(notification)
      {
        console.log(notification);
        this.messages.push(notification);
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

