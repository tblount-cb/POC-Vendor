import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'vendor-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="vendor-page">
      <div class="vendor-page-header">
        <h1>Welcome to CoreBridge VIPER</h1>
        <p class="vendor-page-subtitle">
          Vendor Integration, Partnerships & Enterprise Relationships – Manage your vendors, integrations, and business relationships in one place.
        </p>
      </div>

      <div class="vendor-dashboard-grid">
        <div class="vendor-card">
          <div class="vendor-card-header">
            <h2>Vendors</h2>
          </div>
          <div class="vendor-card-content">
            <p class="vendor-stat-number">26</p>
            <p class="vendor-stat-label">Vendors</p>
            <a routerLink="/vendors" class="vendor-card-link">View All →</a>
          </div>
        </div>

        <div class="vendor-card">
          <div class="vendor-card-header">
            <h2>Integrations</h2>
          </div>
          <div class="vendor-card-content">
            <p class="vendor-stat-number">31</p>
            <p class="vendor-stat-label">Integrations</p>
            <a routerLink="/integrations" class="vendor-card-link">View All →</a>
          </div>
        </div>

        <div class="vendor-card">
          <div class="vendor-card-header">
            <h2>Franchises</h2>
          </div>
          <div class="vendor-card-content">
            <p class="vendor-stat-number">7</p>
            <p class="vendor-stat-label">Franchises</p>
            <a routerLink="/franchises" class="vendor-card-link">View All →</a>
          </div>
        </div>
      </div>

      <section class="vendor-activity-section" aria-label="Recent activity">
        <div class="vendor-activity-card">
          <div class="vendor-card-header">
            <h2>Recent Activity</h2>
          </div>
          <div class="vendor-card-content">
            <ul class="vendor-activity-list">
              <li>New vendor "ABC Supplies" added</li>
              <li>Integration sync completed</li>
              <li>Vendor profile updated</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .vendor-page {
      max-width: 1200px;
      margin: 0 auto;
      padding: 32px 24px;
    }
    .vendor-page-header {
      margin-bottom: 32px;
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
    .vendor-dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      margin-bottom: 24px;
    }
    .vendor-activity-section {
      margin-top: 0;
    }
    .vendor-activity-card {
      background: #fff;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      overflow: hidden;
      transition: box-shadow 0.15s ease;
    }
    .vendor-activity-card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    .vendor-activity-card .vendor-card-header {
      padding: 16px 20px;
      border-bottom: 1px solid #E2E8F0;
      background: #f8fafc;
    }
    .vendor-activity-card .vendor-card-content {
      padding: 20px;
    }
    .vendor-card {
      background: #fff;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      overflow: hidden;
      transition: box-shadow 0.15s ease;
    }
    .vendor-card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    .vendor-card-header {
      padding: 16px 20px;
      border-bottom: 1px solid #E2E8F0;
      background: #f8fafc;
    }
    .vendor-card-header h2 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: #334155;
    }
    .vendor-card-content {
      padding: 20px;
    }
    .vendor-stat-number {
      margin: 0 0 4px 0;
      font-size: 2rem;
      font-weight: 700;
      color: #1976d2;
    }
    .vendor-stat-label {
      margin: 0 0 16px 0;
      font-size: 14px;
      color: #64748b;
    }
    .vendor-card-link {
      display: inline-block;
      color: #1976d2;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
    }
    .vendor-card-link:hover {
      text-decoration: underline;
    }
    .vendor-activity-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .vendor-activity-list li {
      padding: 8px 0;
      font-size: 14px;
      color: #334155;
      border-bottom: 1px solid #E2E8F0;
    }
    .vendor-activity-list li:last-child {
      border-bottom: none;
    }
  `],
})
export class HomeComponent {}

