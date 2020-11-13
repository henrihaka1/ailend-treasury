// Angular
import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';


@Component({
  selector: 'kt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  today = new Date();

  constructor(private service: TestService)
  {

  }

  ngOnInit(): void {
  }

  test()
  {
    this.service.test().subscribe(response => console.log(response));
  }

  submitNewBalance(){
    this.service.submitNewBalance().subscribe();
  }
}
