import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { UpdateTransactionsService } from './update-transactions.service';
import { Transaction } from '../../../../../core/_models/TransactionDTO';
import { TransferTransactionsService } from '../../transfer-transactions.service';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers';
import { currentUserRoleIds } from '../../../../../../../src/app/core/auth';

export class Balance{
  transactions:Transaction[]=[];
  sumSold:number=0;
  avgRate:number=0;
  sumBought:number=0;

  set(newBalance: Balance)
  {
    this.transactions = newBalance.transactions;
    this.sumSold = newBalance.sumSold;
    this.sumBought = newBalance.sumBought;
    this.avgRate = newBalance.avgRate;
  }
}

class OpenBalance{
  key:string;
  open:number;
  pl:number;
}

@Component({
  selector: 'ai-transaction-log',
  templateUrl: './transaction-log.component.html',
  styleUrls: ['./transaction-log.component.scss'],
  animations: [
		trigger("fadeInOut", [
			transition(":enter", [
				// :enter is alias to 'void => *'
				style({ opacity: 0 }),
				animate(700, style({ opacity: 1 })),
			]),
			transition(":leave", [
				// :leave is alias to '* => void'
				animate(500, style({ opacity: 0 })),
			]),
		])
	],
})
export class TransactionLogComponent implements OnInit , OnChanges{

  subscription: Subscription;

  currencies:any = [];
  matrix = new Map();
  open = new Map();
  subs:Subscription[] = [];

  soldTransactions:Balance;
  boughtTransactions:Balance;

  @Input() firstFilter: string = '';
  @Input() secondFilter: string = '';
  role:number;

  constructor(
    private LogService: UpdateTransactionsService, 
    private cd: ChangeDetectorRef,
    private transferTransactions:TransferTransactionsService,
    private store: Store<AppState>) 
    { 
      this.subscription = this.transferTransactions.getTransaction().subscribe(transaction =>{
        var key;
        key = transaction.soldCurrency + '_' + transaction.boughtCurrency;
        if(this.matrix.has(key))
        {
          let newBalance = this.matrix.get(key);
          newBalance.transactions.push(transaction);
          this.matrix.get(key).set(this.calculateBalance(newBalance));
        }
        else{
          let newBalance = new Balance();
          newBalance.transactions.push(transaction);
          this.matrix.set(key, this.calculateBalance(newBalance));
        }
      });
    }

  ngOnInit(): void {
    this.subs.push(this.store.pipe(select(currentUserRoleIds)).subscribe(response => {
      console.log(response[1]);
      this.role = response[1];
    }));
    setTimeout(()=>{this.createLogMatrix();}, 1000);

  }

  ngOnChanges(changes:SimpleChanges){
    if(changes.firstFilter || changes.secondFilter)
    {
      if(this.matrix.has(this.firstFilter + '_' + this.secondFilter))
      {
        this.soldTransactions = this.matrix.get(this.firstFilter + '_' + this.secondFilter);
        this.soldTransactions.transactions.reverse();
      }
      else
        this.soldTransactions = new Balance();
      if(this.matrix.has(this.secondFilter + '_' + this.firstFilter))
      {
        this.boughtTransactions = this.matrix.get(this.secondFilter + '_' + this.firstFilter);
        this.boughtTransactions.transactions.reverse();
      }
      else
        this.boughtTransactions = new Balance();
    }
  }

  GetSalesTransactions(){
    if(this.firstFilter == '' || this.secondFilter == '')
      return; 
    this.LogService.getSalesTransactionsByFilter(this.firstFilter, this.secondFilter, new Date()).subscribe(response =>{
      this.cd.detectChanges();
    });
  }

  formatNumber(x) {
    if(x === undefined)
      return
    var parts = x.toString().split(".");
    parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
    return parts.join(",");
  }

  UpdateLogFilters(first: string, second:string){
    if(first!='' && second != '')
    {
      this.firstFilter = first;
      this.secondFilter = second;
      this.GetSalesTransactions();
    }
  }

