import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UpdateTransactionsService } from './update-transactions.service';
import { Transaction } from '../../../../core/_models/TransactionDTO';

@Component({
  selector: 'ai-transaction-log',
  templateUrl: './transaction-log.component.html',
  styleUrls: ['./transaction-log.component.scss']
})
export class TransactionLogComponent implements OnInit {

  transactionList: Transaction[] =[];

  constructor(private LogService: UpdateTransactionsService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.GetSalesTransactions();
  }

  GetSalesTransactions(){
    this.LogService.getSalesTransactionsByFilter("ALL", "USD").subscribe(response =>{
      console.log(response)
      this.transactionList=response;
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
}
