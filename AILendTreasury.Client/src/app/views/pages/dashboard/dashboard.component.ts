// Angular
import { Component, OnInit } from '@angular/core';
import { CurrencyBalance } from 'src/app/core/_models/CurrencyBalance';
import { TestService } from './test.service';
import { ShowNotificationService } from '../../../components/transaction-notification/show-notification.service';
import { Transaction } from 'src/app/core/_models/TransactionDTO';
import { TransferTransactionsService } from './transfer-transactions.service';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers';
import { currentUserRoleIds} from '../../../core/auth/_selectors/auth.selectors';
import { Subscription } from 'rxjs';
@Component({
  selector: 'kt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  latestBalance :CurrencyBalance[];
  currencies = [];
  showBalance =false;
  subs : Subscription[] = [];
  role : number;

  constructor(
    private service: TestService, 
    private transactionNotification: ShowNotificationService, 
    private transfTransaction: TransferTransactionsService,
    private store: Store<AppState>
  )
  {

  }

  ngOnInit(): void {
    //this.getAllCurrencies();
    this.subs.push(this.store.pipe(select(currentUserRoleIds)).subscribe(response => {
      this.role = response[1];
      //console.log(this.role)
    }));
  }

  ngOnDestroy(){
    this.subs.forEach(sub => sub.unsubscribe());
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
    var transaction;
    if(this.role == 2)
    {
      transaction = this.list[Math.floor(Math.random() * this.list.length)];
    }
    else if (this.role == 3)
    {
      transaction = this.fx[Math.floor(Math.random() * this.fx.length)];
    }

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

    if(this.role == 2)
    {
      if ((newTransaction.soldAmount <= 50000 && newTransaction.soldCurrency!="ALL") || (newTransaction.soldAmount <= 500000 && newTransaction.soldCurrency == "ALL"))
      {
        this.transfTransaction.insertTransaction(newTransaction);
        this.service.submitNewTransaction(transaction).subscribe(response => 
          {
            console.log(JSON.parse(response.balance));
          });
      }
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
  fx = [
    {
      SoldCurrency : "GDP",
      BoughtCurrency: "EUR",
      SoldAmount:100000,
      ExchangeRate: 1.13,
      CreatedDate: new Date(),
      Customer:"BKT",
      ApprovedBy:{ 
        Id:2,
        FirstName: "RFS",
        LastName:"",
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
      SoldAmount:200000,
      ExchangeRate: 0.84,
      CreatedDate: new Date(),
      Customer:"OTP",
      ApprovedBy:{ 
        Id:2,
        FirstName: "RFS",
        LastName:"",
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
      BoughtCurrency: "EUR",
      SoldAmount:1000000,
      ExchangeRate: 0.0081,
      CreatedDate: new Date(),
      Customer:"TRB",
      ApprovedBy:{ 
        Id:2,
        FirstName: "RFS",
        LastName:"",
        Email:"asdada",
        KeycloakId:"adada",
        Department:"sales",
        AutomaticTransactions:[],
        ManualTransactions:[],
        FXTransactions:[]
      }
    },
  ];



  list = [
    {
      SoldCurrency : "ALL",
      BoughtCurrency: "EUR",
      SoldAmount:10000,
      ExchangeRate: 125.3,
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
      ExchangeRate: 123.3,
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
      ExchangeRate: 1.19,
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
      ExchangeRate: 138.73,
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
      ExchangeRate: 103.82,
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
      ExchangeRate: 103.82,
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
      ExchangeRate: 103.82,
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
      ExchangeRate: 139.3,
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
      ExchangeRate: 0.84,
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
      ExchangeRate: 103.83,
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
      ExchangeRate: 0.89,
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
      SoldCurrency : "USD",
      BoughtCurrency: "GDP",
      SoldAmount:52000,
      ExchangeRate: 0.75,
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
      SoldCurrency : "GDP",
      BoughtCurrency: "EUR",
      SoldAmount:58000,
      ExchangeRate: 1.12,
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
      SoldCurrency : "GDP",
      BoughtCurrency: "USD",
      SoldAmount:53000,
      ExchangeRate: 1.34,
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
      SoldCurrency : "GDP",
      BoughtCurrency: "EUR",
      SoldAmount:71000,
      ExchangeRate: 1.13,
      CreatedDate: new Date(),
      Customer:"Gentian Zotaj",
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
