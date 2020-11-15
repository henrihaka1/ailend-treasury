import { Component, OnInit } from '@angular/core';
import { CurrencyBalance } from 'src/app/core/_models/CurrencyBalance';
import { StartingPositionService } from './starting-position.service';

@Component({
  selector: 'ai-starting-position',
  templateUrl: './starting-position.component.html',
  styleUrls: ['./starting-position.component.scss']
})
export class StartingPositionComponent implements OnInit {

  startingBalance :CurrencyBalance[];

  constructor(private startingPositionService: StartingPositionService) { }

  ngOnInit(): void {
    this.startingPositionService.getStartingBalance().subscribe(response => {
      this.startingBalance = JSON.parse(response.balance);
        console.log(this.startingBalance);
    });
  }

}
