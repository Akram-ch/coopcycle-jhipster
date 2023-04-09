import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IConseil, NewConseil } from '../conseil.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IConseil for edit and NewConseilFormGroupInput for create.
 */
type ConseilFormGroupInput = IConseil | PartialWithRequiredKeyOf<NewConseil>;

type ConseilFormDefaults = Pick<NewConseil, 'id'>;

type ConseilFormGroupContent = {
  id: FormControl<IConseil['id'] | NewConseil['id']>;
  directeur: FormControl<IConseil['directeur']>;
};

export type ConseilFormGroup = FormGroup<ConseilFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ConseilFormService {
  createConseilFormGroup(conseil: ConseilFormGroupInput = { id: null }): ConseilFormGroup {
    const conseilRawValue = {
      ...this.getFormDefaults(),
      ...conseil,
    };
    return new FormGroup<ConseilFormGroupContent>({
      id: new FormControl(
        { value: conseilRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      directeur: new FormControl(conseilRawValue.directeur, {
        validators: [Validators.required],
      }),
    });
  }

  getConseil(form: ConseilFormGroup): IConseil | NewConseil {
    return form.getRawValue() as IConseil | NewConseil;
  }

  resetForm(form: ConseilFormGroup, conseil: ConseilFormGroupInput): void {
    const conseilRawValue = { ...this.getFormDefaults(), ...conseil };
    form.reset(
      {
        ...conseilRawValue,
        id: { value: conseilRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ConseilFormDefaults {
    return {
      id: null,
    };
  }
}
