import { IRestaurant, NewRestaurant } from './restaurant.model';

export const sampleWithRequiredData: IRestaurant = {
  id: 59197,
  restId: 66056,
  name: 'Officer',
  adress: 'solution turn-key Keyboard',
};

export const sampleWithPartialData: IRestaurant = {
  id: 64585,
  restId: 78272,
  name: 'Incredible',
  adress: 'Borders',
};

export const sampleWithFullData: IRestaurant = {
  id: 97439,
  restId: 65290,
  name: 'Squares York',
  adress: 'Computers',
  theme: 'Checking sticky',
  review: 1,
};

export const sampleWithNewData: NewRestaurant = {
  restId: 39828,
  name: 'compressing',
  adress: 'Kentucky Solutions copying',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
