import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
@Component({
  standalone: true,
  selector: 'app-recent-expenses',
  imports: [CommonModule, HttpClientModule, BadgeModule, ButtonModule],
  template: `
     <div class="py-2">
      <h2 class="text-2xl font-bold mb-1">Recent Expenses</h2>
      <p class="text-gray-500 mb-6">You have {{ expenses.length }} expenses this month.</p>

      <div *ngFor="let expense of recentExpenses" class="flex justify-between mb-[10px] items-center bg-white border border-gray-200 rounded-lg p-2">
       
      <div class="flex items-center gap-4 ">
      <div class="flex items-center justify-center bg-gray-100 w-[40px] h-[40px] rounded-full text-center text-lg">
        <i [ngClass]="categoryIcons[expense.category] || 'pi pi-question-circle'"></i>
      </div>
         <div>
         <h3 class="text-lg font-semibold text-start">{{ expense.title }}</h3>
          <div class='flex gap-2 items-center'>
            <p class="text-gray-500 text-[12px] font-bold">{{ expense.displayDate }}</p>
              <span class="px-2">•</span>
            <span class="inline-block mt-1 text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {{ expense.category }}
            </span>
         </div>
          </div>
        </div>
        <div class="text-right text-lg font-semibold text-black">
          {{ expense.displayAmount }}
        </div>

      </div>
    </div>
  `,
  styles: ``
})
export class RecentExpensesComponent {
  expenses: any[] = [];
  recentExpenses: any[] = [];
  categoryIcons: { [key: string]: string } = {
    Food: 'pi pi-eject',
    Transport: 'pi pi-car',
    Bills: 'pi pi-money-bill',
    Entertainment: 'pi pi-star',
    Shopping: 'pi pi-shopping-bag',
    Health: 'pi pi-heart',
    Other: 'pi pi-ellipsis-h'
  };
  

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.http.get<any[]>('http://localhost:3000/api/expense', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe((data) => {
      console.log("Fetched expenses:", data);
      this.expenses = data.reverse().slice(0, 5).map(expense => ({
        ...expense,
        displayAmount: `$${Number(expense.amount).toFixed(2)}`,
        displayDate: new Date(expense.date).toLocaleDateString(),
      }));
      this.recentExpenses = this.expenses;
    });
  }
  
}
