import { ILivreur, NewLivreur } from './livreur.model';

export const sampleWithRequiredData: ILivreur = {
  id: 71552,
  livId: 21383,
  name: 'Credit',
};

export const sampleWithPartialData: ILivreur = {
  id: 41336,
  livId: 37626,
  name: 'Assistant',
};

export const sampleWithFullData: ILivreur = {
  id: 73835,
  livId: 65231,
  name: 'collaborative sexy protocol',
};

export const sampleWithNewData: NewLivreur = {
  livId: 39773,
  name: 'Enhanced Account Soft',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
