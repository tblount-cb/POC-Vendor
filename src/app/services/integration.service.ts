import { Injectable } from '@angular/core';

export interface Integration {
  id: number;
  name: string;
  vendor: string;
  product: string;
  v2: boolean;
  v3: boolean;
  implementationStatus: 'Live' | 'In progress' | 'Planned' | '—';
  implementedBy: string;
}

const INTEGRATIONS: Integration[] = [
  { id: 1, name: 'QuickBooks Online Summary Sync', vendor: 'QuickBooks', product: 'Accounting Sync', v2: true, v3: true, implementationStatus: '—', implementedBy: '' },
  { id: 2, name: 'Xero Summary Sync', vendor: 'Xero', product: 'Accounting Sync', v2: true, v3: true, implementationStatus: '—', implementedBy: '' },
  { id: 3, name: 'Xero Detail Sync', vendor: 'Xero', product: 'Accounting Sync', v2: true, v3: true, implementationStatus: '—', implementedBy: '' },
  { id: 4, name: 'QuickBooks Online Detail Sync', vendor: 'QuickBooks', product: 'Accounting Sync', v2: true, v3: true, implementationStatus: '—', implementedBy: '' },
  { id: 5, name: 'Avalara', vendor: 'Avalara', product: 'Tax Lookup', v2: true, v3: true, implementationStatus: '—', implementedBy: '' },
  { id: 6, name: 'TaxJar', vendor: 'TaxJar', product: 'Tax Lookup', v2: true, v3: true, implementationStatus: '—', implementedBy: '' },
  { id: 7, name: 'LoyaltyLoop', vendor: 'LoyaltyLoop', product: 'CRM Tool', v2: true, v3: true, implementationStatus: '—', implementedBy: '' },
  { id: 8, name: 'Zapier', vendor: 'Zapier', product: 'Automation', v2: true, v3: false, implementationStatus: '—', implementedBy: '' },
  { id: 9, name: 'XPS (Shipping)', vendor: 'XPS', product: 'Shipping', v2: true, v3: false, implementationStatus: '—', implementedBy: '' },
  { id: 10, name: 'Four51', vendor: 'Four51', product: 'Ecommerce', v2: true, v3: false, implementationStatus: '—', implementedBy: '' },
  { id: 11, name: 'XMPie', vendor: 'XMPie', product: 'Marketing', v2: true, v3: false, implementationStatus: '—', implementedBy: '' },
  { id: 12, name: 'Pressero', vendor: 'Pressero', product: 'Ecommerce', v2: true, v3: false, implementationStatus: '—', implementedBy: '' },
  { id: 13, name: 'Nexio', vendor: 'Nexio', product: 'Integrated Payment', v2: true, v3: true, implementationStatus: '—', implementedBy: '' },
  { id: 14, name: 'Fiserv (Australia)', vendor: 'Fiserv (Australia)', product: 'Integrated Payment', v2: true, v3: true, implementationStatus: '—', implementedBy: '' },
  { id: 15, name: 'Fiserv (US)', vendor: 'Fiserv (US)', product: 'Integrated Payment', v2: true, v3: true, implementationStatus: '—', implementedBy: '' },
  { id: 16, name: 'Authorize.Net', vendor: 'Authorize.Net', product: 'Integrated Payment', v2: true, v3: false, implementationStatus: '—', implementedBy: '' },
  { id: 17, name: 'Stripe', vendor: 'Stripe', product: 'Integrated Payment', v2: true, v3: true, implementationStatus: '—', implementedBy: '' },
  { id: 18, name: 'The Sign Pack', vendor: 'The Sign Pack', product: '', v2: true, v3: true, implementationStatus: '—', implementedBy: '' },
  { id: 19, name: 'SalesHub', vendor: 'SalesHub', product: '', v2: true, v3: false, implementationStatus: '—', implementedBy: '' },
  { id: 20, name: 'Gorilla Dash', vendor: 'Gorilla Dash', product: '', v2: true, v3: false, implementationStatus: '—', implementedBy: '' },
  { id: 21, name: 'Text Control', vendor: 'Text Control', product: 'Reporting', v2: false, v3: true, implementationStatus: '—', implementedBy: '' },
  { id: 22, name: 'Qrvey', vendor: 'Qrvey', product: 'Reporting', v2: false, v3: true, implementationStatus: '—', implementedBy: '' },
  { id: 23, name: 'SanMar', vendor: 'SanMar', product: 'Apparel Vendor', v2: false, v3: true, implementationStatus: '—', implementedBy: '' },
  { id: 24, name: 'S&S Activewear', vendor: 'S&S Activewear', product: 'Apparel Vendor', v2: false, v3: true, implementationStatus: '—', implementedBy: '' },
  { id: 25, name: 'Google Calendar', vendor: 'Google', product: 'Calendar Sync', v2: false, v3: true, implementationStatus: '—', implementedBy: '' },
  { id: 26, name: 'Microsoft Calendar', vendor: 'Microsoft', product: 'Calendar Sync', v2: false, v3: true, implementationStatus: '—', implementedBy: '' },
  { id: 27, name: 'Listen360', vendor: 'Listen360', product: 'CRM Tool', v2: false, v3: true, implementationStatus: '—', implementedBy: '' },
  { id: 28, name: 'Google Gmail', vendor: 'Google', product: 'Email', v2: false, v3: true, implementationStatus: '—', implementedBy: '' },
  { id: 29, name: 'Microsoft Outlook', vendor: 'Microsoft', product: 'Email', v2: false, v3: true, implementationStatus: '—', implementedBy: '' },
  { id: 30, name: 'CoreBridge Shipping (EasyPost)', vendor: 'EasyPost', product: 'Shipping Integration', v2: false, v3: true, implementationStatus: '—', implementedBy: '' },
  { id: 31, name: 'CoreBridge Tax Lookup (TaxJar)', vendor: 'TaxJar', product: 'Tax Lookup', v2: false, v3: true, implementationStatus: '—', implementedBy: '' },
];

@Injectable({ providedIn: 'root' })
export class IntegrationService {
  getAll(): Integration[] {
    return [...INTEGRATIONS];
  }

  getById(id: string): Integration | null {
    if (id === 'new') return null;
    const numId = Number(id);
    if (Number.isNaN(numId)) return null;
    return INTEGRATIONS.find(i => i.id === numId) ?? null;
  }

  getByVendor(vendorName: string): Integration[] {
    if (!vendorName || !vendorName.trim()) return [];
    const name = vendorName.trim();
    return INTEGRATIONS.filter(i => i.vendor.toLowerCase() === name.toLowerCase());
  }
}
