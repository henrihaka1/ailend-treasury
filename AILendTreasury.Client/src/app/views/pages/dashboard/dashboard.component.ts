// Angular
import { Component, OnInit } from '@angular/core';
import { random } from 'lodash';
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
    //this.getAllCurrencies();
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
    this.service.submitNewTransaction(this.list[Math.floor(Math.random() * this.list.length)]).subscribe(response => 
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

  //TRANSACTIONS ARRAY :
  list = [
    {
      SoldCurrency : "ALL",
      BoughtCurrency: "EUR",
      SoldAmount:10000,
      ExchangeRate: 0.91,
      CreatedDate: new Date(),
      Customer:"Henri Haka",
      ApprovedBy:{ 
        Id:2,
        FirstName: "Genti",
        LastName:"Zotaj",
        Email:"asdada",
        KeycloakId:"adada",
        Department:"sales",
        AutomaticTransactions:[],
        ManualTransactions:[],
        FXTransactions:[]
      }
    },
    {
      SoldCurrency : "EUR",
      BoughtCurrency: "ALL",
      SoldAmount:20000,
      ExchangeRate: 1.2,
      CreatedDate: new Date(),
      Customer:"Gentian Zotaj",
      ApprovedBy:{ 
        Id:2,
        FirstName: "Arsid",
        LastName:"Mithi",
        Email:"asdada",
        KeycloakId:"adada",
        Department:"sales",
        AutomaticTransactions:[],
        ManualTransactions:[],
        FXTransactions:[]
      }
    },
    {
      SoldCurrency : "EUR",
      BoughtCurrency: "USD",
      SoldAmount:7500,
      ExchangeRate: 1.1,
      CreatedDate: new Date(),
      Customer:"Alba Bakiasi",
      ApprovedBy:{ 
        Id:2,
        FirstName: "Arsid",
        LastName:"Mithi",
        Email:"asdada",
        KeycloakId:"adada",
        Department:"sales",
        AutomaticTransactions:[],
        ManualTransactions:[],
        FXTransactions:[]
      }
    },
    {
      SoldCurrency : "GDP",
      BoughtCurrency: "ALL",
      SoldAmount:20000,
      ExchangeRate: 1.4,
      CreatedDate: new Date(),
      Customer:"Henri Haka",
      ApprovedBy:{ 
        Id:2,
        FirstName: "Arsid",
        LastName:"Mithi",
        Email:"asdada",
        KeycloakId:"adada",
        Department:"sales",
        AutomaticTransactions:[],
        ManualTransactions:[],
        FXTransactions:[]
      }
    },
    {
      SoldCurrency : "USD",
      BoughtCurrency: "ALL",
      SoldAmount:15000,
      ExchangeRate: 1.1,
      CreatedDate: new Date(),
      Customer:"Gentian Zotaj",
      ApprovedBy:{ 
        Id:2,
        FirstName: "Arsid",
        LastName:"Mithi",
        Email:"asdada",
        KeycloakId:"adada",
        Department:"sales",
        AutomaticTransactions:[],
        ManualTransactions:[],
        FXTransactions:[]
      }
    },
    {
      SoldCurrency : "USD",
      BoughtCurrency: "ALL",
      SoldAmount:10000,
      ExchangeRate: 1.1,
      CreatedDate: new Date(),
      Customer:"Gentian Zotaj",
      ApprovedBy:{ 
        Id:2,
        FirstName: "Arsid",
        LastName:"Mithi",
        Email:"asdada",
        KeycloakId:"adada",
        Department:"sales",
        AutomaticTransactions:[],
        ManualTransactions:[],
        FXTransactions:[]
      }
    },
    {
      SoldCurrency : "USD",
      BoughtCurrency: "ALL",
      SoldAmount:20000,
      ExchangeRate: 1.1,
      CreatedDate: new Date(),
      Customer:"Gentian Zotaj",
      ApprovedBy:{ 
        Id:2,
        FirstName: "Arsid",
        LastName:"Mithi",
        Email:"asdada",
        KeycloakId:"adada",
        Department:"sales",
        AutomaticTransactions:[],
        ManualTransactions:[],
        FXTransactions:[]
      }
    },
    {

    },
    {

    },
    {

    }
  ]; 
}
