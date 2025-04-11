import { Component } from '@angular/core';
import { AllExpenseComponent } from "./all-expense/all-expense.component";
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { ExpensesComponent } from "./expenses/expenses.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-expense',
  imports: [AllExpenseComponent, ButtonModule, CommonModule, TabsModule, ExpensesComponent, RouterLink],
  template: `
   <div class="p-8">
      <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold !text-black">Expenses</h1>
          <button pButton type="button" label="History" routerLink="/history" icon="pi pi-arrow-up-right" class="!bg-black !text-white"></button>
      </div>

      <!-- Custom Tab Pills -->
      <div class="flex gap-2 mb-4 bg-[#F4F4F5] p-2 rounded-md w-[260px] mt-6">
        <button
          (click)="activeTab = 'new-expense'"
          class="px-4 py-2 rounded-md font-medium text-sm transition duration-300 ease-in-out cursor-pointer"
          [ngClass]="{
            'bg-[#fff] text-black': activeTab === 'new-expense',
            'bg-[#F4F4F5] text-gray-400': activeTab !== 'new-expense'
          }"
        >
          New Expense
        </button>
        <button
          (click)="activeTab = 'expenses'"
          class="px-4 py-2 rounded-md font-medium text-sm transition duration-300 ease-in-out cursor-pointer"
          [ngClass]="{
            'bg-[#fff] text-black': activeTab === 'expenses',
            'bg-[#F4F4F5] text-gray-400': activeTab !== 'expenses'
          }"
        >
         All Expenses
        </button>
      </div>

      <!-- Content -->
      <div class="p-4">
        <ng-container *ngIf="activeTab === 'new-expense'">
          <app-all-expense/>
        </ng-container>
        <ng-container *ngIf="activeTab === 'expenses'">
          <app-expenses/>
        </ng-container>
      </div>
   </div>
  `,
  styles: ``
})
export class ExpenseComponent {
  activeTab: 'new-expense' | 'expenses' = 'new-expense';
}
