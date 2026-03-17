import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IntegrationService, Integration, IntegrationCustomer } from '../../services/integration.service';

@Component({
  selector: 'vendor-integration-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="vendor-page vendor-detail-page">
      <nav class="vendor-breadcrumbs gutter-side" aria-label="Breadcrumb">
        <a routerLink="/integrations">Integrations</a>
        <span class="vendor-breadcrumbs-sep" *ngIf="!notFound">›</span>
        <span class="vendor-breadcrumbs-current" *ngIf="!notFound">{{ isNew ? 'New integration' : (form.name || 'Integration') }}</span>
        <span class="vendor-breadcrumbs-current" *ngIf="notFound">Not found</span>
      </nav>

      <div class="vendor-detail-not-found gutter-side" *ngIf="notFound">
        <p>Integration not found.</p>
        <a routerLink="/integrations" class="vendor-btn-primary">Back to Integrations</a>
      </div>

      <form *ngIf="!notFound" (ngSubmit)="onSave()" class="vendor-detail-layout">
        <!-- Left column: Overview -->
        <aside class="vendor-detail-sidebar">
          <div class="vendor-detail-card">
            <div class="vendor-overview">
              <div class="vendor-overview-head">
                <div class="vendor-name-row">
                  <span class="vendor-name-display">{{ form.name || 'Integration name' }}</span>
                  <button type="button" class="vendor-name-edit-btn" aria-label="Edit integration" (click)="showEditModal = true" *ngIf="!isNew">✎</button>
                </div>
                <p class="vendor-integration-meta" *ngIf="form.vendor">{{ form.vendor }}<span *ngIf="form.category"> · {{ form.category }}</span></p>
                <div class="vendor-platform-badges vendor-overview-badges">
                  <span class="vendor-status-badge" [class.vendor-status-live]="form.implementationStatus === 'Live'" [class.vendor-status-in-progress]="form.implementationStatus === 'In progress'" [class.vendor-status-planned]="form.implementationStatus === 'Planned'" [class.vendor-status-none]="form.implementationStatus === '—'" role="status">{{ form.implementationStatus }}</span>
                  <span class="vendor-platform-badge" [class.vendor-badge-yes]="form.v2" [class.vendor-badge-no]="!form.v2" title="V2">V2</span>
                  <span class="vendor-platform-badge" [class.vendor-badge-yes]="form.v3" [class.vendor-badge-no]="!form.v3" title="V3">V3</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Right column: Details + Customers -->
        <main class="vendor-detail-main">
          <div class="vendor-detail-card">
            <div class="vendor-card-heading-row">
              <h3 class="vendor-card-heading">Integration Details</h3>
              <button type="button" class="vendor-name-edit-btn" aria-label="Edit integration" (click)="showEditModal = true" *ngIf="!isNew">✎</button>
            </div>
            <dl class="vendor-pricing-dl">
              <dt>Vendor</dt>
              <dd>{{ form.vendor || '—' }}</dd>
              <dt>Category</dt>
              <dd>{{ form.category || '—' }}</dd>
              <dt>Implementation status</dt>
              <dd>{{ form.implementationStatus }}</dd>
              <dt>Implemented by</dt>
              <dd>{{ form.implementedBy || '—' }}</dd>
              <dt>CoreBridge</dt>
              <dd>
                <span class="vendor-platform-badges">
                  <span class="vendor-platform-badge" [class.vendor-badge-yes]="form.v2" [class.vendor-badge-no]="!form.v2">V2</span>
                  <span class="vendor-platform-badge" [class.vendor-badge-yes]="form.v3" [class.vendor-badge-no]="!form.v3">V3</span>
                </span>
              </dd>
            </dl>
          </div>

          <div class="vendor-detail-card vendor-card-integrations">
            <h3 class="vendor-card-heading">Customers attached to this integration</h3>
            <div class="vendor-integrations-list" *ngIf="attachedCustomers.length > 0">
              <table class="vendor-mini-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Type</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let c of attachedCustomers">
                    <td>{{ c.name }}</td>
                    <td>{{ c.type || '—' }}</td>
                    <td><span class="vendor-status-dot">{{ c.status || '—' }}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="vendor-card-empty" *ngIf="attachedCustomers.length === 0">No customers attached to this integration</p>
          </div>

          <div class="vendor-detail-actions">
            <button type="submit" class="vendor-btn-primary">Save</button>
            <a routerLink="/integrations" class="vendor-btn-ghost">Back to Integrations</a>
          </div>
        </main>
      </form>

      <!-- Edit Integration modal -->
      <div class="vendor-modal-backdrop" *ngIf="showEditModal" (click)="showEditModal = false" role="presentation"></div>
      <div class="vendor-modal-wrap" *ngIf="showEditModal" role="dialog" aria-labelledby="edit-integration-title">
        <div class="vendor-modal" (click)="$event.stopPropagation()">
          <div class="vendor-modal-header vendor-modal-header-tint">
            <h2 id="edit-integration-title" class="vendor-modal-title">Edit Integration</h2>
            <button type="button" class="vendor-modal-close" aria-label="Close" (click)="showEditModal = false">×</button>
          </div>
          <div class="vendor-modal-body">
            <div class="vendor-modal-card vendor-modal-card-full">
              <h3 class="vendor-modal-card-heading">Details</h3>
              <p class="vendor-modal-hint" style="margin-bottom: 12px;">Changes are not persisted in this POC.</p>
              <div class="vendor-modal-field">
                <label class="vendor-modal-label">Integration Name <span class="vendor-required">*</span></label>
                <input type="text" class="vendor-modal-input" [(ngModel)]="form.name" name="modalName" placeholder="Integration name" />
              </div>
              <div class="vendor-modal-row">
                <div class="vendor-modal-field">
                  <label class="vendor-modal-label">Vendor</label>
                  <input type="text" class="vendor-modal-input" [(ngModel)]="form.vendor" name="modalVendor" placeholder="Vendor name" />
                </div>
                <div class="vendor-modal-field">
                  <label class="vendor-modal-label">Category</label>
                  <input type="text" class="vendor-modal-input" [(ngModel)]="form.category" name="modalCategory" placeholder="Category" />
                </div>
              </div>
              <div class="vendor-modal-row">
                <div class="vendor-modal-field">
                  <label class="vendor-modal-label">Implementation status</label>
                  <select class="vendor-modal-select" [(ngModel)]="form.implementationStatus" name="modalStatus">
                    <option value="—">—</option>
                    <option value="Live">Live</option>
                    <option value="In progress">In progress</option>
                    <option value="Planned">Planned</option>
                  </select>
                </div>
                <div class="vendor-modal-field">
                  <label class="vendor-modal-label">Implemented by</label>
                  <input type="text" class="vendor-modal-input" [(ngModel)]="form.implementedBy" name="modalImplementedBy" placeholder="Name or team" />
                </div>
              </div>
              <div class="vendor-modal-field">
                <label class="vendor-modal-label">CoreBridge</label>
                <div class="vendor-pill-group" role="group">
                  <label class="vendor-checkbox-inline"><input type="checkbox" [(ngModel)]="form.v2" name="modalV2" /> V2</label>
                  <label class="vendor-checkbox-inline"><input type="checkbox" [(ngModel)]="form.v3" name="modalV3" /> V3</label>
                </div>
              </div>
            </div>
            <div class="vendor-modal-footer">
              <button type="button" class="vendor-btn-primary" (click)="showEditModal = false">Save</button>
              <button type="button" class="vendor-btn-ghost" (click)="showEditModal = false">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { --vendor-panel-border: #E2E8F0; --vendor-text-muted: #64748b; --vendor-text-body: #334155; --vendor-bg-subtle: #f8fafc; --vendor-primary: #1976d2; }
    .vendor-detail-page { max-width: none; padding: 16px 20px; }
    .vendor-detail-not-found { padding: 24px 0; }
    .vendor-detail-not-found p { margin: 0 0 16px 0; color: var(--vendor-text-muted); }

    .vendor-detail-layout { display: grid; grid-template-columns: minmax(280px, 1fr) minmax(0, 2fr); gap: 24px; align-items: start; }
    @media (max-width: 900px) { .vendor-detail-layout { grid-template-columns: 1fr; } }

    .vendor-detail-sidebar { position: static; }
    @media (min-width: 901px) { .vendor-detail-sidebar { position: sticky; top: 16px; } }
    .vendor-detail-card { background: #fff; border: 1px solid var(--vendor-panel-border); border-radius: 8px; padding: 20px; margin-bottom: 16px; }

    .vendor-overview-head { min-width: 0; }
    .vendor-name-row { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
    .vendor-name-display { font-size: 1.125rem; font-weight: 700; color: #333; }
    .vendor-name-edit-btn { background: none; border: none; padding: 4px 8px; color: var(--vendor-text-muted); font-size: 14px; cursor: pointer; }
    .vendor-name-edit-btn:hover { color: var(--vendor-primary); }
    .vendor-integration-meta { margin: 0 0 12px 0; font-size: 14px; color: var(--vendor-text-muted); }
    .vendor-overview-badges { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
    .vendor-platform-badges { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
    .vendor-platform-badge, .vendor-status-badge { min-height: 26px; display: inline-flex; align-items: center; justify-content: center; padding: 0 10px; box-sizing: border-box; font-size: 11px; font-weight: 600; letter-spacing: 0.02em; border-radius: 4px; }
    .vendor-badge-yes { background: #dcfce7; color: #166534; }
    .vendor-badge-no { background: #f1f5f9; color: #94a3b8; }
    .vendor-status-badge { font-size: 12px; font-weight: 500; }
    .vendor-status-badge.vendor-status-live { background: #dcfce7; color: #166534; }
    .vendor-status-badge.vendor-status-in-progress { background: #fef3c7; color: #92400e; }
    .vendor-status-badge.vendor-status-planned { background: #e0e7ff; color: #3730a3; }
    .vendor-status-badge.vendor-status-none { background: #f1f5f9; color: #94a3b8; }

    .vendor-detail-main { min-width: 0; }
    .vendor-card-heading { margin: 0 0 12px 0; font-size: 12px; font-weight: 600; color: var(--vendor-text-muted); text-transform: uppercase; letter-spacing: 0.02em; }
    .vendor-card-heading-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
    .vendor-card-heading-row .vendor-card-heading { margin: 0; }
    .vendor-pricing-dl { margin: 0; font-size: 14px; }
    .vendor-pricing-dl dt { margin: 8px 0 2px 0; font-weight: 500; color: var(--vendor-text-muted); font-size: 12px; text-transform: uppercase; letter-spacing: 0.02em; }
    .vendor-pricing-dl dd { margin: 0 0 4px 0; color: var(--vendor-text-body); }
    .vendor-card-empty { margin: 0; font-size: 14px; color: var(--vendor-text-muted); }
    .vendor-card-integrations { min-height: 120px; }
    .vendor-integrations-list { overflow-x: auto; }
    .vendor-mini-table { width: 100%; border-collapse: collapse; font-size: 14px; }
    .vendor-mini-table th, .vendor-mini-table td { text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--vendor-panel-border); }
    .vendor-mini-table th { font-weight: 600; color: var(--vendor-text-muted); font-size: 12px; text-transform: uppercase; }
    .vendor-status-dot { font-size: 13px; color: var(--vendor-text-body); }

    .vendor-detail-actions { display: flex; align-items: center; gap: 12px; padding-top: 8px; }
    .vendor-btn-primary { padding: 8px 16px; background: #1976d2; color: #fff; border: none; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; }
    .vendor-btn-primary:hover { background: #1565c0; }
    .vendor-btn-ghost { padding: 8px 16px; color: #64748b; border: 1px solid var(--vendor-panel-border); border-radius: 6px; font-size: 14px; text-decoration: none; }
    .vendor-btn-ghost:hover { background: #f8fafc; }

    .vendor-modal-backdrop { position: fixed; inset: 0; background: rgba(66, 66, 66, 0.7); z-index: 1000; }
    .vendor-modal-wrap { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 1001; padding: 24px; box-sizing: border-box; }
    .vendor-modal { display: flex; flex-direction: column; pointer-events: auto; width: 90vw; max-width: 560px; z-index: 1002; background: #fff; border-radius: 6px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5); border: 1px solid rgba(0, 0, 0, 0.2); max-height: 90vh; overflow: auto; }
    .vendor-modal-header { display: flex; align-items: center; justify-content: space-between; padding: 24px 24px 15px; border-bottom: 1px solid var(--vendor-panel-border); }
    .vendor-modal-header-tint { background: #e2e8f0; }
    .vendor-modal-title { margin: 0; font-size: 1.25rem; font-weight: 600; color: #333; }
    .vendor-modal-close { background: none; border: none; font-size: 24px; line-height: 1; color: var(--vendor-text-muted); cursor: pointer; padding: 0 4px; }
    .vendor-modal-close:hover { color: #333; }
    .vendor-modal-body { padding: 24px; }
    .vendor-modal-card { border: 1px solid var(--vendor-panel-border); border-radius: 6px; overflow: hidden; background: var(--vendor-bg-subtle); }
    .vendor-modal-card-full { margin-bottom: 0; }
    .vendor-modal-card-heading { margin: 0; padding: 12px 20px; font-size: 14px; font-weight: 600; color: #334155; background: #e2e8f0; }
    .vendor-modal-card > .vendor-modal-field, .vendor-modal-card > .vendor-modal-row { padding: 16px 20px; }
    .vendor-modal-field { margin-bottom: 16px; }
    .vendor-modal-field:last-child { margin-bottom: 0; }
    .vendor-modal-label { display: block; margin-bottom: 6px; font-size: 14px; font-weight: 500; color: var(--vendor-text-body); }
    .vendor-required { color: #b91c1c; }
    .vendor-modal-input, .vendor-modal-select { width: 100%; padding: 8px 12px; border: 1px solid var(--vendor-panel-border); border-radius: 4px; font-size: 14px; background: #fff; box-sizing: border-box; }
    .vendor-modal-hint { font-size: 12px; color: var(--vendor-text-muted); }
    .vendor-modal-footer { display: flex; align-items: center; gap: 12px; padding: 16px 24px; border-top: 1px solid var(--vendor-panel-border); background: var(--vendor-bg-subtle); }
    .vendor-modal-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .vendor-pill-group { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
    .vendor-checkbox-inline { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; cursor: pointer; }
  `],
})
export class IntegrationDetailComponent {
  notFound = false;
  isNew = false;
  showEditModal = false;
  form: Integration = {
    id: 0,
    name: '',
    vendor: '',
    category: '',
    v2: false,
    v3: false,
    implementationStatus: '—',
    implementedBy: '',
  };

  constructor(
    private route: ActivatedRoute,
    private integrationService: IntegrationService,
  ) {}

  get attachedCustomers(): IntegrationCustomer[] {
    if (this.isNew || !this.form.id) return [];
    return this.integrationService.getCustomersByIntegrationId(this.form.id);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.isNew = id === 'new';
      if (this.isNew) {
        this.notFound = false;
        this.form = {
          id: 0,
          name: '',
          vendor: '',
          category: '',
          v2: false,
          v3: false,
          implementationStatus: '—',
          implementedBy: '',
        };
      } else {
        this.isNew = false;
        const integration = id ? this.integrationService.getById(id) : null;
        this.notFound = !integration;
        if (integration) {
          this.form = { ...integration };
        }
      }
    });
  }

  onSave() {
    // POC: no persistence
    this.showEditModal = false;
  }
}
