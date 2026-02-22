import { Injectable } from '@angular/core';

export type VendorStatus =
  | 'New Inquiry'
  | 'In Review'
  | 'Active Vendor'
  | 'On Hold'
  | 'Declined'
  | 'Inactive (Former Vendor)';

export interface Vendor {
  id: number;
  name: string;
  status: VendorStatus;
  v2: 'Yes' | 'No' | 'Pending';
  v3: 'Yes' | 'No' | 'Pending';
  contact: string;
  email: string;
  ndaOnFile: 'Yes' | 'No';
  contractOnFile: 'Yes' | 'No';
  pricing: 'Rev Share' | 'Monthly API' | 'Exempt' | 'Exempt or N/A' | 'Contract' | 'N/A' | 'Unknown';
  restrictions: 'Franchise' | 'Regional' | 'No Restrictions';
}

const VENDORS: Vendor[] = [
  { id: 1, name: 'QuickBooks', status: 'Active Vendor', v2: 'Yes', v3: 'Yes', contact: 'N/A', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Exempt', restrictions: 'No Restrictions' },
  { id: 2, name: 'Xero', status: 'Active Vendor', v2: 'Yes', v3: 'Yes', contact: 'N/A', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Exempt', restrictions: 'No Restrictions' },
  { id: 3, name: 'SanMar', status: 'Active Vendor', v2: 'No', v3: 'Yes', contact: '', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Exempt', restrictions: 'No Restrictions' },
  { id: 4, name: 'S&S Activewear', status: 'Active Vendor', v2: 'No', v3: 'Yes', contact: '', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Exempt', restrictions: 'No Restrictions' },
  { id: 5, name: 'Google', status: 'Active Vendor', v2: 'No', v3: 'Yes', contact: 'N/A', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Exempt', restrictions: 'No Restrictions' },
  { id: 6, name: 'Microsoft', status: 'Active Vendor', v2: 'No', v3: 'Yes', contact: 'N/A', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Exempt', restrictions: 'No Restrictions' },
  { id: 7, name: 'Listen360', status: 'Active Vendor', v2: 'No', v3: 'Yes', contact: '', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'N/A', restrictions: 'Franchise' },
  { id: 8, name: 'LoyaltyLoop', status: 'Active Vendor', v2: 'Yes', v3: 'Yes', contact: 'John DiPippo', email: 'jdipippo@loyaltyloop.com', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Rev Share', restrictions: 'No Restrictions' },
  { id: 9, name: 'Nexio', status: 'Active Vendor', v2: 'Yes', v3: 'Yes', contact: 'Jenn Aaron', email: 'jaaron@nex.io', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Rev Share', restrictions: 'No Restrictions' },
  { id: 10, name: 'Fiserv AUS', status: 'Active Vendor', v2: 'Yes', v3: 'Yes', contact: 'Jade Nancarrow', email: 'jade.nancarrow@fiserv.com', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Rev Share', restrictions: 'Regional' },
  { id: 11, name: 'Fiserv US', status: 'Active Vendor', v2: 'Yes', v3: 'Yes', contact: 'Tana Greenfield', email: 'tana.greenfield@fiserv.com', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Rev Share', restrictions: 'Regional' },
  { id: 12, name: 'Stripe', status: 'Active Vendor', v2: 'Yes', v3: 'Yes', contact: '', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Rev Share', restrictions: 'Regional' },
  { id: 13, name: 'Authorized.NET', status: 'Active Vendor', v2: 'Yes', v3: 'Yes', contact: '', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Rev Share', restrictions: 'Franchise' },
  { id: 14, name: 'EasyPost', status: 'Active Vendor', v2: 'No', v3: 'Yes', contact: 'Brian Hill', email: 'bhill@easypost.com', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Contract', restrictions: 'No Restrictions' },
  { id: 15, name: 'TaxJar', status: 'Active Vendor', v2: 'Yes', v3: 'Yes', contact: '', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'N/A', restrictions: 'No Restrictions' },
  { id: 16, name: 'Avalara', status: 'Active Vendor', v2: 'Yes', v3: 'Yes', contact: 'Adhya Sethuraman', email: 'adhya.sethuraman@avalara.com', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Rev Share', restrictions: 'No Restrictions' },
  { id: 17, name: 'Zapier', status: 'Active Vendor', v2: 'Yes', v3: 'No', contact: '', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'N/A', restrictions: 'No Restrictions' },
  { id: 18, name: 'XPS', status: 'Active Vendor', v2: 'Yes', v3: 'No', contact: '', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'N/A', restrictions: 'No Restrictions' },
  { id: 19, name: 'Four51', status: 'Active Vendor', v2: 'Yes', v3: 'No', contact: '', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'N/A', restrictions: 'No Restrictions' },
  { id: 20, name: 'XMPie', status: 'Active Vendor', v2: 'Yes', v3: 'No', contact: '', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'N/A', restrictions: 'No Restrictions' },
  { id: 21, name: 'Pressero', status: 'Active Vendor', v2: 'Yes', v3: 'No', contact: 'George Mixco', email: 'george.mixco@aleyant.com', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'N/A', restrictions: 'No Restrictions' },
  { id: 22, name: 'SignPack', status: 'Active Vendor', v2: 'Yes', v3: 'Pending', contact: '', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'N/A', restrictions: 'No Restrictions' },
  { id: 23, name: 'SalesHub', status: 'Active Vendor', v2: 'Yes', v3: 'Pending', contact: '', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'N/A', restrictions: 'No Restrictions' },
  { id: 24, name: 'Gorilla Dash', status: 'Active Vendor', v2: 'Yes', v3: 'Pending', contact: 'Anthony Gherghetta', email: 'anthony@gorilladash.com', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Rev Share', restrictions: 'Franchise' },
  { id: 25, name: 'Text Control', status: 'Active Vendor', v2: 'No', v3: 'Yes', contact: '', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Contract', restrictions: 'No Restrictions' },
  { id: 26, name: 'Qrvey', status: 'Active Vendor', v2: 'No', v3: 'Yes', contact: 'Natan Cohen', email: 'natan@qrvey.com', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Contract', restrictions: 'No Restrictions' },
];

@Injectable({ providedIn: 'root' })
export class VendorService {
  getAll(): Vendor[] {
    return [...VENDORS];
  }

  getById(id: string): Vendor | null {
    if (id === 'new') return null;
    const numId = Number(id);
    if (Number.isNaN(numId)) return null;
    return VENDORS.find(v => v.id === numId) ?? null;
  }
}
