import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IConseil } from '../conseil.model';
import { ConseilService } from '../service/conseil.service';

@Injectable({ providedIn: 'root' })
export class ConseilRoutingResolveService implements Resolve<IConseil | null> {
  constructor(protected service: ConseilService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConseil | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((conseil: HttpResponse<IConseil>) => {
          if (conseil.body) {
            return of(conseil.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
