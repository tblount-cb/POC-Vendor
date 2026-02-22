import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FranchiseService, Franchise } from '../../services/franchise.service';

@Component({
  selector: 'vendor-franchise-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="vendor-page vendor-detail-page">
      <nav class="vendor-breadcrumbs gutter-side" aria-label="Breadcrumb">
        <a routerLink="/franchises">Franchises</a>
        <span class="vendor-breadcrumbs-sep" *ngIf="!notFound">›</span>
        <span class="vendor-breadcrumbs-current" *ngIf="!notFound">{{ isNew ? 'New franchise' : (form.name || 'Franchise') }}</span>
        <span class="vendor-breadcrumbs-current" *ngIf="notFound">Not found</span>
      </nav>

      <div class="vendor-detail-not-found gutter-side" *ngIf="notFound">
        <p>Franchise not found.</p>
        <a routerLink="/franchises" class="vendor-btn-primary">Back to Franchises</a>
      </div>

      <form *ngIf="!notFound" (ngSubmit)="onSave()" class="vendor-detail-single">
        <div class="vendor-detail-card">
          <h3 class="vendor-detail-section-heading">Franchise Details</h3>
          <div class="vendor-detail-fields">
            <div class="vendor-settings-field">
              <label class="vendor-settings-label-text">Name</label>
              <input type="text" class="vendor-settings-input" [(ngModel)]="form.name" name="name" placeholder="Franchise name" />
            </div>
            <div class="vendor-settings-field">
              <label class="vendor-settings-label-text">Contact</label>
              <input type="text" class="vendor-settings-input" [(ngModel)]="form.contact" name="contact" placeholder="Contact name" />
            </div>
            <div class="vendor-settings-field">
              <label class="vendor-settings-label-text">Email</label>
              <input type="email" class="vendor-settings-input" [(ngModel)]="form.email" name="email" placeholder="email@example.com" />
            </div>
            <div class="vendor-settings-field">
              <span class="vendor-settings-label-text">CoreBridge</span>
              <div class="vendor-platform-badges" style="margin-top: 8px;">
                <label class="vendor-checkbox-inline"><input type="checkbox" [(ngModel)]="form.v2" name="v2" /> V2</label>
                <label class="vendor-checkbox-inline"><input type="checkbox" [(ngModel)]="form.v3" name="v3" /> V3</label>
              </div>
            </div>
          </div>
        </div>
        <div class="vendor-detail-actions gutter-side">
          <button type="submit" class="vendor-btn-primary">Save</button>
          <a routerLink="/franchises" class="vendor-btn-ghost">Cancel</a>
        </div>
      </form>
    </div>
  `,
  styles: [`
    :host { --vendor-panel-border: #E2E8F0; --vendor-text-muted: #64748b; --vendor-text-body: #334155; }
    .vendor-detail-page { max-width: none; padding: 16px 20px; }
    .vendor-detail-not-found { padding: 24px 0; }
    .vendor-detail-not-found p { margin: 0 0 16px 0; color: var(--vendor-text-muted); }
    .vendor-detail-single { max-width: 640px; }
    .vendor-detail-card { background: #fff; border: 1px solid var(--vendor-panel-border); border-radius: 8px; padding: 20px; margin-bottom: 16px; }
    .vendor-detail-section-heading { margin: 0 0 16px 0; font-size: 14px; font-weight: 600; color: var(--vendor-text-body); }
    .vendor-detail-fields { display: flex; flex-direction: column; gap: 16px; }
    .vendor-settings-label-text { display: block; margin-bottom: 6px; font-size: 13px; font-weight: 500; color: var(--vendor-text-muted); }
    .vendor-settings-input { width: 100%; padding: 8px 12px; border: 1px solid var(--vendor-panel-border); border-radius: 6px; font-size: 14px; box-sizing: border-box; }
    .vendor-checkbox-inline { display: inline-flex; align-items: center; gap: 6px; margin-right: 16px; font-size: 14px; cursor: pointer; }
    .vendor-detail-actions { display: flex; align-items: center; gap: 12px; padding-top: 8px; }
    .vendor-btn-primary { padding: 8px 16px; background: #1976d2; color: #fff; border: none; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer; }
    .vendor-btn-primary:hover { background: #1565c0; }
    .vendor-btn-ghost { padding: 8px 16px; color: #64748b; border: 1px solid var(--vendor-panel-border); border-radius: 6px; font-size: 14px; text-decoration: none; }
    .vendor-btn-ghost:hover { background: #f8fafc; }
  `],
})
export class FranchiseDetailComponent {
  notFound = false;
  isNew = false;
  form: Franchise = {
    id: 0,
    name: '',
    v2: false,
    v3: false,
    contact: '',
    email: '',
  };

  constructor(
    private route: ActivatedRoute,
    private franchiseService: FranchiseService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.isNew = id === 'new';
      if (this.isNew) {
        this.notFound = false;
        this.form = {
          id: 0,
          name: '',
          v2: false,
          v3: false,
          contact: '',
          email: '',
        };
      } else {
        this.isNew = false;
        const franchise = id ? this.franchiseService.getById(id) : null;
        this.notFound = !franchise;
        if (franchise) {
          this.form = { ...franchise };
        }
      }
    });
  }

  onSave() {
    // POC: no persistence
  }
}
