import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionNotificationComponent } from './transaction-notification.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CheckNumberDirective } from './check-number.directive';

@NgModule({
  declarations: [TransactionNotificationComponent, CheckNumberDirective],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
  ],
  exports:[TransactionNotificationComponent]
})
export class TransactionNotificationModule { }
