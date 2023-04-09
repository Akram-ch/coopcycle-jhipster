import { ICooperative, NewCooperative } from './cooperative.model';

export const sampleWithRequiredData: ICooperative = {
  id: 84816,
  name: 'incentivize program Radial',
  region: 'primary transmitter Fish',
};

export const sampleWithPartialData: ICooperative = {
  id: 60826,
  name: 'Granite Pizza',
  region: 'Convertible deposit',
};

export const sampleWithFullData: ICooperative = {
  id: 73008,
  name: 'mobile cross-platform',
  region: 'Idaho override',
};

export const sampleWithNewData: NewCooperative = {
  name: 'attitude-oriented Supervisor innovate',
  region: 'XML Cotton',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
