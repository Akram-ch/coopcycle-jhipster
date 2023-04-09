import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { CooperativeFormService, CooperativeFormGroup } from './cooperative-form.service';
import { ICooperative } from '../cooperative.model';
import { CooperativeService } from '../service/cooperative.service';
import { IConseil } from 'app/entities/conseil/conseil.model';
import { ConseilService } from 'app/entities/conseil/service/conseil.service';

@Component({
  selector: 'jhi-cooperative-update',
  templateUrl: './cooperative-update.component.html',
})
export class CooperativeUpdateComponent implements OnInit {
  isSaving = false;
  cooperative: ICooperative | null = null;

  conseilsCollection: IConseil[] = [];

  editForm: CooperativeFormGroup = this.cooperativeFormService.createCooperativeFormGroup();

  constructor(
    protected cooperativeService: CooperativeService,
    protected cooperativeFormService: CooperativeFormService,
    protected conseilService: ConseilService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareConseil = (o1: IConseil | null, o2: IConseil | null): boolean => this.conseilService.compareConseil(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cooperative }) => {
      this.cooperative = cooperative;
      if (cooperative) {
        this.updateForm(cooperative);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cooperative = this.cooperativeFormService.getCooperative(this.editForm);
    if (cooperative.id !== null) {
      this.subscribeToSaveResponse(this.cooperativeService.update(cooperative));
    } else {
      this.subscribeToSaveResponse(this.cooperativeService.create(cooperative));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICooperative>>): void {
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

  protected updateForm(cooperative: ICooperative): void {
    this.cooperative = cooperative;
    this.cooperativeFormService.resetForm(this.editForm, cooperative);

    this.conseilsCollection = this.conseilService.addConseilToCollectionIfMissing<IConseil>(this.conseilsCollection, cooperative.conseil);
  }

  protected loadRelationshipsOptions(): void {
    this.conseilService
      .query({ filter: 'cooperative-is-null' })
      .pipe(map((res: HttpResponse<IConseil[]>) => res.body ?? []))
      .pipe(
        map((conseils: IConseil[]) => this.conseilService.addConseilToCollectionIfMissing<IConseil>(conseils, this.cooperative?.conseil))
      )
      .subscribe((conseils: IConseil[]) => (this.conseilsCollection = conseils));
  }
}
