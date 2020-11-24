import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/core/reducers';
import { currentUserRoleIds} from '../../../../core/auth/_selectors/auth.selectors';
import { TransactionLogComponent } from './transaction-log/transaction-log.component';
import { Balance } from './transaction-log/transaction-log.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ai-transaction-filter',
  templateUrl: './transaction-filter.component.html',
  styleUrls: ['./transaction-filter.component.scss']
})
export class TransactionFilterComponent implements OnInit, OnDestroy {

  firstCurrency:string = '';
  secondCurrency:string = '';
  subs: Subscription[] = [];
  role:number;

  @ViewChild(TransactionLogComponent) transactionLog :TransactionLogComponent;
  
  showCustom = false;
  showCreate=false;

  myForm: FormGroup;

  constructor(private store: Store<AppState>, 
    private fb: FormBuilder) { 
  }

  ngOnInit(): void {
    this.subs.push(this.store.pipe(select(currentUserRoleIds)).subscribe(response => {
      this.role = response[1];
    }));
    this.myForm = this.fb.group({
      soldCurrency: '',
      boughtCurrency :'',
      buyAmmount: '',
      bank:'',

    })
    this.subs.push(this.myForm.valueChanges.subscribe())
  }

  ngOnDestroy(){
    this.subs.forEach(sub => sub.unsubscribe());
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

  createTransaction(){

  }

}
