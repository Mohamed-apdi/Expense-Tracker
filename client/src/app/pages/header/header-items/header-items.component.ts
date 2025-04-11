import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header-items',
  imports: [CardModule, RouterModule, CommonModule],
  template: `
    <div class="border-b border-black p-4 flex justify-between items-center">
        <div class="flex items-center gap-4">
          <span class="item-center mr-8">
            <i class="pi pi-credit-card !text-[22px] mr-2 text-black"></i>
            <span class="text-2xl font-bold">Expense Tracker</span>
          </span>
          <ng-container *ngFor="let link of navLinks">
          <a
            [routerLink]="link.path"
            routerLinkActive="active-link"
            class="group flex items-center transition duration-300 ease-in-out"
          >
            <i class="{{ link.icon }} mr-2 group-hover:text-black transition-all" [ngClass]="{ 'text-black': isActive(link.path), 'text-gray-500': !isActive(link.path) }"></i>
            <span class="text-xl group-hover:text-black transition-all" [ngClass]="{ 'text-black font-bold': isActive(link.path), 'text-gray-500': !isActive(link.path) }">
              {{ link.label }}
            </span>
          </a>
        </ng-container>
        </div>

        <div>
          <span class="bg-black w-[15] h-[15] rounded-full px-2 py-1 item-center cursor-pointer">
            <i class="pi pi-user !text-[16px] text-white"></i>
          </span>
        </div>
    </div>
  `,
  styles: ``
})
export class HeaderItemsComponent {
  navLinks = [
    { label: 'Dashboard', path: '/', icon: 'pi pi-home' },
    { label: 'Expense', path: '/expense', icon: 'pi pi-credit-card' },
    { label: 'Analysis', path: '/analysis', icon: 'pi pi-chart-line' },
    { label: 'History', path: '/history', icon: 'pi pi-history' },
  ];

  isActive(path: string): boolean {
    return location.pathname === path;
  }
}