  // getIdByCurrency(currency:string)
  // {
  //   var x:number;
  //   this.currencies.forEach(element => {
  //     if(element.label==currency)
  //     {
  //       x=element.index;
  //     }
  //   });
  //   return x;
  // }

  createLogMatrix() {
    var sub;
    if(this.role == 2)
    {
      sub = this.LogService.getAllTransactions(new Date()).subscribe(response => {
        var key;
        response.forEach(element => {
          key = `${element.soldCurrency}_${element.boughtCurrency}`;
          if(!this.matrix.has(key)) {
            let newBalance = new Balance();
            newBalance.transactions.push(element);
            this.matrix.set(key, this.calculateBalance(newBalance));
          }
          else {
            let newBalance = this.matrix.get(key);
            newBalance.transactions.push(element);
            this.matrix.get(key).set(this.calculateBalance(newBalance));
          }
        })
  
        // this.matrix.forEach((value, key) => {
        //   //console.log(key, value);
        // });
        
      })
    }
    else if (this.role == 3)
    {
      console.log("hah");
      sub = this.LogService.getAllFxTransactions(new Date()).subscribe(response => {
        var key;
        console.log(response);
        response.forEach(element => {
          key = `${element.soldCurrency}_${element.boughtCurrency}`;
          if(!this.matrix.has(key)) {
            let newBalance = new Balance();
            newBalance.transactions.push(element);
            this.matrix.set(key, this.calculateBalance(newBalance));
          }
          else {
            let newBalance = this.matrix.get(key);
            newBalance.transactions.push(element);
            this.matrix.get(key).set(this.calculateBalance(newBalance));
          }
        })
  
        // this.matrix.forEach((value, key) => {
        //   //console.log(key, value);
        // });
        
      })
    }

    this.subs.push(sub);
  }

  calculateBalance(balance: Balance) : Balance{ 
    balance.sumSold = 0;
    balance.avgRate = 0;
    balance.sumBought = 0;
    if(balance.transactions == [])
      return;
    else{
      balance.transactions.forEach(element=>{
        balance.sumSold += element.soldAmount;
        balance.sumBought += element.boughtAmount;
      });
      if(balance.sumSold==0)
        balance.avgRate = 0;
      else
        balance.avgRate = balance.sumBought / balance.sumSold;

      this.cd.detectChanges();
      return balance;
    }
  }

  // calculateBalances(firstCurr: string, secondCurr:string)
  // {
  //   var flag=0;
  //   if(this.balances !== undefined)
  //   {
  //     this.balances.forEach(item =>{
  //       if(item !==undefined && ((item.firstCurr==firstCurr && item.secondCurr==secondCurr) || (item.firstCurr==secondCurr && item.secondCurr==firstCurr)))
  //       {
  //         item = this.updateBalance(item);
  //         flag =1;
  //       }
  //     });
  //     // this.balances.find()
  //   }
  //   if(flag!=1)
  //   {
  //     var newBalance = new balance();
  //     newBalance.firstCurr  = firstCurr;
  //     newBalance.secondCurr = secondCurr;
  
  //     if(!this.matrix.has(firstCurr + '_' + secondCurr)) {
  //       newBalance.firstAvgRate = 0;
  //       newBalance.firstSumBought = 0;
  //       newBalance.firstSumSold = 0;
  //     }
  //     else {
  //       newBalance.firstSumSold = 0;
  //       newBalance.firstSumBought = 0;
  //       this.matrix.get(firstCurr + '_' + secondCurr).forEach(element=>
  //         {
  //           newBalance.firstSumSold += element.soldAmount;
  //           newBalance.firstSumBought +=element.boughtAmount;
  //         })
  //       newBalance.firstAvgRate = newBalance.firstSumBought/newBalance.firstSumSold;
  //     }
  
