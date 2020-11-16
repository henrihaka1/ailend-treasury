// Angular
import { Component, OnInit } from '@angular/core';
import { fromJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { BalanceDTO } from 'src/app/core/_models/BalanceDTO';
import { CurrencyBalance } from 'src/app/core/_models/CurrencyBalance';
import { TestService } from './test.service';


@Component({
  selector: 'kt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  latestBalance :CurrencyBalance[];
  currencies = [];
  showBalance =false;

  constructor(private service: TestService)
  {

  }

  ngOnInit(): void {
    this.getAllCurrencies();
  }

  getAllCurrencies()
  {
    this.service.test().subscribe(response => {
      this.currencies = response;
      console.log(this.currencies);

    });
  }

  submitNewTransaction()
  {
    this.service.submitNewTransaction().subscribe(response => 
      {
        console.log(JSON.parse(response.balance));
      });
  }

  submitNewBalance(){
    this.service.submitNewBalance().subscribe(response => 
      {
        this.latestBalance = JSON.parse(response.balance);
        console.log(this.latestBalance);
        console.log(this.latestBalance[3].label);
        this.showBalance=true;
      });
  }
}
