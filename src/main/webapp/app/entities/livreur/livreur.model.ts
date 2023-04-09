import { ICooperative } from 'app/entities/cooperative/cooperative.model';

export interface ILivreur {
  id: number;
  livId?: number | null;
  name?: string | null;
  cooperative?: Pick<ICooperative, 'id'> | null;
}

export type NewLivreur = Omit<ILivreur, 'id'> & { id: null };
