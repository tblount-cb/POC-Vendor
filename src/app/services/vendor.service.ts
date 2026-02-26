import { Injectable } from '@angular/core';

export type VendorStatus =
  | 'New Inquiry'
  | 'In Review'
  | 'Active Vendor'
  | 'On Hold'
  | 'Declined'
  | 'Inactive (Former Vendor)';

export interface VendorLink {
  label: string;
  url: string;
}

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
  preferredPartner?: boolean;
  website?: string;
  links?: VendorLink[];
}

const VENDORS: Vendor[] = [
  { id: 1, name: 'QuickBooks', status: 'Active Vendor', v2: 'Yes', v3: 'Yes', contact: 'N/A', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Exempt', restrictions: 'No Restrictions', preferredPartner: true, website: 'https://quickbooks.intuit.com' },
  { id: 2, name: 'Xero', status: 'Active Vendor', v2: 'Yes', v3: 'Yes', contact: 'N/A', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Exempt', restrictions: 'No Restrictions', preferredPartner: false, website: 'https://www.xero.com' },
  { id: 3, name: 'SanMar', status: 'Active Vendor', v2: 'No', v3: 'Yes', contact: '', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Exempt', restrictions: 'No Restrictions', preferredPartner: false, website: 'https://www.sanmar.com' },
  { id: 4, name: 'S&S Activewear', status: 'Active Vendor', v2: 'No', v3: 'Yes', contact: '', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Exempt', restrictions: 'No Restrictions', preferredPartner: false, website: 'https://www.ssactivewear.com' },
  { id: 5, name: 'Google', status: 'Active Vendor', v2: 'Yes', v3: 'Yes', contact: 'N/A', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Exempt', restrictions: 'No Restrictions', preferredPartner: false, website: 'https://about.google' },
  { id: 6, name: 'Microsoft', status: 'Active Vendor', v2: 'Yes', v3: 'Yes', contact: 'N/A', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Exempt', restrictions: 'No Restrictions', preferredPartner: true, website: 'https://www.microsoft.com' },
  { id: 7, name: 'Listen360', status: 'Active Vendor', v2: 'No', v3: 'Yes', contact: '', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'N/A', restrictions: 'Franchise', preferredPartner: false, website: 'https://www.listen360.com' },
  { id: 8, name: 'LoyaltyLoop', status: 'Active Vendor', v2: 'Yes', v3: 'Yes', contact: 'John DiPippo', email: 'jdipippo@loyaltyloop.com', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Rev Share', restrictions: 'No Restrictions', preferredPartner: true, website: 'https://loyaltyloop.com' },
  { id: 9, name: 'Nexio', status: 'Active Vendor', v2: 'Yes', v3: 'Yes', contact: 'Jenn Aaron', email: 'jaaron@nex.io', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Rev Share', restrictions: 'No Restrictions', preferredPartner: false, website: 'https://nex.io' },
  { id: 10, name: 'Fiserv (Australia)', status: 'Active Vendor', v2: 'Yes', v3: 'Yes', contact: 'Jade Nancarrow', email: 'jade.nancarrow@fiserv.com', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Rev Share', restrictions: 'Regional', preferredPartner: true, website: 'https://www.fiserv.com/en-au.html' },
  { id: 11, name: 'Fiserv (US)', status: 'Active Vendor', v2: 'Yes', v3: 'Yes', contact: 'Tana Greenfield', email: 'tana.greenfield@fiserv.com', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Rev Share', restrictions: 'Regional', preferredPartner: true, website: 'https://www.fiserv.com' },
  { id: 12, name: 'Stripe', status: 'Active Vendor', v2: 'No', v3: 'Yes', contact: '', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Rev Share', restrictions: 'Regional', preferredPartner: false, website: 'https://stripe.com' },
  { id: 13, name: 'Authorize.Net', status: 'Active Vendor', v2: 'Yes', v3: 'No', contact: '', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'Rev Share', restrictions: 'Franchise', preferredPartner: false, website: 'https://www.authorize.net' },
  { id: 14, name: 'EasyPost', status: 'Active Vendor', v2: 'No', v3: 'Yes', contact: 'Brian Hill', email: 'bhill@easypost.com', ndaOnFile: 'Yes', contractOnFile: 'Yes', pricing: 'Contract', restrictions: 'No Restrictions', preferredPartner: true, website: 'https://www.easypost.com' },
  { id: 15, name: 'TaxJar', status: 'Active Vendor', v2: 'Yes', v3: 'Yes', contact: '', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'N/A', restrictions: 'No Restrictions', website: 'https://www.taxjar.com' },
  { id: 16, name: 'Avalara', status: 'Active Vendor', v2: 'Yes', v3: 'Yes', contact: 'Adhya Sethuraman', email: 'adhya.sethuraman@avalara.com', ndaOnFile: 'No', contractOnFile: 'Yes', pricing: 'Rev Share', restrictions: 'No Restrictions', preferredPartner: true, website: 'https://www.avalara.com' },
  { id: 17, name: 'Zapier', status: 'Active Vendor', v2: 'Yes', v3: 'No', contact: '', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'N/A', restrictions: 'No Restrictions', preferredPartner: false, website: 'https://zapier.com' },
  { id: 18, name: 'XPS', status: 'Active Vendor', v2: 'Yes', v3: 'No', contact: '', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'N/A', restrictions: 'No Restrictions', preferredPartner: false, website: 'https://xpsship.com' },
  { id: 19, name: 'Four51', status: 'Active Vendor', v2: 'Yes', v3: 'No', contact: '', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'N/A', restrictions: 'No Restrictions', preferredPartner: false, website: 'https://www.four51.com' },
  { id: 20, name: 'XMPie', status: 'Active Vendor', v2: 'Yes', v3: 'No', contact: '', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'N/A', restrictions: 'No Restrictions', preferredPartner: false, website: 'https://www.xmpie.com' },
  { id: 21, name: 'Pressero', status: 'Active Vendor', v2: 'Yes', v3: 'No', contact: 'George Mixco', email: 'george.mixco@aleyant.com', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'N/A', restrictions: 'No Restrictions', preferredPartner: false, website: 'https://www.aleyant.com/pressero/' },
  { id: 22, name: 'The Sign Pack', status: 'Active Vendor', v2: 'Yes', v3: 'Yes', contact: '', email: '', ndaOnFile: 'No', contractOnFile: 'Yes', pricing: 'N/A', restrictions: 'No Restrictions', preferredPartner: false, website: 'https://www.thesignpack.com' },
  { id: 23, name: 'SalesHub', status: 'Active Vendor', v2: 'Yes', v3: 'No', contact: '', email: '', ndaOnFile: 'No', contractOnFile: 'No', pricing: 'N/A', restrictions: 'No Restrictions', preferredPartner: false },
  { id: 24, name: 'Gorilla Dash', status: 'Active Vendor', v2: 'Yes', v3: 'Yes', contact: 'Anthony Gherghetta', email: 'anthony@gorilladash.com', ndaOnFile: 'Yes', contractOnFile: 'Yes', pricing: 'Rev Share', restrictions: 'Franchise', preferredPartner: false, website: 'https://gorilladash.com' },
  { id: 25, name: 'Text Control', status: 'Active Vendor', v2: 'No', v3: 'Yes', contact: '', email: '', ndaOnFile: 'No', contractOnFile: 'Yes', pricing: 'Contract', restrictions: 'No Restrictions', preferredPartner: false, website: 'https://www.textcontrol.com' },
  { id: 26, name: 'Qrvey', status: 'Active Vendor', v2: 'No', v3: 'Yes', contact: 'Natan Cohen', email: 'natan@qrvey.com', ndaOnFile: 'Yes', contractOnFile: 'Yes', pricing: 'Contract', restrictions: 'No Restrictions', preferredPartner: false, website: 'https://www.qrvey.com' },
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

  /** POC: update vendor in place (in-memory only). */
  update(id: number, patch: Partial<Vendor>): void {
    const v = VENDORS.find(x => x.id === id);
    if (v) Object.assign(v, patch);
  }
}
