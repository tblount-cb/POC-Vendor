import { Injectable } from '@angular/core';

export interface Integration {
  id: number;
  name: string;
  vendor: string;
  category: string;
  v2: boolean;
  v3: boolean;
  implementationStatus: 'Live' | 'In progress' | 'Planned' | '—';
  implementedBy: string;
}

/** Customer attached to an integration (POC: in-memory) */
export interface IntegrationCustomer {
  name: string;
  type?: string;
  status?: string;
}

/** Mock: integration id -> customers attached (POC data) */
const INTEGRATION_CUSTOMERS: Record<number, IntegrationCustomer[]> = {
  1: [{ name: 'Acme Print Co', type: 'Franchise', status: 'Active' }, { name: 'Signs Plus', type: 'Franchise', status: 'Active' }],
  2: [{ name: 'Metro Signs', type: 'Franchise', status: 'Active' }],
  5: [{ name: 'Acme Print Co', type: 'Franchise', status: 'Active' }, { name: 'Ink & Toner Direct', type: 'Enterprise', status: 'Active' }],
  7: [{ name: 'Signs Plus', type: 'Franchise', status: 'Active' }],
  13: [{ name: 'PayFlow Inc', type: 'Enterprise', status: 'Active' }],
};

const INTEGRATIONS: Integration[] = [
  { id: 1, name: 'QuickBooks Online Summary Sync', vendor: 'QuickBooks', category: 'Accounting Sync', v2: true, v3: true, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 2, name: 'Xero Summary Sync', vendor: 'Xero', category: 'Accounting Sync', v2: true, v3: true, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 3, name: 'Xero Detail Sync', vendor: 'Xero', category: 'Accounting Sync', v2: true, v3: true, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 4, name: 'QuickBooks Online Detail Sync', vendor: 'QuickBooks', category: 'Accounting Sync', v2: true, v3: true, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 5, name: 'Avalara', vendor: 'Avalara', category: 'Tax Lookup', v2: true, v3: true, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 6, name: 'TaxJar', vendor: 'TaxJar', category: 'Tax Lookup', v2: true, v3: true, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 7, name: 'LoyaltyLoop', vendor: 'LoyaltyLoop', category: 'CRM Tool', v2: true, v3: true, implementationStatus: '—', implementedBy: 'Vendor' },
  { id: 8, name: 'Zapier', vendor: 'Zapier', category: 'Automation', v2: true, v3: false, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 9, name: 'XPS (Shipping)', vendor: 'XPS', category: 'Shipping', v2: true, v3: false, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 10, name: 'Four51', vendor: 'Four51', category: 'Ecommerce', v2: true, v3: false, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 11, name: 'XMPie', vendor: 'XMPie', category: 'Marketing', v2: true, v3: false, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 12, name: 'Pressero', vendor: 'Pressero', category: 'Ecommerce', v2: true, v3: false, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 13, name: 'Nexio', vendor: 'Nexio', category: 'Integrated Payment', v2: true, v3: true, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 14, name: 'Fiserv (Australia)', vendor: 'Fiserv (Australia)', category: 'Integrated Payment', v2: true, v3: true, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 15, name: 'Fiserv (US)', vendor: 'Fiserv (US)', category: 'Integrated Payment', v2: true, v3: true, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 16, name: 'Authorize.Net', vendor: 'Authorize.Net', category: 'Integrated Payment', v2: true, v3: false, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 17, name: 'Stripe', vendor: 'Stripe', category: 'Integrated Payment', v2: true, v3: true, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 18, name: 'The Sign Pack', vendor: 'The Sign Pack', category: '', v2: true, v3: true, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 19, name: 'SalesHub', vendor: 'SalesHub', category: '', v2: true, v3: false, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 20, name: 'Gorilla Dash', vendor: 'Gorilla Dash', category: '', v2: true, v3: false, implementationStatus: '—', implementedBy: 'Vendor' },
  { id: 21, name: 'Text Control', vendor: 'Text Control', category: 'Reporting', v2: false, v3: true, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 22, name: 'Qrvey', vendor: 'Qrvey', category: 'Reporting', v2: false, v3: true, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 23, name: 'SanMar', vendor: 'SanMar', category: 'Apparel Vendor', v2: false, v3: true, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 24, name: 'S&S Activewear', vendor: 'S&S Activewear', category: 'Apparel Vendor', v2: false, v3: true, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 25, name: 'Google Calendar', vendor: 'Google', category: 'Calendar Sync', v2: false, v3: true, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 26, name: 'Microsoft Calendar', vendor: 'Microsoft', category: 'Calendar Sync', v2: false, v3: true, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 27, name: 'Listen360', vendor: 'Listen360', category: 'CRM Tool', v2: false, v3: true, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 28, name: 'Google Gmail', vendor: 'Google', category: 'Email', v2: false, v3: true, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 29, name: 'Microsoft Outlook', vendor: 'Microsoft', category: 'Email', v2: false, v3: true, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 30, name: 'CoreBridge Shipping (EasyPost)', vendor: 'EasyPost', category: 'Shipping Integration', v2: false, v3: true, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 31, name: 'CoreBridge Tax Lookup (TaxJar)', vendor: 'TaxJar', category: 'Tax Lookup', v2: false, v3: true, implementationStatus: '—', implementedBy: 'CoreBridge' },
  { id: 32, name: 'B2 Portal', vendor: 'B2 Portal', category: 'Portal', v2: true, v3: true, implementationStatus: '—', implementedBy: 'Vendor' },
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

  /** Customers attached to this integration (POC: mock data) */
  getCustomersByIntegrationId(integrationId: number): IntegrationCustomer[] {
    return INTEGRATION_CUSTOMERS[integrationId] ?? [];
  }
}
