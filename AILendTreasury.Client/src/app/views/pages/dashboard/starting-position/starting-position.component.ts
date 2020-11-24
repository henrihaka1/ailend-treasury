import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  timerId;
  subs : Subscription[] = [];

  constructor(private PositionService: PositionService,private cd : ChangeDetectorRef) { }

  ngOnInit(): void {
      this.subs.push(this.PositionService.getStartingBalance().subscribe(response => {
      this.startingBalance = JSON.parse(response.balance);
        console.log(this.startingBalance);
        this.cd.detectChanges();
    }));
    this.getCurrentBalance();
    this.timerId = setInterval(()=>{
      this.getCurrentBalance();
    }, 2000);
  }

  getCurrentBalance(){
    var sub = this.PositionService.getCurrentBalance().subscribe(response => {
      this.latestBalance = JSON.parse(response.balance);
        console.log(this.latestBalance);
        this.cd.detectChanges();
    });
    this.subs.push(sub);
  }

  ngOnDestroy(){
    clearInterval(this.timerId);
    this.subs.forEach(sub => sub.unsubscribe());
  }


  formatNumber(x, plusSign: boolean) {
    if(x === undefined)
      return
      var parts = x.toString().split(".");
      parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,".");
      if(x<0 ||(x>0 && !plusSign))
        return parts.join(",");
      else if(x>0 && plusSign)
        return '+'+parts.join(",");
      else{
        return parts.join(",");
      }
    }


}
