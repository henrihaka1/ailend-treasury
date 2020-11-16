import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CurrencyBalance } from 'src/app/core/_models/CurrencyBalance';
import { PositionService } from './position.service';

@Component({
  selector: 'ai-starting-position',
  templateUrl: './starting-position.component.html',
  styleUrls: ['./starting-position.component.scss']
})
export class StartingPositionComponent implements OnInit {

  startingBalance :CurrencyBalance[];
  latestBalance: CurrencyBalance[];
  differenceBalance: CurrencyBalance[];

  constructor(private PositionService: PositionService,private cd : ChangeDetectorRef) { }

  ngOnInit(): void {
      this.PositionService.getStartingBalance().subscribe(response => {
      this.startingBalance = JSON.parse(response.balance);
        console.log(this.startingBalance);
        this.cd.detectChanges();
    });
    this.getCurrentBalance();
    setInterval(()=>{
      this.getCurrentBalance();
    }, 4000);
  }

  getCurrentBalance(){
    this.PositionService.getCurrentBalance().subscribe(response => {
      this.latestBalance = JSON.parse(response.balance);
        console.log(this.latestBalance);
        this.cd.detectChanges();
    });
  }

  ngOnDestroy(){
    
  }


  formatNumber(x) {
    if(x === undefined)
      return
    var parts = x.toString().split(".");
    parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
    return parts.join(",");
    }


}
