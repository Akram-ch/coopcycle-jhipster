import { IConseil } from 'app/entities/conseil/conseil.model';

export interface ICooperative {
  id: number;
  name?: string | null;
  region?: string | null;
  conseil?: Pick<IConseil, 'id'> | null;
}

export type NewCooperative = Omit<ICooperative, 'id'> & { id: null };
