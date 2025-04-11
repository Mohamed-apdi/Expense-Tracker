import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { YearlyComponent } from "./yearly/yearly.component";
import { MonthlyComponent } from "./monthly/monthly.component";
import { WeeklyComponent } from "./weekly/weekly.component";
import { DailyComponent } from "./daily/daily.component";

@Component({
  selector: 'app-analyses',
  imports: [ButtonModule, CommonModule, TabsModule, YearlyComponent, MonthlyComponent, WeeklyComponent, DailyComponent],
  template: `
    <div class="p-8">
    <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold !text-black">Analysis</h1>
          <!-- add a button show current date and time -->
      </div>

      <!-- Custom Tab Pills -->
      <div class="flex gap-2 mb-4 bg-[#F4F4F5] p-2 rounded-md w-[340px] mt-6">
        <button
          (click)="activeTab = 'yearly'"
          class="px-4 py-2 rounded-md font-medium text-sm transition duration-300 ease-in-out cursor-pointer"
          [ngClass]="{
            'bg-[#fff] text-black': activeTab === 'yearly',
            'bg-[#F4F4F5] text-gray-400': activeTab !== 'yearly'
          }"
        >
          Yearly
        </button>
        <button
          (click)="activeTab = 'monthly'"
          class="px-4 py-2 rounded-md font-medium text-sm transition duration-300 ease-in-out cursor-pointer"
          [ngClass]="{
            'bg-[#fff] text-black': activeTab === 'monthly',
            'bg-[#F4F4F5] text-gray-400': activeTab !== 'monthly'
          }"
        >
         Monthly
        </button>

        <button
          (click)="activeTab = 'weekly'"
          class="px-4 py-2 rounded-md font-medium text-sm transition duration-300 ease-in-out cursor-pointer"
          [ngClass]="{
            'bg-[#fff] text-black': activeTab === 'weekly',
            'bg-[#F4F4F5] text-gray-400': activeTab !== 'weekly'
          }"
        >
         Weekly
        </button>

        <button
          (click)="activeTab = 'daily'"
          class="px-4 py-2 rounded-md font-medium text-sm transition duration-300 ease-in-out cursor-pointer"
          [ngClass]="{
            'bg-[#fff] text-black': activeTab === 'daily',
            'bg-[#F4F4F5] text-gray-400': activeTab !== 'daily'
          }"
        >
         Daily
        </button>
      </div>

      <!-- Content -->
      <div class="p-4">
        <ng-container *ngIf="activeTab === 'yearly'">
          <app-yearly/>
        </ng-container>
        <ng-container *ngIf="activeTab === 'monthly'">
        <app-monthly/>
        </ng-container>
        <ng-container *ngIf="activeTab === 'weekly'">
        <app-weekly/>
        </ng-container>
        <ng-container *ngIf="activeTab === 'daily'">
        <app-daily/>
        </ng-container>
      </div>
    </div>
  `,
  styles: ``
})
export class AnalysesComponent {
  activeTab: 'yearly' | 'monthly' | 'weekly' | 'daily' = 'yearly';
}
