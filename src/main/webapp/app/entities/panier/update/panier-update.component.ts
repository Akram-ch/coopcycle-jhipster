import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { PanierFormService, PanierFormGroup } from './panier-form.service';
import { IPanier } from '../panier.model';
import { PanierService } from '../service/panier.service';
import { IRestaurant } from 'app/entities/restaurant/restaurant.model';
import { RestaurantService } from 'app/entities/restaurant/service/restaurant.service';
import { ILivreur } from 'app/entities/livreur/livreur.model';
import { LivreurService } from 'app/entities/livreur/service/livreur.service';

@Component({
  selector: 'jhi-panier-update',
  templateUrl: './panier-update.component.html',
})
export class PanierUpdateComponent implements OnInit {
  isSaving = false;
  panier: IPanier | null = null;

  restaurantsSharedCollection: IRestaurant[] = [];
  livreursSharedCollection: ILivreur[] = [];

  editForm: PanierFormGroup = this.panierFormService.createPanierFormGroup();

  constructor(
    protected panierService: PanierService,
    protected panierFormService: PanierFormService,
    protected restaurantService: RestaurantService,
    protected livreurService: LivreurService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareRestaurant = (o1: IRestaurant | null, o2: IRestaurant | null): boolean => this.restaurantService.compareRestaurant(o1, o2);

  compareLivreur = (o1: ILivreur | null, o2: ILivreur | null): boolean => this.livreurService.compareLivreur(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ panier }) => {
      this.panier = panier;
      if (panier) {
        this.updateForm(panier);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const panier = this.panierFormService.getPanier(this.editForm);
    if (panier.id !== null) {
      this.subscribeToSaveResponse(this.panierService.update(panier));
    } else {
      this.subscribeToSaveResponse(this.panierService.create(panier));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPanier>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(panier: IPanier): void {
    this.panier = panier;
    this.panierFormService.resetForm(this.editForm, panier);

    this.restaurantsSharedCollection = this.restaurantService.addRestaurantToCollectionIfMissing<IRestaurant>(
      this.restaurantsSharedCollection,
      panier.restaurant
    );
    this.livreursSharedCollection = this.livreurService.addLivreurToCollectionIfMissing<ILivreur>(
      this.livreursSharedCollection,
      panier.livreur
    );
  }

  protected loadRelationshipsOptions(): void {
    this.restaurantService
      .query()
      .pipe(map((res: HttpResponse<IRestaurant[]>) => res.body ?? []))
      .pipe(
        map((restaurants: IRestaurant[]) =>
          this.restaurantService.addRestaurantToCollectionIfMissing<IRestaurant>(restaurants, this.panier?.restaurant)
        )
      )
      .subscribe((restaurants: IRestaurant[]) => (this.restaurantsSharedCollection = restaurants));

    this.livreurService
      .query()
      .pipe(map((res: HttpResponse<ILivreur[]>) => res.body ?? []))
      .pipe(map((livreurs: ILivreur[]) => this.livreurService.addLivreurToCollectionIfMissing<ILivreur>(livreurs, this.panier?.livreur)))
      .subscribe((livreurs: ILivreur[]) => (this.livreursSharedCollection = livreurs));
  }
}
