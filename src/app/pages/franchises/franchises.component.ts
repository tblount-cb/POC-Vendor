import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Franchise {
  id: number;
  name: string;
  v2: boolean;
  v3: boolean;
  contact: string;
  email: string;
}

@Component({
  selector: 'vendor-franchises',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="vendor-page">
      <div class="vendor-page-header">
        <div class="vendor-page-title-row">
          <h1>Franchises</h1>
          <button class="vendor-btn-primary">+ Add Franchise</button>
        </div>
        <p class="vendor-page-subtitle">
          Manage franchise list for CoreBridge VIPER.
        </p>
      </div>

      <div class="vendor-toolbar">
        <div class="vendor-search-wrap">
          <span class="vendor-search-icon">🔍</span>
          <input
            type="text"
            class="vendor-search-input"
            placeholder="Search by name, contact, or email..."
            [(ngModel)]="searchQuery"
            (input)="filterFranchises()"
          />
        </div>
      </div>

      <div class="vendor-table-wrap">
        <table class="vendor-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>CoreBridge</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let franchise of filteredFranchises" class="vendor-table-row">
              <td>
                <div class="vendor-name-cell">
                  <strong>{{ franchise.name }}</strong>
                </div>
              </td>
              <td>
                <div class="vendor-platform-badges">
                  <span [class]="'vendor-platform-badge ' + (franchise.v2 ? 'vendor-badge-yes' : 'vendor-badge-no')" title="V2">V2</span>
                  <span [class]="'vendor-platform-badge ' + (franchise.v3 ? 'vendor-badge-yes' : 'vendor-badge-no')" title="V3">V3</span>
                </div>
              </td>
              <td>{{ franchise.contact || '—' }}</td>
              <td>{{ franchise.email || '—' }}</td>
              <td>
                <button class="vendor-btn-link">Edit</button>
              </td>
            </tr>
            <tr *ngIf="filteredFranchises.length === 0">
              <td colspan="5" class="vendor-table-empty">
                No franchises found
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="vendor-table-footer">
        Showing {{ filteredFranchises.length }} of {{ franchises.length }} franchises
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
    .vendor-badge-yes {
      background: #dcfce7;
      color: #166534;
    }
    .vendor-badge-no {
      background: #f1f5f9;
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
export class FranchisesComponent {
  searchQuery = '';

  franchises: Franchise[] = [
    { id: 1, name: 'Big Frog', v2: false, v3: true, contact: '', email: '' },
    { id: 2, name: 'Fastsigns', v2: true, v3: true, contact: '', email: '' },
    { id: 3, name: 'Sign*A*Rama', v2: true, v3: true, contact: '', email: '' },
    { id: 4, name: 'Signs Express', v2: false, v3: true, contact: '', email: '' },
    { id: 5, name: 'SignWorld', v2: true, v3: true, contact: '', email: '' },
    { id: 6, name: 'Speedpro CA', v2: true, v3: true, contact: '', email: '' },
    { id: 7, name: 'Speedpro US', v2: true, v3: true, contact: '', email: '' },
  ];

  filteredFranchises: Franchise[] = [...this.franchises].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
  );

  filterFranchises() {
    const q = this.searchQuery.trim().toLowerCase();
    this.filteredFranchises = this.franchises
      .filter(f =>
        !q ||
        f.name.toLowerCase().includes(q) ||
        (f.contact && f.contact.toLowerCase().includes(q)) ||
        (f.email && f.email.toLowerCase().includes(q))
      )
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
  }
}
