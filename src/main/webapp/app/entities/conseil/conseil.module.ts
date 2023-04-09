import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ConseilComponent } from './list/conseil.component';
import { ConseilDetailComponent } from './detail/conseil-detail.component';
import { ConseilUpdateComponent } from './update/conseil-update.component';
import { ConseilDeleteDialogComponent } from './delete/conseil-delete-dialog.component';
import { ConseilRoutingModule } from './route/conseil-routing.module';

@NgModule({
  imports: [SharedModule, ConseilRoutingModule],
  declarations: [ConseilComponent, ConseilDetailComponent, ConseilUpdateComponent, ConseilDeleteDialogComponent],
})
export class ConseilModule {}
