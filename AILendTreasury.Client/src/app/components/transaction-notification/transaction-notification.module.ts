import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionNotificationComponent } from './transaction-notification.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TransactionNotificationComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
  ],
  exports:[TransactionNotificationComponent]
})
export class TransactionNotificationModule { }
