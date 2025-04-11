import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ExpenseFormComponent } from "./expense-form/expense-form.component";
import { RecentExpensesComponent } from "./recent-expenses/recent-expenses.component";

@Component({
  standalone: true,
  selector: 'app-all-expense',
  imports: [CommonModule, CardModule, ExpenseFormComponent, RecentExpensesComponent],
  template: `
     <div class="text-black flex items-center gap-4">
      <p-card class="w-[50%] shadow-lg rounded-md" styleClass="!bg-[#f9fafb] !text-black border border-gray-200">
      <div class="mb-6">
        <h2 class="text-2xl font-bold mb-1">Add New Expense</h2>
        <p class="text-gray-500">Enter the details of your expense.</p>
      </div>
        <app-expense-form/>
      </p-card>

      <p-card class="w-full shadow-lg rounded-md" styleClass="!bg-[#f9fafb] !text-black border border-gray-200">
        <app-recent-expenses/>
      </p-card>
    </div>
  `,
  styles: ``
})
export class AllExpenseComponent {

}
