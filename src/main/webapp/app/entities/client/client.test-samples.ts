import { IClient, NewClient } from './client.model';

export const sampleWithRequiredData: IClient = {
  id: 71655,
  clientId: 33198,
  clientName: 'Cotton primary Virginia',
};

export const sampleWithPartialData: IClient = {
  id: 23227,
  clientId: 76069,
  clientName: 'asynchronous Account Future',
};

export const sampleWithFullData: IClient = {
  id: 10208,
  clientId: 23980,
  clientName: 'Devolved Washington',
  clientRegion: 'card Reverse-engineered analyzing',
};

export const sampleWithNewData: NewClient = {
  clientId: 5144,
  clientName: 'users silver connect',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
