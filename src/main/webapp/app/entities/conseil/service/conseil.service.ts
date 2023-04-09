import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IConseil, NewConseil } from '../conseil.model';

export type PartialUpdateConseil = Partial<IConseil> & Pick<IConseil, 'id'>;

export type EntityResponseType = HttpResponse<IConseil>;
export type EntityArrayResponseType = HttpResponse<IConseil[]>;

@Injectable({ providedIn: 'root' })
export class ConseilService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/conseils');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(conseil: NewConseil): Observable<EntityResponseType> {
    return this.http.post<IConseil>(this.resourceUrl, conseil, { observe: 'response' });
  }

  update(conseil: IConseil): Observable<EntityResponseType> {
    return this.http.put<IConseil>(`${this.resourceUrl}/${this.getConseilIdentifier(conseil)}`, conseil, { observe: 'response' });
  }

  partialUpdate(conseil: PartialUpdateConseil): Observable<EntityResponseType> {
    return this.http.patch<IConseil>(`${this.resourceUrl}/${this.getConseilIdentifier(conseil)}`, conseil, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IConseil>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IConseil[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getConseilIdentifier(conseil: Pick<IConseil, 'id'>): number {
    return conseil.id;
  }

  compareConseil(o1: Pick<IConseil, 'id'> | null, o2: Pick<IConseil, 'id'> | null): boolean {
    return o1 && o2 ? this.getConseilIdentifier(o1) === this.getConseilIdentifier(o2) : o1 === o2;
  }

  addConseilToCollectionIfMissing<Type extends Pick<IConseil, 'id'>>(
    conseilCollection: Type[],
    ...conseilsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const conseils: Type[] = conseilsToCheck.filter(isPresent);
    if (conseils.length > 0) {
      const conseilCollectionIdentifiers = conseilCollection.map(conseilItem => this.getConseilIdentifier(conseilItem)!);
      const conseilsToAdd = conseils.filter(conseilItem => {
        const conseilIdentifier = this.getConseilIdentifier(conseilItem);
        if (conseilCollectionIdentifiers.includes(conseilIdentifier)) {
          return false;
        }
        conseilCollectionIdentifiers.push(conseilIdentifier);
        return true;
      });
      return [...conseilsToAdd, ...conseilCollection];
    }
    return conseilCollection;
  }
}
