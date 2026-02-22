import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VendorService, Vendor } from '../../services/vendor.service';

@Component({
  selector: 'vendor-vendors',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="vendor-page">
      <nav class="vendor-breadcrumbs gutter-side" aria-label="Breadcrumb">
        <a routerLink="/vendors">Vendors</a>
      </nav>
      <div class="page-header-container gutter-side">
        <div class="vendor-page-header">
          <div class="vendor-page-title-row">
            <h1 class="vendor-page-title">Vendors</h1>
            <a routerLink="/vendors/new" class="vendor-btn-primary">+ Add Vendor</a>
          </div>
          <p class="vendor-page-subtitle">
            Manage your vendor relationships and contact information.
          </p>
        </div>
      </div>

      <div class="vendor-toolbar gutter-side">
        <div class="vendor-search-wrap">
          <span class="vendor-search-icon">🔍</span>
          <input
            type="text"
            class="vendor-search-input"
            placeholder="Search by name, contact, or email..."
            [(ngModel)]="searchQuery"
            (input)="filterVendors()"
          />
        </div>
        <div class="vendor-toolbar-actions">
          <select class="vendor-select" [(ngModel)]="statusFilter" (change)="filterVendors()">
            <option value="">All statuses</option>
            <option value="New Inquiry">New Inquiry</option>
            <option value="In Review">In Review</option>
            <option value="Active Vendor">Active Vendor</option>
            <option value="On Hold">On Hold</option>
            <option value="Declined">Declined</option>
            <option value="Inactive (Former Vendor)">Inactive (Former Vendor)</option>
          </select>
          <select class="vendor-select" [(ngModel)]="platformFilter" (change)="filterVendors()">
            <option value="">All CoreBridge</option>
            <option value="V2">V2 authorized</option>
            <option value="V3">V3 authorized</option>
          </select>
        </div>
      </div>

      <div class="vendor-table-wrap gutter-side">
        <table class="vendor-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>CoreBridge</th>
              <th>Contact</th>
              <th>Email</th>
              <th>On file</th>
              <th>Pricing</th>
              <th>Restrictions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let vendor of filteredVendors" class="vendor-table-row">
              <td>
                <div class="vendor-name-cell">
                  <strong>{{ vendor.name }}</strong>
                </div>
              </td>
              <td>
                <span class="vendor-status-badge" [class.vendor-status-active]="vendor.status === 'Active Vendor'"
                  [class.vendor-status-inactive]="vendor.status === 'Inactive (Former Vendor)'"
                  [class.vendor-status-declined]="vendor.status === 'Declined'"
                  [class.vendor-status-hold]="vendor.status === 'On Hold'"
                  [class.vendor-status-review]="vendor.status === 'In Review'"
                  [class.vendor-status-inquiry]="vendor.status === 'New Inquiry'">
                  {{ vendor.status }}
                </span>
              </td>
              <td>
                <div class="vendor-platform-badges">
                  <span class="vendor-platform-badge" [class.vendor-badge-yes]="vendor.v2 === 'Yes'" [class.vendor-badge-no]="vendor.v2 === 'No'" [class.vendor-badge-pending]="vendor.v2 === 'Pending'" title="V2: {{ vendor.v2 }}">V2</span>
                  <span class="vendor-platform-badge" [class.vendor-badge-yes]="vendor.v3 === 'Yes'" [class.vendor-badge-no]="vendor.v3 === 'No'" [class.vendor-badge-pending]="vendor.v3 === 'Pending'" title="V3: {{ vendor.v3 }}">V3</span>
                </div>
              </td>
              <td>{{ vendor.contact || '—' }}</td>
              <td>{{ vendor.email || '—' }}</td>
              <td>
                <div class="vendor-platform-badges">
                  <span class="vendor-platform-badge" [class.vendor-badge-yes]="vendor.ndaOnFile === 'Yes'" [class.vendor-badge-no]="vendor.ndaOnFile === 'No'" title="NDA: {{ vendor.ndaOnFile }}">NDA</span>
                  <span class="vendor-platform-badge" [class.vendor-badge-yes]="vendor.contractOnFile === 'Yes'" [class.vendor-badge-no]="vendor.contractOnFile === 'No'" title="Contract: {{ vendor.contractOnFile }}">Contract</span>
                </div>
              </td>
              <td>
                <span *ngIf="vendor.pricing === 'N/A' || vendor.pricing === 'Unknown'">—</span>
                <span *ngIf="vendor.pricing !== 'N/A' && vendor.pricing !== 'Unknown'" class="vendor-pricing-badge"
                  [class.vendor-pricing-revshare]="vendor.pricing === 'Rev Share'"
                  [class.vendor-pricing-monthly]="vendor.pricing === 'Monthly API'"
                  [class.vendor-pricing-exempt]="vendor.pricing === 'Exempt' || vendor.pricing === 'Exempt or N/A'"
                  [class.vendor-pricing-contract]="vendor.pricing === 'Contract'">
                  {{ vendor.pricing }}
                </span>
              </td>
              <td>
                <span *ngIf="vendor.restrictions === 'No Restrictions'">—</span>
                <span *ngIf="vendor.restrictions !== 'No Restrictions'" class="vendor-restrictions-badge"
                  [class.vendor-restrictions-franchise]="vendor.restrictions === 'Franchise'"
                  [class.vendor-restrictions-regional]="vendor.restrictions === 'Regional'">
                  {{ vendor.restrictions }}
                </span>
              </td>
              <td>
                <a [routerLink]="['/vendors', vendor.id]" class="vendor-btn-link">Edit</a>
              </td>
            </tr>
            <tr *ngIf="filteredVendors.length === 0">
              <td colspan="9" class="vendor-table-empty">
                No vendors found
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="vendor-table-footer gutter-side">
        Showing {{ filteredVendors.length }} of {{ vendors.length }} vendors
      </div>
    </div>
  `,
  styles: [`
    .vendor-page-header {
      margin-bottom: 24px;
    }
    .vendor-page-title-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    .vendor-page-header h1,
    .vendor-page-title {
      margin: 0;
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
    .vendor-table-row {
      cursor: pointer;
    }
    .vendor-table-row:hover {
      background: #f5f5f5;
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
    .vendor-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }
    .vendor-badge-yes {
      background: #dcfce7;
      color: #166534;
    }
    .vendor-badge-no {
      background: #f1f5f9;
      color: #64748b;
    }
    .vendor-badge-pending {
      background: #fef3c7;
      color: #92400e;
    }
    .vendor-pricing-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }
    .vendor-pricing-revshare {
      background: #dbeafe;
      color: #1e40af;
    }
    .vendor-pricing-monthly {
      background: #e0e7ff;
      color: #3730a3;
    }
    .vendor-pricing-exempt {
      background: #f1f5f9;
      color: #475569;
    }
    .vendor-pricing-contract {
      background: #d1fae5;
      color: #065f46;
    }
    .vendor-pricing-unknown {
      background: #f1f5f9;
      color: #94a3b8;
    }
    .vendor-restrictions-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }
    .vendor-restrictions-franchise {
      background: #fef3c7;
      color: #92400e;
    }
    .vendor-restrictions-regional {
      background: #e0e7ff;
      color: #3730a3;
    }
    .vendor-status-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;
    }
    .vendor-status-active {
      background: #dcfce7;
      color: #166534;
    }
    .vendor-status-inactive {
      background: #f1f5f9;
      color: #64748b;
    }
    .vendor-status-declined {
      background: #fee2e2;
      color: #991b1b;
    }
    .vendor-status-hold {
      background: #fef3c7;
      color: #92400e;
    }
    .vendor-status-review {
      background: #dbeafe;
      color: #1e40af;
    }
    .vendor-status-inquiry {
      background: #e0e7ff;
      color: #3730a3;
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
    a.vendor-btn-primary {
      display: inline-block;
      text-decoration: none;
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
export class VendorsComponent {
  searchQuery = '';
  statusFilter = '';
  platformFilter = '';
  vendors: Vendor[] = [];
  filteredVendors: Vendor[] = [];

  constructor(private vendorService: VendorService) {}

  ngOnInit() {
    this.vendors = this.vendorService.getAll();
    this.filteredVendors = [...this.vendors].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    );
  }

  filterVendors() {
    const q = this.searchQuery.trim().toLowerCase();
    this.filteredVendors = this.vendors
      .filter(vendor => {
        const matchesSearch = !q ||
          vendor.name.toLowerCase().includes(q) ||
          (vendor.contact && vendor.contact.toLowerCase().includes(q)) ||
          (vendor.email && vendor.email.toLowerCase().includes(q));
        const matchesStatus = !this.statusFilter || vendor.status === this.statusFilter;
        const matchesPlatform =
          !this.platformFilter ||
          (this.platformFilter === 'V2' && vendor.v2 === 'Yes') ||
          (this.platformFilter === 'V3' && vendor.v3 === 'Yes');
        return matchesSearch && matchesStatus && matchesPlatform;
      })
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
  }
}

