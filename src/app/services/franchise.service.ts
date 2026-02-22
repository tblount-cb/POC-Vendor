import { Injectable } from '@angular/core';

export interface Franchise {
  id: number;
  name: string;
  v2: boolean;
  v3: boolean;
  contact: string;
  email: string;
}

const FRANCHISES: Franchise[] = [
  { id: 1, name: 'Big Frog', v2: false, v3: true, contact: '', email: '' },
  { id: 2, name: 'Fastsigns', v2: true, v3: true, contact: '', email: '' },
  { id: 3, name: 'Sign*A*Rama', v2: true, v3: true, contact: '', email: '' },
  { id: 4, name: 'Signs Express', v2: false, v3: true, contact: '', email: '' },
  { id: 5, name: 'SignWorld', v2: true, v3: true, contact: '', email: '' },
  { id: 6, name: 'Speedpro CA', v2: true, v3: true, contact: '', email: '' },
  { id: 7, name: 'Speedpro US', v2: true, v3: true, contact: '', email: '' },
];

@Injectable({ providedIn: 'root' })
export class FranchiseService {
  getAll(): Franchise[] {
    return [...FRANCHISES];
  }

  getById(id: string): Franchise | null {
    if (id === 'new') return null;
    const numId = Number(id);
    if (Number.isNaN(numId)) return null;
    return FRANCHISES.find(f => f.id === numId) ?? null;
  }
}
