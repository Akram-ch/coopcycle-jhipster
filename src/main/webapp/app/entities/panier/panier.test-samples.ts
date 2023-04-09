import { IPanier, NewPanier } from './panier.model';

export const sampleWithRequiredData: IPanier = {
  id: 13332,
  price: 65813,
};

export const sampleWithPartialData: IPanier = {
  id: 308,
  price: 70759,
};

export const sampleWithFullData: IPanier = {
  id: 76442,
  price: 33071,
};

export const sampleWithNewData: NewPanier = {
  price: 1218,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
