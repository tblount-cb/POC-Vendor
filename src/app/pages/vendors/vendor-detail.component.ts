import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VendorService, Vendor } from '../../services/vendor.service';
import { IntegrationService, Integration } from '../../services/integration.service';

type V2V3 = 'Yes' | 'No' | 'Pending';
type Pricing = Vendor['pricing'];
/** Form pricing includes empty string for the "—" dropdown option */
type PricingOption = Pricing | '';
type Restrictions = Vendor['restrictions'];
type VendorStatus = Vendor['status'];

@Component({
  selector: 'vendor-vendor-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="vendor-page vendor-detail-page">
      <nav class="vendor-breadcrumbs gutter-side" aria-label="Breadcrumb">
        <a routerLink="/vendors">Vendors</a>
        <span class="vendor-breadcrumbs-sep" *ngIf="!notFound">›</span>
        <span class="vendor-breadcrumbs-current" *ngIf="!notFound">{{ form.name || 'Vendor' }}</span>
        <span class="vendor-breadcrumbs-current" *ngIf="notFound">Not found</span>
      </nav>

      <div class="vendor-detail-not-found gutter-side" *ngIf="notFound">
        <p>Vendor not found.</p>
        <a routerLink="/vendors" class="vendor-btn-primary">Back to Vendors</a>
      </div>

      <form *ngIf="!notFound" (ngSubmit)="onSave()" class="vendor-detail-layout">
        <!-- Left column -->
        <aside class="vendor-detail-sidebar">
          <div class="vendor-detail-card">
            <!-- Vendor Overview -->
            <div class="vendor-overview">
              <div class="vendor-overview-head">
                <div class="vendor-name-row">
                  <span class="vendor-name-display">{{ form.name || 'Vendor name' }}</span>
                  <button type="button" class="vendor-name-edit-btn" aria-label="Edit vendor" (click)="showEditModal = true">✎</button>
                </div>
                <div class="vendor-platform-badges vendor-overview-badges">
                  <span class="vendor-status-badge" [class.vendor-status-active]="form.status === 'Active Vendor'" [class.vendor-status-inactive]="form.status === 'Inactive (Former Vendor)'" [class.vendor-status-declined]="form.status === 'Declined'" [class.vendor-status-hold]="form.status === 'On Hold'" [class.vendor-status-review]="form.status === 'In Review'" [class.vendor-status-inquiry]="form.status === 'New Inquiry'" role="status" aria-label="Vendor status">{{ form.status === 'Inactive (Former Vendor)' ? 'Inactive' : form.status }}</span>
                  <span class="vendor-pricing-badge" [class.vendor-pricing-revshare]="form.pricing === 'Rev Share'" [class.vendor-pricing-monthly]="form.pricing === 'Monthly API'" [class.vendor-pricing-exempt]="form.pricing === 'Exempt'" [class.vendor-pricing-contract]="form.pricing === 'Contract'" [class.vendor-pricing-unknown]="!form.pricing">{{ form.pricing || '—' }}</span>
                  <span class="vendor-restrictions-badge" [class.vendor-restrictions-franchise]="form.restrictions === 'Franchise'" [class.vendor-restrictions-regional]="form.restrictions === 'Regional'" *ngIf="form.restrictions !== 'No Restrictions'">{{ form.restrictions }}</span>
                  <span class="vendor-platform-badge" [class.vendor-badge-yes]="form.ndaOnFile === 'Yes'" [class.vendor-badge-no]="form.ndaOnFile === 'No'">NDA</span>
                  <span class="vendor-platform-badge" [class.vendor-badge-yes]="form.contractOnFile === 'Yes'" [class.vendor-badge-no]="form.contractOnFile === 'No'">Contract</span>
                </div>
                <div class="vendor-detail-badges-row">
                  <span class="vendor-settings-label-text">Authorization</span>
                  <div class="vendor-platform-badges">
                    <span class="vendor-platform-badge" [class.vendor-badge-yes]="form.v2 === 'Yes'" [class.vendor-badge-no]="form.v2 === 'No'" [class.vendor-badge-pending]="form.v2 === 'Pending'" title="V2">V2</span>
                    <span class="vendor-platform-badge" [class.vendor-badge-yes]="form.v3 === 'Yes'" [class.vendor-badge-no]="form.v3 === 'No'" [class.vendor-badge-pending]="form.v3 === 'Pending'" title="V3">V3</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contacts -->
            <section class="vendor-detail-section">
              <h3 class="vendor-detail-section-heading">Contacts</h3>
              <div class="vendor-contact-list">
                <div class="vendor-contact-block" *ngFor="let c of form.contacts; let i = index">
                  <div class="vendor-contact-entry">
                    <span class="vendor-contact-caret">›</span>
                    <div class="vendor-contact-info">
                      <span class="vendor-contact-name">{{ c.name || 'Contact name' }}</span>
                      <span class="vendor-contact-badges">
                        <span class="vendor-contact-badge vendor-contact-badge-primary" *ngIf="c.isPrimary">Primary</span>
                      </span>
                    </div>
                    <button type="button" class="vendor-contact-remove" aria-label="Remove contact" (click)="removeContact(i)" *ngIf="form.contacts.length > 1">×</button>
                  </div>
                  <input type="text" class="vendor-settings-input vendor-input-inline" [(ngModel)]="c.name" [name]="'contactName' + i" placeholder="Contact name" autocomplete="off" />
                  <input type="email" class="vendor-settings-input vendor-input-inline" [(ngModel)]="c.email" [name]="'contactEmail' + i" placeholder="email@example.com" autocomplete="off" />
                </div>
              </div>
              <button type="button" class="vendor-btn-add-contact" (click)="addContact()">+ Add Contact</button>
            </section>
          </div>
        </aside>

        <!-- Right column: Cards + Linked integrations -->
        <main class="vendor-detail-main">
          <div class="vendor-detail-cards">
            <div class="vendor-detail-card vendor-card-pricing">
              <div class="vendor-card-heading-row">
                <h3 class="vendor-card-heading">Pricing Details</h3>
                <button type="button" class="vendor-name-edit-btn" aria-label="Edit pricing" (click)="showEditModal = true">✎</button>
              </div>
              <dl class="vendor-pricing-dl">
                <dt>Onboarding</dt>
                <dd>{{ form.onboardingPackage || '—' }}</dd>
                <dt>Monthly API</dt>
                <dd>{{ form.monthlyApi || '—' }}</dd>
                <dt>Support Plan <span class="vendor-card-muted">(charged for Monthly API only)</span></dt>
                <dd>{{ form.supportPlan || '—' }}</dd>
                <dt>Sandbox Environment</dt>
                <dd>{{ form.sandboxEnvironment || '—' }}</dd>
              </dl>
            </div>
            <div class="vendor-detail-card vendor-card-revenue-share">
              <div class="vendor-card-heading-row">
                <h3 class="vendor-card-heading">Revenue Share Details</h3>
                <button type="button" class="vendor-name-edit-btn" aria-label="Edit revenue share" (click)="showEditModal = true">✎</button>
              </div>
              <dl class="vendor-pricing-dl">
                <ng-container *ngIf="form.revenueShareAnnually || form.revenueShareQuarterly || form.revenueShareMonthly || form.revenueShareTransactionally; else noRevenueShareTypes">
                  <dt *ngIf="form.revenueShareAnnually">Annually</dt>
                  <dd *ngIf="form.revenueShareAnnually">{{ form.revenueShareAmountAnnually || '—' }}</dd>
                  <dt *ngIf="form.revenueShareQuarterly">Quarterly</dt>
                  <dd *ngIf="form.revenueShareQuarterly">{{ form.revenueShareAmountQuarterly || '—' }}</dd>
                  <dt *ngIf="form.revenueShareMonthly">Monthly</dt>
                  <dd *ngIf="form.revenueShareMonthly">{{ form.revenueShareAmountMonthly || '—' }}</dd>
                  <dt *ngIf="form.revenueShareTransactionally">Transactionally</dt>
                  <dd *ngIf="form.revenueShareTransactionally">{{ form.revenueShareAmountTransactionally || '—' }}</dd>
                  <dt *ngIf="form.revenueShareRenewalDate">Renewal Date</dt>
                  <dd *ngIf="form.revenueShareRenewalDate">{{ form.revenueShareRenewalDate }}</dd>
                </ng-container>
                <ng-template #noRevenueShareTypes>
                  <dd class="vendor-card-empty">No revenue share details</dd>
                </ng-template>
              </dl>
            </div>
            <div class="vendor-detail-card vendor-card-contract">
              <div class="vendor-card-heading-row">
                <h3 class="vendor-card-heading">Contract Details</h3>
                <button type="button" class="vendor-name-edit-btn" aria-label="Edit contract" (click)="showEditModal = true">✎</button>
              </div>
              <dl class="vendor-pricing-dl">
                <ng-container *ngIf="form.contractAnnually || form.contractQuarterly || form.contractMonthly || form.contractTransactionally; else noContractTypes">
                  <dt *ngIf="form.contractAnnually">Annually</dt>
                  <dd *ngIf="form.contractAnnually">{{ form.contractAmountAnnually || '—' }}</dd>
                  <dt *ngIf="form.contractQuarterly">Quarterly</dt>
                  <dd *ngIf="form.contractQuarterly">{{ form.contractAmountQuarterly || '—' }}</dd>
                  <dt *ngIf="form.contractMonthly">Monthly</dt>
                  <dd *ngIf="form.contractMonthly">{{ form.contractAmountMonthly || '—' }}</dd>
                  <dt *ngIf="form.contractTransactionally">Transactionally</dt>
                  <dd *ngIf="form.contractTransactionally">{{ form.contractAmountTransactionally || '—' }}</dd>
                  <dt *ngIf="form.contractRenewalDate">Renewal Date</dt>
                  <dd *ngIf="form.contractRenewalDate">{{ form.contractRenewalDate }}</dd>
                </ng-container>
                <ng-template #noContractTypes>
                  <dd class="vendor-card-empty">No contract details</dd>
                </ng-template>
              </dl>
            </div>
          </div>

          <div class="vendor-detail-card vendor-card-integrations">
            <h3 class="vendor-card-heading">Linked Integrations</h3>
            <div class="vendor-integrations-list" *ngIf="linkedIntegrations.length > 0">
              <table class="vendor-mini-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Product</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let int of linkedIntegrations">
                    <td>{{ int.name }}</td>
                    <td>{{ int.product || '—' }}</td>
                    <td><span class="vendor-status-dot">{{ int.implementationStatus }}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="vendor-card-empty" *ngIf="linkedIntegrations.length === 0">No integrations found for this vendor</p>
          </div>
          <div class="vendor-detail-card vendor-card-open-tasks">
            <h3 class="vendor-card-heading">Open Tasks</h3>
            <p class="vendor-card-empty">No open tasks</p>
          </div>
        </main>
      </form>

      <!-- Edit Vendor modal (evo Edit Company style) -->
      <div class="vendor-modal-backdrop" *ngIf="showEditModal" (click)="showEditModal = false" role="presentation"></div>
      <div class="vendor-modal-wrap" *ngIf="showEditModal" role="dialog" aria-labelledby="edit-vendor-title">
        <div class="vendor-modal" (click)="$event.stopPropagation()">
          <div class="vendor-modal-header vendor-modal-header-tint">
            <h2 id="edit-vendor-title" class="vendor-modal-title">Edit Vendor</h2>
            <button type="button" class="vendor-modal-close" aria-label="Close" (click)="showEditModal = false">×</button>
          </div>
          <div class="vendor-modal-body">
            <div class="vendor-modal-grid">
              <div class="vendor-modal-card">
                <h3 class="vendor-modal-card-heading">Details</h3>
                <div class="vendor-modal-field">
                  <label class="vendor-modal-label">Vendor Name <span class="vendor-required">*</span></label>
                  <input type="text" class="vendor-modal-input" [(ngModel)]="form.name" name="modalName" placeholder="Vendor name" />
                </div>
              </div>
              <div class="vendor-modal-card">
                <h3 class="vendor-modal-card-heading">Authorization &amp; Status</h3>
                <div class="vendor-modal-field">
                  <label class="vendor-modal-label">Status</label>
                  <select class="vendor-modal-select" [(ngModel)]="form.status" name="modalStatus">
                    <option value="New Inquiry">New Inquiry</option>
                    <option value="In Review">In Review</option>
                    <option value="Active Vendor">Active Vendor</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Declined">Declined</option>
                    <option value="Inactive (Former Vendor)">Inactive (Former Vendor)</option>
                  </select>
                </div>
                <div class="vendor-modal-field">
                  <label class="vendor-modal-label">CoreBridge</label>
                  <div class="vendor-pill-group" role="group">
                    <button type="button" class="vendor-pill" [class.vendor-pill-active]="authMode === 'V2'" (click)="setAuth('V2')">V2 only</button>
                    <button type="button" class="vendor-pill" [class.vendor-pill-active]="authMode === 'V3'" (click)="setAuth('V3')">V3 only</button>
                    <button type="button" class="vendor-pill" [class.vendor-pill-active]="authMode === 'Both'" (click)="setAuth('Both')">V2 &amp; V3</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="vendor-modal-card vendor-modal-card-full">
              <h3 class="vendor-modal-card-heading">Documents &amp; Pricing</h3>
              <div class="vendor-modal-row">
                <div class="vendor-modal-field">
                  <label class="vendor-modal-label">NDA on file</label>
                  <div class="vendor-pill-group" role="group">
                    <button type="button" class="vendor-pill" [class.vendor-pill-active]="form.ndaOnFile === 'Yes'" (click)="form.ndaOnFile = 'Yes'">Yes</button>
                    <button type="button" class="vendor-pill" [class.vendor-pill-active]="form.ndaOnFile === 'No'" (click)="form.ndaOnFile = 'No'">No</button>
                  </div>
                </div>
                <div class="vendor-modal-field">
                  <label class="vendor-modal-label">Contract on file</label>
                  <div class="vendor-pill-group" role="group">
                    <button type="button" class="vendor-pill" [class.vendor-pill-active]="form.contractOnFile === 'Yes'" (click)="form.contractOnFile = 'Yes'">Yes</button>
                    <button type="button" class="vendor-pill" [class.vendor-pill-active]="form.contractOnFile === 'No'" (click)="form.contractOnFile = 'No'">No</button>
                  </div>
                </div>
              </div>
              <div class="vendor-modal-row">
                <div class="vendor-modal-field">
                  <label class="vendor-modal-label">Pricing</label>
                  <select class="vendor-modal-select" [(ngModel)]="form.pricing" name="modalPricing">
                    <option value="Rev Share">Revenue Share</option>
                    <option value="Monthly API">Monthly API</option>
                    <option value="Contract">Contract</option>
                    <option value="Exempt">Exempt</option>
                    <option value="">—</option>
                  </select>
                </div>
                <div class="vendor-modal-field">
                  <label class="vendor-modal-label">Restrictions</label>
                  <select class="vendor-modal-select" [(ngModel)]="form.restrictions" name="modalRestrictions">
                    <option value="No Restrictions">No restrictions</option>
                    <option value="Franchise">Franchise</option>
                    <option value="Regional">Regional</option>
                  </select>
                </div>
              </div>
              <div class="vendor-modal-row">
                <div class="vendor-modal-field">
                  <label class="vendor-modal-label">Support Plan</label>
                  <select class="vendor-modal-select" [(ngModel)]="form.supportPlan" name="modalSupportPlan">
                    <option value="">—</option>
                    <option value="Basic">Basic</option>
                    <option value="Essentials">Essentials</option>
                    <option value="Premium">Premium</option>
                    <option value="Waived">Waived</option>
                  </select>
                  <span class="vendor-modal-hint">Charged for Monthly API only.</span>
                </div>
                <div class="vendor-modal-field">
                  <label class="vendor-modal-label">Sandbox Environment</label>
                  <input type="text" class="vendor-modal-input" [(ngModel)]="form.sandboxEnvironment" name="modalSandbox" placeholder="e.g. URL or name" />
                </div>
              </div>
            </div>
            <div class="vendor-modal-sections">
              <div class="vendor-modal-card vendor-modal-card-full vendor-modal-section-card" *ngIf="form.pricing === 'Rev Share'">
                <h3 class="vendor-modal-card-heading">Revenue Share Details</h3>
                <div class="vendor-modal-row vendor-contract-types">
                  <div class="vendor-modal-field vendor-checkbox-field">
                    <label class="vendor-modal-label"><input type="checkbox" [(ngModel)]="form.revenueShareAnnually" name="revenueShareAnnually" /> Annually</label>
                    <input type="text" class="vendor-modal-input" [(ngModel)]="form.revenueShareAmountAnnually" name="revenueShareAmountAnnually" placeholder="Amount" *ngIf="form.revenueShareAnnually" />
                  </div>
                  <div class="vendor-modal-field vendor-checkbox-field">
                    <label class="vendor-modal-label"><input type="checkbox" [(ngModel)]="form.revenueShareQuarterly" name="revenueShareQuarterly" /> Quarterly</label>
                    <input type="text" class="vendor-modal-input" [(ngModel)]="form.revenueShareAmountQuarterly" name="revenueShareAmountQuarterly" placeholder="Amount" *ngIf="form.revenueShareQuarterly" />
                  </div>
                  <div class="vendor-modal-field vendor-checkbox-field">
                    <label class="vendor-modal-label"><input type="checkbox" [(ngModel)]="form.revenueShareMonthly" name="revenueShareMonthly" /> Monthly</label>
                    <input type="text" class="vendor-modal-input" [(ngModel)]="form.revenueShareAmountMonthly" name="revenueShareAmountMonthly" placeholder="Amount" *ngIf="form.revenueShareMonthly" />
                  </div>
                  <div class="vendor-modal-field vendor-checkbox-field">
                    <label class="vendor-modal-label"><input type="checkbox" [(ngModel)]="form.revenueShareTransactionally" name="revenueShareTransactionally" /> Transactionally</label>
                    <input type="text" class="vendor-modal-input" [(ngModel)]="form.revenueShareAmountTransactionally" name="revenueShareAmountTransactionally" placeholder="Amount" *ngIf="form.revenueShareTransactionally" />
                  </div>
                </div>
                <div class="vendor-modal-field">
                  <label class="vendor-modal-label">Renewal Date</label>
                  <input type="date" class="vendor-modal-input" [(ngModel)]="form.revenueShareRenewalDate" name="revenueShareRenewalDate" />
                </div>
              </div>
              <div class="vendor-modal-card vendor-modal-card-full vendor-modal-section-card" *ngIf="form.pricing === 'Monthly API'">
                <h3 class="vendor-modal-card-heading">Monthly API Details</h3>
                <div class="vendor-modal-row">
                  <div class="vendor-modal-field">
                    <label class="vendor-modal-label">Onboarding Package</label>
                    <select class="vendor-modal-select" [(ngModel)]="form.onboardingPackage" name="modalOnboarding">
                      <option value="">—</option>
                      <option value="Bronze">Bronze</option>
                      <option value="Silver">Silver</option>
                      <option value="Gold">Gold</option>
                      <option value="Waived">Waived</option>
                    </select>
                  </div>
                  <div class="vendor-modal-field">
                    <label class="vendor-modal-label">Monthly API</label>
                    <select class="vendor-modal-select" [(ngModel)]="form.monthlyApi" name="modalMonthlyApi">
                      <option value="">—</option>
                      <option value="Basic">Basic</option>
                      <option value="Professional">Professional</option>
                      <option value="Enterprise">Enterprise</option>
                      <option value="Waived">Waived</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="vendor-modal-card vendor-modal-card-full vendor-modal-section-card" *ngIf="form.pricing === 'Contract'">
                <h3 class="vendor-modal-card-heading">Contract Details</h3>
                <div class="vendor-modal-row vendor-contract-types">
                  <div class="vendor-modal-field vendor-checkbox-field">
                    <label class="vendor-modal-label"><input type="checkbox" [(ngModel)]="form.contractAnnually" name="contractAnnually" /> Annually</label>
                    <input type="text" class="vendor-modal-input" [(ngModel)]="form.contractAmountAnnually" name="contractAmountAnnually" placeholder="Amount" *ngIf="form.contractAnnually" />
                  </div>
                  <div class="vendor-modal-field vendor-checkbox-field">
                    <label class="vendor-modal-label"><input type="checkbox" [(ngModel)]="form.contractQuarterly" name="contractQuarterly" /> Quarterly</label>
                    <input type="text" class="vendor-modal-input" [(ngModel)]="form.contractAmountQuarterly" name="contractAmountQuarterly" placeholder="Amount" *ngIf="form.contractQuarterly" />
                  </div>
                  <div class="vendor-modal-field vendor-checkbox-field">
                    <label class="vendor-modal-label"><input type="checkbox" [(ngModel)]="form.contractMonthly" name="contractMonthly" /> Monthly</label>
                    <input type="text" class="vendor-modal-input" [(ngModel)]="form.contractAmountMonthly" name="contractAmountMonthly" placeholder="Amount" *ngIf="form.contractMonthly" />
                  </div>
                  <div class="vendor-modal-field vendor-checkbox-field">
                    <label class="vendor-modal-label"><input type="checkbox" [(ngModel)]="form.contractTransactionally" name="contractTransactionally" /> Transactionally</label>
                    <input type="text" class="vendor-modal-input" [(ngModel)]="form.contractAmountTransactionally" name="contractAmountTransactionally" placeholder="Amount" *ngIf="form.contractTransactionally" />
                  </div>
                </div>
                <div class="vendor-modal-field">
                  <label class="vendor-modal-label">Renewal Date</label>
                  <input type="date" class="vendor-modal-input" [(ngModel)]="form.contractRenewalDate" name="contractRenewalDate" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { --vendor-panel-border: #E2E8F0; --vendor-text-muted: #64748b; --vendor-text-body: #334155; --vendor-bg-subtle: #f8fafc; --vendor-focus-ring: #1976d2; --vendor-primary: #1976d2; }
    .vendor-detail-page { max-width: none; padding: 16px 20px; }
    .vendor-detail-not-found { padding: 24px 0; }
    .vendor-detail-not-found p { margin: 0 0 16px 0; color: var(--vendor-text-muted); }

    .vendor-detail-layout { display: grid; grid-template-columns: minmax(280px, 1fr) minmax(0, 2fr); gap: 24px; align-items: start; }
    @media (max-width: 900px) { .vendor-detail-layout { grid-template-columns: 1fr; } }

    .vendor-detail-sidebar { position: static; }
    @media (min-width: 901px) {
      .vendor-detail-sidebar { position: sticky; top: 16px; }
    }
    .vendor-detail-card { background: #fff; border: 1px solid var(--vendor-panel-border); border-radius: 8px; padding: 20px; margin-bottom: 16px; }

    .vendor-overview-head { min-width: 0; }
    .vendor-name-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
    .vendor-name-display { font-size: 1.125rem; font-weight: 700; color: #333; }
    .vendor-name-edit-btn { background: none; border: none; padding: 4px 8px; color: var(--vendor-text-muted); font-size: 14px; cursor: pointer; }
    .vendor-name-edit-btn:hover { color: var(--vendor-primary); }
    .vendor-overview-badges { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; align-items: center; }
    .vendor-platform-badges { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
    .vendor-platform-badge, .vendor-pricing-badge, .vendor-restrictions-badge, .vendor-status-badge { min-height: 26px; display: inline-flex; align-items: center; justify-content: center; padding: 0 10px; box-sizing: border-box; text-align: center; }
    .vendor-platform-badge { border-radius: 4px; font-size: 11px; font-weight: 600; letter-spacing: 0.02em; }
    .vendor-badge-yes { background: #dcfce7; color: #166534; }
    .vendor-badge-no { background: #f1f5f9; color: #64748b; }
    .vendor-badge-neutral { background: #f1f5f9; color: #475569; }
    .vendor-pricing-badge { border-radius: 4px; font-size: 12px; font-weight: 500; }
    .vendor-pricing-revshare { background: #dbeafe; color: #1e40af; }
    .vendor-pricing-monthly { background: #e0e7ff; color: #3730a3; }
    .vendor-pricing-exempt { background: #f1f5f9; color: #475569; }
    .vendor-pricing-contract { background: #d1fae5; color: #065f46; }
    .vendor-pricing-unknown { background: #f1f5f9; color: #94a3b8; }
    .vendor-restrictions-badge { border-radius: 4px; font-size: 12px; font-weight: 500; }
    .vendor-restrictions-franchise { background: #fef3c7; color: #92400e; }
    .vendor-restrictions-regional { background: #e0e7ff; color: #3730a3; }
    .vendor-status-badge { border-radius: 6px; font-size: 12px; font-weight: 500; white-space: nowrap; background: #f1f5f9; color: #475569; }
    .vendor-status-badge.vendor-status-active { background: #dcfce7; color: #166534; }
    .vendor-status-badge.vendor-status-inactive { background: #f1f5f9; color: #64748b; }
    .vendor-status-badge.vendor-status-declined { background: #fee2e2; color: #991b1b; }
    .vendor-status-badge.vendor-status-hold { background: #fef3c7; color: #92400e; }
    .vendor-status-badge.vendor-status-review { background: #dbeafe; color: #1e40af; }
    .vendor-status-badge.vendor-status-inquiry { background: #e0e7ff; color: #3730a3; }
    .vendor-badge-pending { background: #fef3c7; color: #92400e; }
    .vendor-detail-badges-row { margin-bottom: 12px; }
    .vendor-detail-badges-row .vendor-settings-label-text { margin-bottom: 4px; }
    .vendor-settings-field { margin-bottom: 12px; }
    .vendor-settings-field .vendor-settings-label-text { display: block; margin-bottom: 6px; font-size: 13px; font-weight: 500; color: var(--vendor-text-muted); }

    .vendor-detail-section { margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--vendor-panel-border); }
    .vendor-detail-section-heading { margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: var(--vendor-text-body); }
    .vendor-contact-entry { display: flex; align-items: center; gap: 8px; padding: 8px 0; }
    .vendor-contact-caret { color: var(--vendor-text-muted); font-size: 14px; }
    .vendor-contact-info { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; flex: 1; min-width: 0; }
    .vendor-contact-name { font-size: 14px; color: var(--vendor-text-body); }
    .vendor-contact-badges { display: flex; gap: 6px; }
    .vendor-contact-badge { font-size: 11px; padding: 2px 6px; border-radius: 4px; font-weight: 500; }
    .vendor-contact-badge-primary { background: #dbeafe; color: #1e40af; }
    .vendor-contact-list { margin-bottom: 12px; }
    .vendor-contact-block { margin-bottom: 16px; }
    .vendor-contact-block .vendor-input-inline { margin-top: 6px; }
    .vendor-contact-remove { background: none; border: none; padding: 4px 8px; font-size: 18px; color: var(--vendor-text-muted); cursor: pointer; margin-left: auto; }
    .vendor-contact-remove:hover { color: #b91c1c; }
    .vendor-btn-add-contact { width: 100%; padding: 8px 16px; background: transparent; color: #16a34a; border: 1px dashed #16a34a; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; }
    .vendor-btn-add-contact:hover { background: #f0fdf4; }
    .vendor-input-inline { width: 100%; max-width: 100%; margin-top: 8px; padding: 8px 12px; border: 1px solid var(--vendor-panel-border); border-radius: 4px; font-size: 14px; box-sizing: border-box; }
    .vendor-btn-add { width: 100%; padding: 10px 16px; background: #16a34a; color: #fff; border: none; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; }
    .vendor-btn-add:hover { background: #15803d; }
    .vendor-btn-primary { padding: 8px 16px; background: #1976d2; color: #fff; border: none; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; }
    .vendor-btn-primary:hover { background: #1565c0; }

    .vendor-detail-main { min-width: 0; }

    .vendor-detail-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
    @media (max-width: 900px) { .vendor-detail-cards { grid-template-columns: 1fr; } }
    .vendor-card-heading { margin: 0 0 12px 0; font-size: 12px; font-weight: 600; color: var(--vendor-text-muted); text-transform: uppercase; letter-spacing: 0.02em; }
    .vendor-card-heading-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
    .vendor-card-heading-row .vendor-card-heading { margin: 0; }
    .vendor-pricing-dl { margin: 0; font-size: 14px; }
    .vendor-pricing-dl dt { margin: 8px 0 2px 0; font-weight: 500; color: var(--vendor-text-muted); font-size: 12px; text-transform: uppercase; letter-spacing: 0.02em; }
    .vendor-pricing-dl dd { margin: 0 0 4px 0; color: var(--vendor-text-body); }
    .vendor-card-muted { font-weight: 400; color: var(--vendor-text-muted); font-size: 11px; }
    .vendor-card-amount { margin: 0; font-size: 1.5rem; font-weight: 700; color: var(--vendor-text-body); }
    .vendor-card-divider { border: none; height: 1px; background: var(--vendor-panel-border); margin: 12px 0; }
    .vendor-card-label { margin: 0 0 4px 0; font-size: 13px; color: var(--vendor-text-muted); }
    .vendor-card-empty { margin: 0; font-size: 14px; color: var(--vendor-text-muted); }
    .vendor-btn-ghost { margin-top: 12px; padding: 6px 12px; background: transparent; border: 1px solid var(--vendor-panel-border); border-radius: 4px; font-size: 13px; color: var(--vendor-text-body); cursor: pointer; }
    .vendor-btn-ghost:hover { background: var(--vendor-bg-subtle); }

    .vendor-card-integrations { min-height: 200px; }
    .vendor-integrations-list { overflow-x: auto; }
    .vendor-mini-table { width: 100%; border-collapse: collapse; font-size: 14px; }
    .vendor-mini-table th, .vendor-mini-table td { text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--vendor-panel-border); }
    .vendor-mini-table th { font-weight: 600; color: var(--vendor-text-muted); font-size: 12px; text-transform: uppercase; }
    .vendor-status-dot { font-size: 13px; color: var(--vendor-text-body); }

    .vendor-pill-group { display: inline-flex; flex-wrap: nowrap; gap: 0; border-radius: 8px; border: 1px solid var(--vendor-panel-border); padding: 2px; background: var(--vendor-bg-subtle); }
    .vendor-pill-group-wrap { flex-wrap: wrap; }
    .vendor-pill { padding: 6px 12px; font-size: 13px; font-weight: 500; color: var(--vendor-text-body); background: transparent; border: none; border-radius: 6px; cursor: pointer; transition: background 0.15s ease, color 0.15s ease; }
    .vendor-pill:hover { background: rgba(0, 0, 0, 0.04); }
    .vendor-pill-active { background: #fff !important; color: var(--vendor-primary); box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06); }

    .vendor-modal-backdrop { position: fixed; inset: 0; background: rgba(66, 66, 66, 0.7); z-index: 1000; }
    .vendor-modal-wrap { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 1001; padding: 24px; box-sizing: border-box; }
    .vendor-modal { display: flex; flex-direction: column; pointer-events: auto; width: 90vw; max-width: 800px; z-index: 1002; background: #fff; border-radius: 6px; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5); border: 1px solid rgba(0, 0, 0, 0.2); height: auto; max-height: 90vh; overflow: auto; }
    @media only screen and (max-width: 991px) {
      .vendor-modal-wrap { padding: 0; }
      .vendor-modal { width: 100vw !important; max-width: 100vw !important; height: 100vh !important; max-height: 100vh !important; margin: 0 !important; border-radius: 0 !important; }
    }
    .vendor-modal-header { display: flex; align-items: center; justify-content: space-between; padding: 24px 24px 15px; border-bottom: 1px solid var(--vendor-panel-border); }
    .vendor-modal-header-tint { background: #e2e8f0; }
    .vendor-modal-header-tint .vendor-modal-title { color: #334155; }
    .vendor-modal-header-tint .vendor-modal-close { color: #475569; }
    .vendor-modal-header-tint .vendor-modal-close:hover { color: #0f172a; }
    .vendor-modal-title { margin: 0; font-size: 1.25rem; font-weight: 600; color: #333; }
    .vendor-modal-close { background: none; border: none; font-size: 24px; line-height: 1; color: var(--vendor-text-muted); cursor: pointer; padding: 0 4px; }
    .vendor-modal-close:hover { color: #333; }
    .vendor-modal-body { padding: 24px; }
    .vendor-modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
    .vendor-modal-card { border: 1px solid var(--vendor-panel-border); border-radius: 6px; overflow: hidden; background: var(--vendor-bg-subtle); }
    .vendor-modal-card-full { grid-column: 1 / -1; }
    .vendor-modal-sections { margin-top: 20px; display: flex; flex-direction: column; gap: 20px; }
    .vendor-modal-section-card { margin: 0; }
    .vendor-modal-card-heading { margin: 0; padding: 12px 20px; font-size: 14px; font-weight: 600; color: #334155; background: #e2e8f0; }
    .vendor-modal-card > .vendor-modal-field,
    .vendor-modal-card > .vendor-modal-row { padding: 0 20px 16px 20px; }
    .vendor-modal-card > .vendor-modal-field:first-of-type,
    .vendor-modal-card > .vendor-modal-row:first-of-type { padding-top: 16px; }
    .vendor-modal-field { margin-bottom: 16px; }
    .vendor-modal-field:last-child { margin-bottom: 0; }
    .vendor-modal-label { display: block; margin-bottom: 6px; font-size: 14px; font-weight: 500; color: var(--vendor-text-body); }
    .vendor-modal-hint { display: block; margin-top: 4px; font-size: 12px; color: var(--vendor-text-muted); }
    .vendor-required { color: #b91c1c; }
    .vendor-modal-input, .vendor-modal-select { width: 100%; padding: 8px 12px; border: 1px solid var(--vendor-panel-border); border-radius: 4px; font-size: 14px; background: #fff; box-sizing: border-box; }
    .vendor-modal-select { cursor: pointer; }
    .vendor-modal-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .vendor-modal-row .vendor-modal-field { margin-bottom: 16px; }
    .vendor-contract-types { display: flex; flex-wrap: wrap; gap: 16px 24px; grid-template-columns: none; }
    .vendor-contract-types .vendor-checkbox-field { display: flex; flex-direction: column; gap: 6px; min-width: 140px; }
    .vendor-contract-types .vendor-modal-label { display: flex; align-items: center; gap: 8px; margin-bottom: 0; cursor: pointer; }
    .vendor-contract-types .vendor-modal-label input[type="checkbox"] { margin: 0; }
    .vendor-contract-types .vendor-modal-input { max-width: 120px; }
  `],
})
export class VendorDetailComponent {
  vendor: Vendor | null = null;
  isNew = false;
  notFound = false;
  showEditModal = false;

  readonly statusProgression: VendorStatus[] = [
    'New Inquiry',
    'In Review',
    'Active Vendor',
    'On Hold',
    'Declined',
    'Inactive (Former Vendor)',
  ];

  form = {
    name: '',
    status: 'New Inquiry' as VendorStatus,
    contacts: [] as { name: string; email: string; isPrimary: boolean }[],
    v2: 'Yes' as V2V3,
    v3: 'Yes' as V2V3,
    ndaOnFile: 'No' as 'Yes' | 'No',
    contractOnFile: 'No' as 'Yes' | 'No',
    pricing: '' as PricingOption,
    restrictions: 'No Restrictions' as Restrictions,
    onboardingPackage: '' as string,
    monthlyApi: '' as string,
    supportPlan: '' as string,
    sandboxEnvironment: '' as string,
    contractAnnually: false,
    contractQuarterly: false,
    contractMonthly: false,
    contractTransactionally: false,
    contractAmountAnnually: '' as string,
    contractAmountQuarterly: '' as string,
    contractAmountMonthly: '' as string,
    contractAmountTransactionally: '' as string,
    contractRenewalDate: '' as string,
    revenueShareAnnually: false,
    revenueShareQuarterly: false,
    revenueShareMonthly: false,
    revenueShareTransactionally: false,
    revenueShareAmountAnnually: '' as string,
    revenueShareAmountQuarterly: '' as string,
    revenueShareAmountMonthly: '' as string,
    revenueShareAmountTransactionally: '' as string,
    revenueShareRenewalDate: '' as string,
  };

  constructor(
    private route: ActivatedRoute,
    private vendorService: VendorService,
    private integrationService: IntegrationService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const lastSegment = this.route.snapshot.url[this.route.snapshot.url.length - 1]?.path;
      const isNewRoute = id === 'new' || lastSegment === 'new';
      if (isNewRoute) {
        this.isNew = true;
        this.vendor = null;
        this.notFound = false;
        this.resetForm();
      } else {
        this.isNew = false;
        this.vendor = id ? this.vendorService.getById(id) : null;
        this.notFound = !this.vendor;
        if (this.vendor) this.patchForm(this.vendor);
      }
    });
  }

  private resetForm() {
    this.form = {
      name: '',
      status: 'New Inquiry',
      contacts: [{ name: '', email: '', isPrimary: true }],
      v2: 'Yes',
      v3: 'Yes',
      ndaOnFile: 'No',
      contractOnFile: 'No',
      pricing: '' as PricingOption,
      restrictions: 'No Restrictions',
      onboardingPackage: '',
      monthlyApi: '',
      supportPlan: '',
      sandboxEnvironment: '',
      contractAnnually: false,
      contractQuarterly: false,
      contractMonthly: false,
      contractTransactionally: false,
      contractAmountAnnually: '',
      contractAmountQuarterly: '',
      contractAmountMonthly: '',
      contractAmountTransactionally: '',
      contractRenewalDate: '',
      revenueShareAnnually: false,
      revenueShareQuarterly: false,
      revenueShareMonthly: false,
      revenueShareTransactionally: false,
      revenueShareAmountAnnually: '',
      revenueShareAmountQuarterly: '',
      revenueShareAmountMonthly: '',
      revenueShareAmountTransactionally: '',
      revenueShareRenewalDate: '',
    };
  }

  private patchForm(v: Vendor) {
    this.form = {
      name: v.name,
      status: v.status,
      contacts: [{ name: v.contact ?? '', email: v.email ?? '', isPrimary: true }],
      v2: v.v2,
      v3: v.v3,
      ndaOnFile: v.ndaOnFile,
      contractOnFile: v.contractOnFile,
      pricing: v.pricing,
      restrictions: v.restrictions,
      onboardingPackage: '',
      monthlyApi: '',
      supportPlan: '',
      sandboxEnvironment: '',
      contractAnnually: false,
      contractQuarterly: false,
      contractMonthly: false,
      contractTransactionally: false,
      contractAmountAnnually: '',
      contractAmountQuarterly: '',
      contractAmountMonthly: '',
      contractAmountTransactionally: '',
      contractRenewalDate: '',
      revenueShareAnnually: false,
      revenueShareQuarterly: false,
      revenueShareMonthly: false,
      revenueShareTransactionally: false,
      revenueShareAmountAnnually: '',
      revenueShareAmountQuarterly: '',
      revenueShareAmountMonthly: '',
      revenueShareAmountTransactionally: '',
      revenueShareRenewalDate: '',
    };
  }

  addContact() {
    this.form.contacts.push({ name: '', email: '', isPrimary: false });
  }

  removeContact(index: number) {
    if (this.form.contacts.length <= 1) return;
    const wasPrimary = this.form.contacts[index].isPrimary;
    this.form.contacts.splice(index, 1);
    if (wasPrimary && this.form.contacts.length > 0) this.form.contacts[0].isPrimary = true;
  }

  get linkedIntegrations(): Integration[] {
    return this.integrationService.getByVendor(this.form.name);
  }

  /** Current authorization mode for pill display (V2 only, V3 only, or Both). */
  get authMode(): 'V2' | 'V3' | 'Both' {
    if (this.form.v2 === 'Yes' && this.form.v3 === 'Yes') return 'Both';
    if (this.form.v3 === 'Yes') return 'V3';
    return 'V2';
  }

  setAuth(mode: 'V2' | 'V3' | 'Both') {
    if (mode === 'Both') {
      this.form.v2 = 'Yes';
      this.form.v3 = 'Yes';
    } else if (mode === 'V3') {
      this.form.v2 = 'No';
      this.form.v3 = 'Yes';
    } else {
      this.form.v2 = 'Yes';
      this.form.v3 = 'No';
    }
  }

  onSave() {
    // POC: no persistence; could navigate back or show toast
  }
}
