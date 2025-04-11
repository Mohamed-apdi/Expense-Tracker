import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { DashboardOverviewComponent } from "./dashboard-overview/dashboard-overview.component";
import { DashboardAnalysisComponent } from "./dashboard-analysis/dashboard-analysis.component";
@Component({
  selector: 'app-home',
  imports: [ButtonModule, CommonModule, TabsModule, DashboardOverviewComponent, DashboardAnalysisComponent],
  template: `
   <div class="p-8">
      <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold !text-white">Dashboard</h1>
          <button pButton type="button" label="Add Expense" icon="pi pi-plus" class="!bg-black !text-white"></button>
      </div>

      <!-- Custom Tab Pills -->
      <div class="flex gap-2 mb-4 bg-[#F4F4F5] p-2 rounded-md w-[200px] mt-6">
        <button
          (click)="activeTab = 'overview'"
          class="px-4 py-2 rounded-md font-medium text-sm transition duration-300 ease-in-out cursor-pointer"
          [ngClass]="{
            'bg-[#fff] text-black': activeTab === 'overview',
            'bg-[#F4F4F5] text-gray-400': activeTab !== 'overview'
          }"
        >
          Overview
        </button>
        <button
          (click)="activeTab = 'analysis'"
          class="px-4 py-2 rounded-md font-medium text-sm transition duration-300 ease-in-out cursor-pointer"
          [ngClass]="{
            'bg-[#fff] text-black': activeTab === 'analysis',
            'bg-[#F4F4F5] text-gray-400': activeTab !== 'analysis'
          }"
        >
          Analysis
        </button>
      </div>

      <!-- Content -->
      <div class="p-4">
        <ng-container *ngIf="activeTab === 'overview'">
          <app-dashboard-overview/>
        </ng-container>
        <ng-container *ngIf="activeTab === 'analysis'">
          <app-dashboard-analysis/>
        </ng-container>
      </div>
   </div>
  `,
  styles: ``
})
export class HomeComponent {
  activeTab: 'overview' | 'analysis' = 'overview';
}
