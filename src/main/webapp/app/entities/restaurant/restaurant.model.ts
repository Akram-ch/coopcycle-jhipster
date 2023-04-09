import { ICooperative } from 'app/entities/cooperative/cooperative.model';

export interface IRestaurant {
  id: number;
  restId?: number | null;
  name?: string | null;
  adress?: string | null;
  theme?: string | null;
  review?: number | null;
  cooperative?: Pick<ICooperative, 'id'> | null;
}

export type NewRestaurant = Omit<IRestaurant, 'id'> & { id: null };
