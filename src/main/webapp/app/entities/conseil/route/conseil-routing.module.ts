import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ConseilComponent } from '../list/conseil.component';
import { ConseilDetailComponent } from '../detail/conseil-detail.component';
import { ConseilUpdateComponent } from '../update/conseil-update.component';
import { ConseilRoutingResolveService } from './conseil-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const conseilRoute: Routes = [
  {
    path: '',
    component: ConseilComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ConseilDetailComponent,
    resolve: {
      conseil: ConseilRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ConseilUpdateComponent,
    resolve: {
      conseil: ConseilRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ConseilUpdateComponent,
    resolve: {
      conseil: ConseilRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(conseilRoute)],
  exports: [RouterModule],
})
export class ConseilRoutingModule {}
