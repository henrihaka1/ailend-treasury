import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { TransactionLogComponent } from './transaction-log/transaction-log.component';

@Component({
  selector: 'ai-transaction-filter',
  templateUrl: './transaction-filter.component.html',
  styleUrls: ['./transaction-filter.component.scss']
})
export class TransactionFilterComponent implements OnInit {

  firstCurrency:string = '';
  secondCurrency:string = '';
@ViewChild(TransactionLogComponent) transactionLog :TransactionLogComponent;
  

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

}
