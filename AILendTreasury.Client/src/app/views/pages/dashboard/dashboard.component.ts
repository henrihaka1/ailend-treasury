// Angular
import { Component, OnInit } from '@angular/core';
import { CurrencyBalance } from 'src/app/core/_models/CurrencyBalance';
import { TestService } from './test.service';
import { ShowNotificationService } from '../../../components/transaction-notification/show-notification.service';
import { Transaction } from 'src/app/core/_models/TransactionDTO';
import { TransferState } from '@angular/platform-browser';
import { TransferTransactionsService } from './transfer-transactions.service';

@Component({
  selector: 'kt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  latestBalance :CurrencyBalance[];
  currencies = [];
  showBalance =false;

  constructor(
    private service: TestService, 
    private transactionNotification: ShowNotificationService, 
    private transfTransaction: TransferTransactionsService,
  )
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
    var transaction = this.list[Math.floor(Math.random() * this.list.length)];
    //var transaction = this.list[10];
    var newTransaction = new Transaction();
    newTransaction.createdDate = new Date();
    newTransaction.boughtCurrency = transaction.BoughtCurrency;
    newTransaction.soldCurrency = transaction.SoldCurrency;
    newTransaction.exchangeRate = transaction.ExchangeRate;
    newTransaction.soldAmount = transaction.SoldAmount;
    newTransaction.customer = transaction.Customer;
    newTransaction.boughtAmount = transaction.SoldAmount * transaction.ExchangeRate;

    this.transactionNotification.createMessage(newTransaction);
    this.transfTransaction.insertTransaction(newTransaction);
    if ((newTransaction.soldAmount <= 50000 && newTransaction.soldCurrency!="ALL") || (newTransaction.soldAmount <= 500000 && newTransaction.soldCurrency == "ALL"))
    {
      console.log(transaction);
      this.service.submitNewTransaction(transaction).subscribe(response => 
        {
          console.log(JSON.parse(response.balance));
        });
    }
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
      SoldCurrency : "ALL",
      BoughtCurrency: "GDP",
      SoldAmount:40000,
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
      BoughtCurrency: "EUR",
      SoldAmount:7000,
      ExchangeRate: 1.1,
      CreatedDate: new Date(),
      Customer:"Marsid Aga",
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
      SoldCurrency : "EUR",
      BoughtCurrency: "GDP",
      SoldAmount:60000,
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
  ]; 
}
