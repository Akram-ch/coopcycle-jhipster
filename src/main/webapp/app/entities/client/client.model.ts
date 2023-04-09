import { IPanier } from 'app/entities/panier/panier.model';
import { ICooperative } from 'app/entities/cooperative/cooperative.model';

export interface IClient {
  id: number;
  clientId?: number | null;
  clientName?: string | null;
  clientRegion?: string | null;
  panier?: Pick<IPanier, 'id'> | null;
  cooperative?: Pick<ICooperative, 'id'> | null;
}

export type NewClient = Omit<IClient, 'id'> & { id: null };
