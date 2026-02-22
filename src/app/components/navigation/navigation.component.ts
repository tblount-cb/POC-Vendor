import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'vendor-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="vendor-nav">
      <div class="vendor-nav-container">
        <div class="vendor-nav-brand">
          <h1>CoreBridge VIPER</h1>
          <span class="vendor-nav-subtitle">Vendor Integration, Partnerships & Enterprise Relationships</span>
        </div>
        <ul class="vendor-nav-links">
          <li>
            <a routerLink="/home" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
              Home
            </a>
          </li>
          <li>
            <a routerLink="/vendors" routerLinkActive="active">
              Vendors
            </a>
          </li>
          <li>
            <a routerLink="/integrations" routerLinkActive="active">
              Integrations
            </a>
          </li>
          <li>
            <a routerLink="/franchises" routerLinkActive="active">
              Franchises
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    .vendor-nav {
      background: #fff;
      border-bottom: 1px solid #E2E8F0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }
    .vendor-nav-container {
      width: 100%;
      max-width: none;
      margin: 0;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
      box-sizing: border-box;
    }
    .vendor-nav-brand {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .vendor-nav-brand h1 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: #333;
    }
    .vendor-nav-subtitle {
      font-size: 11px;
      color: #64748b;
      font-weight: 400;
      letter-spacing: 0.3px;
    }
    .vendor-nav-links {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 0;
    }
    .vendor-nav-links li {
      margin: 0;
    }
    .vendor-nav-links a {
      display: block;
      padding: 12px 20px;
      color: #64748b;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: color 0.15s ease;
      border-bottom: 3px solid transparent;
      margin-bottom: -1px;
    }
    .vendor-nav-links a:hover {
      color: #334155;
    }
    .vendor-nav-links a.active {
      color: #1976d2;
      border-bottom-color: #1976d2;
    }
    @media (max-width: 768px) {
      .vendor-nav-container { padding: 0 16px; }
    }
    @media (max-width: 576px) {
      .vendor-nav-container { padding: 0 14px; }
    }
  `],
})
export class NavigationComponent {}

