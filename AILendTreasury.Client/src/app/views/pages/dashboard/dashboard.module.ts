// Angular
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
// Core Module
import { CoreModule } from '../../../core/core.module';
import { PartialsModule } from '../../partials/partials.module';
import { DashboardComponent } from './dashboard.component';
import { StartingPositionComponent } from './starting-position/starting-position.component';
import { TransactionFilterComponent } from './transaction-filter/transaction-filter.component';
import { SummaryComponent } from './summary/summary.component';
import { TransactionLogComponent } from './transaction-filter/transaction-log/transaction-log.component';

@NgModule({
  imports: [
    CommonModule,
    PartialsModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent
      },
    ]),
    // ng-bootstrap modules
    NgbDropdownModule,
    NgbTabsetModule,
    NgbTooltipModule,
  ],
  providers: [],
  declarations: [
    DashboardComponent,
    StartingPositionComponent,
    TransactionFilterComponent,
    SummaryComponent,
    TransactionLogComponent,
  ]
})
export class DashboardModule {
}
