import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { TransactionLogComponent } from './transaction-log/transaction-log.component';
import { Balance } from './transaction-log/transaction-log.component';

@Component({
  selector: 'ai-transaction-filter',
  templateUrl: './transaction-filter.component.html',
  styleUrls: ['./transaction-filter.component.scss']
})
export class TransactionFilterComponent implements OnInit {

  firstCurrency:string = '';
  secondCurrency:string = '';
  @ViewChild(TransactionLogComponent) transactionLog :TransactionLogComponent;
  
  showCustom = false;

  constructor() { }

  ngOnInit(): void {

  }

  updateFilters(first: string, second:string){
    if(first!='' && second!='')
    {
      this.firstCurrency = first;
      this.secondCurrency = second;
    }
  }

  computeOpen(firstCurr : string, secondCurr: string){
    var sold: Balance;
    var bought: Balance;
    if(this.transactionLog.matrix.has(firstCurr+'_'+secondCurr))
      sold = this.transactionLog.matrix.get(firstCurr+'_'+secondCurr)
    else {
      sold = new Balance();
    }
    if(this.transactionLog.matrix.has(secondCurr + '_' + firstCurr))
      bought = this.transactionLog.matrix.get(secondCurr + "_" + firstCurr)
    else{
      bought = new Balance();
    }
    return (sold.sumSold -  bought.sumSold).toFixed(2);
  }

  computePL(firstCurr: string, secondCurr:string){
    var sold: Balance;
    var bought: Balance;
    if(this.transactionLog.matrix.has(firstCurr+'_'+secondCurr))
      sold = this.transactionLog.matrix.get(firstCurr+'_'+secondCurr)
    else {
      sold = new Balance();
    }
    if(this.transactionLog.matrix.has(secondCurr + '_' + firstCurr))
      bought = this.transactionLog.matrix.get(secondCurr + "_" + firstCurr)
    else{
      bought = new Balance();
    }
    var min;
    if(sold.sumSold > bought.sumSold)
      min = bought.sumSold;
    else
      min = sold.sumSold;
    
    return (min*(bought.avgRate-sold.avgRate)).toFixed(2);
  }

}
