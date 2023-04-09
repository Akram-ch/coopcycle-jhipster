import { IRestaurant } from 'app/entities/restaurant/restaurant.model';
import { ILivreur } from 'app/entities/livreur/livreur.model';

export interface IPanier {
  id: number;
  price?: number | null;
  restaurant?: Pick<IRestaurant, 'id'> | null;
  livreur?: Pick<ILivreur, 'id'> | null;
}

export type NewPanier = Omit<IPanier, 'id'> & { id: null };
