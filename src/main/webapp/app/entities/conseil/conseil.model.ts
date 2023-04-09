export interface IConseil {
  id: number;
  directeur?: string | null;
}

export type NewConseil = Omit<IConseil, 'id'> & { id: null };
