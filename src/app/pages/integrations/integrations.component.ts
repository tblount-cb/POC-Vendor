import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Integration {
  id: number;
  name: string;
  vendor: string;
  product: string;
  v2: boolean;
  v3: boolean;
  implementationStatus: 'Live' | 'In progress' | 'Planned' | '—';
  implementedBy: string;
}

@Component({
  selector: 'vendor-integrations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="vendor-page">
      <div class="vendor-page-header">
        <div class="vendor-page-title-row">
          <h1>Integrations</h1>
          <button type="button" class="vendor-btn-primary">+ Add Integration</button>
        </div>
        <p class="vendor-page-subtitle">
          Details about each integration: vendor, product support, and implementation status.
        </p>
      </div>

      <div class="vendor-toolbar">
        <div class="vendor-search-wrap">
          <span class="vendor-search-icon">🔍</span>
          <input
            type="text"
            class="vendor-search-input"
            placeholder="Search by name, vendor, or product..."
            [(ngModel)]="searchQuery"
            (input)="filterIntegrations()"
          />
        </div>
        <div class="vendor-toolbar-actions">
          <select class="vendor-select" [(ngModel)]="platformFilter" (change)="filterIntegrations()">
            <option value="">All CoreBridge</option>
            <option value="V2">V2 only</option>
            <option value="V3">V3 only</option>
            <option value="Both">V2 & V3</option>
          </select>
        </div>
      </div>

      <div class="vendor-table-wrap">
        <table class="vendor-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Vendor</th>
              <th>Product</th>
              <th>CoreBridge</th>
              <th>Implementation status</th>
              <th>Implemented by</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let integration of filteredIntegrations" class="vendor-table-row">
              <td>
                <div class="vendor-name-cell">
                  <strong>{{ integration.name }}</strong>
                </div>
              </td>
              <td>{{ integration.vendor || '—' }}</td>
              <td>{{ integration.product || '—' }}</td>
              <td>
                <div class="vendor-platform-badges">
                  <span *ngIf="integration.v2" class="vendor-platform-badge vendor-badge-yes" title="V2">V2</span>
                  <span *ngIf="!integration.v2" class="vendor-platform-badge vendor-badge-no" title="V2">V2</span>
                  <span *ngIf="integration.v3" class="vendor-platform-badge vendor-badge-yes" title="V3">V3</span>
                  <span *ngIf="!integration.v3" class="vendor-platform-badge vendor-badge-no" title="V3">V3</span>
                </div>
              </td>
              <td>
                <span class="vendor-status-badge" [class.live]="integration.implementationStatus === 'Live'"
                  [class.in-progress]="integration.implementationStatus === 'In progress'"
                  [class.planned]="integration.implementationStatus === 'Planned'"
                  [class.none]="integration.implementationStatus === '—'">
                  {{ integration.implementationStatus }}
                </span>
              </td>
              <td>{{ integration.implementedBy || '—' }}</td>
              <td>
                <button type="button" class="vendor-btn-link">Edit</button>
              </td>
            </tr>
            <tr *ngIf="filteredIntegrations.length === 0">
              <td colspan="7" class="vendor-table-empty">
                No integrations found
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="vendor-table-footer">
        Showing {{ filteredIntegrations.length }} of {{ integrations.length }} integrations
      </div>
    </div>
  `,
  styles: [`
    .vendor-page {
      max-width: 1200px;
      margin: 0 auto;
      padding: 32px 24px;
      background: #fff;
      min-height: calc(100vh - 64px);
    }
    .vendor-page-header {
      margin-bottom: 24px;
    }
    .vendor-page-title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    .vendor-page-header h1 {
      margin: 0 0 8px 0;
      font-size: 1.875rem;
      font-weight: 700;
      color: #333;
    }
    .vendor-page-subtitle {
      margin: 0;
      color: #64748b;
      font-size: 14px;
      line-height: 1.64;
    }
    .vendor-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 16px;
      flex-wrap: wrap;
    }
    .vendor-search-wrap {
      display: flex;
      align-items: center;
      border: 1px solid #E2E8F0;
      border-radius: 6px;
      padding: 8px 12px;
      min-width: 200px;
      background: #fff;
    }
    .vendor-search-icon {
      margin-right: 8px;
      font-size: 14px;
      color: #666;
    }
    .vendor-search-input {
      border: none;
      outline: none;
      font-size: 14px;
      flex: 1;
      min-width: 0;
    }
    .vendor-toolbar-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .vendor-select {
      padding: 8px 12px;
      border: 1px solid #E2E8F0;
      border-radius: 6px;
      font-size: 14px;
      background: #fff;
      cursor: pointer;
    }
    .vendor-table-wrap {
      margin-top: 0;
    }
    .vendor-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
      margin-top: 16px;
    }
    .vendor-table thead tr {
      border-bottom: 1px solid #E2E8F0;
      background: #f8fafc;
    }
    .vendor-table th {
      text-align: left;
      padding: 10px 12px;
      font-weight: 600;
      color: #333;
    }
    .vendor-table td {
      padding: 12px;
      border-bottom: 1px solid #E2E8F0;
    }
    .vendor-table-row:hover {
      background: #f8fafc;
    }
    .vendor-name-cell {
      font-weight: 500;
    }
    .vendor-platform-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .vendor-platform-badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.02em;
    }
    .vendor-badge-yes {
      background: #dcfce7;
      color: #166534;
    }
    .vendor-badge-no {
      background: #f1f5f9;
      color: #94a3b8;
    }
    .vendor-status-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }
    .vendor-status-badge.live {
      background: #dcfce7;
      color: #166534;
    }
    .vendor-status-badge.in-progress {
      background: #fef3c7;
      color: #92400e;
    }
    .vendor-status-badge.planned {
      background: #e0e7ff;
      color: #3730a3;
    }
    .vendor-status-badge.none {
      background: transparent;
      color: #94a3b8;
    }
    .vendor-table-empty {
      text-align: center;
      color: #64748b;
      padding: 32px;
    }
    .vendor-table-footer {
      margin-top: 16px;
      font-size: 13px;
      color: #64748b;
    }
    .vendor-btn-primary {
      padding: 8px 16px;
      background: #1976d2;
      color: #fff;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
    }
    .vendor-btn-primary:hover {
      background: #1565c0;
    }
    .vendor-btn-link {
      padding: 4px 8px;
      background: none;
      color: #1976d2;
      border: none;
      font-size: 14px;
      cursor: pointer;
      text-decoration: underline;
    }
    .vendor-btn-link:hover {
      color: #1565c0;
    }
  `],
})
export class IntegrationsComponent {
  searchQuery = '';
  platformFilter = '';

  integrations: Integration[] = [
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
    { id: 14, name: 'Fiserv AUS', vendor: 'Fiserv AUS', product: 'Integrated Payment', v2: true, v3: true, implementationStatus: '—', implementedBy: '' },
    { id: 15, name: 'Fiserv US', vendor: 'Fiserv US', product: 'Integrated Payment', v2: true, v3: true, implementationStatus: '—', implementedBy: '' },
    { id: 16, name: 'Authorized.NET', vendor: 'Authorized.NET', product: 'Integrated Payment', v2: true, v3: true, implementationStatus: '—', implementedBy: '' },
    { id: 17, name: 'Stripe', vendor: 'Stripe', product: 'Integrated Payment', v2: true, v3: true, implementationStatus: '—', implementedBy: '' },
    { id: 18, name: 'SignPack', vendor: 'SignPack', product: '', v2: true, v3: false, implementationStatus: '—', implementedBy: '' },
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

  filteredIntegrations: Integration[] = [...this.integrations].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
  );

  filterIntegrations() {
    const q = this.searchQuery.trim().toLowerCase();
    this.filteredIntegrations = this.integrations
      .filter(integration => {
        const matchesSearch = !q ||
          integration.name.toLowerCase().includes(q) ||
          integration.vendor.toLowerCase().includes(q) ||
          (integration.product && integration.product.toLowerCase().includes(q));
        const matchesPlatform =
          !this.platformFilter ||
          (this.platformFilter === 'V2' && integration.v2 && !integration.v3) ||
          (this.platformFilter === 'V3' && integration.v3 && !integration.v2) ||
          (this.platformFilter === 'Both' && integration.v2 && integration.v3);
        return matchesSearch && matchesPlatform;
      })
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
  }
}