  //     if(!this.matrix.has(secondCurr + '_' + firstCurr)) {
  //       newBalance.secondAvgRate = 0;
  //       newBalance.secondSumBought = 0;
  //       newBalance.secondSumSold = 0;
  //     }
  //     else {
  //       newBalance.secondSumSold = 0;
  //       newBalance.secondSumBought = 0;
  //       this.matrix.get(secondCurr + '_' + firstCurr).forEach(element=>
  //         {
  //           newBalance.secondSumSold += element.soldAmount;
  //           newBalance.secondSumBought += element.boughtAmount;
  //         })
  //       newBalance.secondAvgRate = newBalance.secondSumBought/newBalance.secondSumSold;
  //     }
  //     this.balances.push(newBalance);
  //   }
  // }

  // updateBalance(existingBalance: balance)
  // {
  //   //debugger;
  //   existingBalance.firstSumSold = 0;
  //   existingBalance.firstSumBought = 0;
  //   if(this.matrix.has(existingBalance.firstCurr + '_' + existingBalance.secondCurr))
  //   {
  //     this.matrix.get(existingBalance.firstCurr + '_' + existingBalance.secondCurr).forEach(element=>{
  //       existingBalance.firstSumSold += element.soldAmount;
  //       existingBalance.firstSumBought +=element.boughtAmount;
  //     })
  //     existingBalance.firstAvgRate = existingBalance.firstSumBought/existingBalance.firstSumSold;
  //   }
  //   else{
  //     existingBalance.firstAvgRate = 0;
  //     existingBalance.firstSumBought = 0;
  //     existingBalance.firstSumSold = 0;
  //   }

  //   existingBalance.secondSumSold = 0;
  //   existingBalance.secondSumBought = 0;
  //   if(this.matrix.has(existingBalance.secondCurr + '_' + existingBalance.firstCurr))
  //   {
  //     this.matrix.get(existingBalance.secondCurr + '_' + existingBalance.firstCurr).forEach(element=>
  //       {
  //         existingBalance.secondSumSold += element.soldAmount;
  //         existingBalance.secondSumBought += element.boughtAmount;
  //       })
  //     existingBalance.secondAvgRate = existingBalance.secondSumBought/existingBalance.secondSumSold;
  //   }
  //   else{
  //     existingBalance.secondAvgRate = 0;
  //     existingBalance.secondSumBought = 0;
  //     existingBalance.secondSumSold = 0;
  //   }

  //   return existingBalance;
  // }

  // getBalance(firstCurr:string, secondCurr:string)
  // {
  //   let flag=1;
  //   let selectedBalance:balance;
  //   if(this.balances !== undefined){
  //     this.balances.forEach(element =>{
  //       if(element.firstCurr == firstCurr && element.secondCurr == secondCurr)
  //       {
  //         selectedBalance = element;
  //         flag = 0;
  //       }
  //     });
  //   };
  //   if(flag==1)
  //   {
  //     selectedBalance = new balance();
  //     selectedBalance.firstAvgRate = 0;
  //     selectedBalance.secondAvgRate = 0;
  //     selectedBalance.firstCurr = firstCurr;
  //     selectedBalance.secondCurr = secondCurr;
  //     selectedBalance.firstSumSold = 0;
  //     selectedBalance.firstSumBought = 0;
  //     selectedBalance.secondSumSold = 0;
  //     selectedBalance.secondSumBought = 0;
  //   }
  //   return selectedBalance;
  // }

  // getOpen(firstCurr:string, secondCurr:string)
  // {
  //   let temp;
  //   temp = this.getBalance(firstCurr, secondCurr);
  //   //console.log(temp);
  //   return temp.firstSumSold - temp.secondSumSold;
  // }

  // getPL(firstCurr:string, secondCurr:string)
  // {
  //   let temp;
  //   temp = this.getBalance(firstCurr, secondCurr);
  //   var min;
  //   if(temp.firstSumSold > temp.secondSumSold)
  //     min = temp.secondSumSold;
  //   else
  //     min = temp.firstSumSold;
  //   return min*(temp.secondAvgRate - temp.firstAvgRate);
  // }
  

}
