import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ConseilFormService, ConseilFormGroup } from './conseil-form.service';
import { IConseil } from '../conseil.model';
import { ConseilService } from '../service/conseil.service';

@Component({
  selector: 'jhi-conseil-update',
  templateUrl: './conseil-update.component.html',
})
export class ConseilUpdateComponent implements OnInit {
  isSaving = false;
  conseil: IConseil | null = null;

  editForm: ConseilFormGroup = this.conseilFormService.createConseilFormGroup();

  constructor(
    protected conseilService: ConseilService,
    protected conseilFormService: ConseilFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ conseil }) => {
      this.conseil = conseil;
      if (conseil) {
        this.updateForm(conseil);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const conseil = this.conseilFormService.getConseil(this.editForm);
    if (conseil.id !== null) {
      this.subscribeToSaveResponse(this.conseilService.update(conseil));
    } else {
      this.subscribeToSaveResponse(this.conseilService.create(conseil));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConseil>>): void {
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

  protected updateForm(conseil: IConseil): void {
    this.conseil = conseil;
    this.conseilFormService.resetForm(this.editForm, conseil);
  }
}
