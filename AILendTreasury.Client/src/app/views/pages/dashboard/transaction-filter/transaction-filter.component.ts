import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ai-transaction-filter',
  templateUrl: './transaction-filter.component.html',
  styleUrls: ['./transaction-filter.component.scss']
})
export class TransactionFilterComponent implements OnInit {

  firstCurrency:string;
  secondCurrency:string;

  constructor() { }

  ngOnInit(): void {
  }

}
