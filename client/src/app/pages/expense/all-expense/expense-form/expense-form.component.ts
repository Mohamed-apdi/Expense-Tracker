import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';


@Component({
  selector: 'app-expense-form',
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    CardModule, 
    HttpClientModule, 
    FloatLabel,  
    DatePickerModule,
    SelectModule
  ],
  template: `
  <form (ngSubmit)="onCreateExpense()" class="flex flex-col gap-7">
    <p-floatlabel variant="in"> 
      <input pInputText id="title" name="title" [(ngModel)]="title" autocomplete="off" class="w-full !bg-white !text-black !border !border-gray-300 !focus:border-gray-400 !focus:ring-1 !focus:ring-gray-400"/>
      <label for="title" class="!text-black">Title</label>
    </p-floatlabel>

    <p-floatlabel variant="in">
      <input pInputText id="amount" name="amount" [(ngModel)]="amount" autocomplete="off" class="w-full !bg-white !text-black !border !border-gray-300 !focus:border-gray-400 !focus:ring-1 !focus:ring-gray-400"/>
      <label for="amount" class="!text-black">Amount</label>
    </p-floatlabel>

    <p-floatlabel variant="in" class="!text-black">
    <p-select [(ngModel)]="category" [options]="categories" name="category" placeholder="Select Category" class="w-full !bg-white !text-black !border !border-gray-300 !focus:border-gray-400 !focus:ring-1 !focus:ring-gray-400" optionLabel="label" optionValue="value"></p-select>
      <label for="category" class="!text-black">Category</label>
    </p-floatlabel>

    <p-floatlabel variant="in">
      <p-datepicker [(ngModel)]="date" [iconDisplay]="'input'" [showIcon]="true" placeholder="Select Date" inputId="icondisplay" styleClass="!bg-white !text-black w-full"/>
      <label for="icondisplay" class="font-bold mb-2">Date </label>
    </p-floatlabel>

    <p-floatlabel variant="in"> 
      <input pInputText id="notes" name="notes" [(ngModel)]="notes" autocomplete="off" class="w-full !bg-white !text-black !border !border-gray-300 !focus:border-gray-400 !focus:ring-1 !focus:ring-gray-400"/>
      <label for="notes" class="!text-black">Notes</label>
    </p-floatlabel>

    <button pButton type="submit" class="!bg-blue-600 hover:!bg-blue-700 !text-white">
      Create Expense
    </button>
  </form>
  `,
  styles: `
  ::ng-deep .p-datepicker .p-inputtext {
  background-color: #ffffff !important;
  color: #000000 !important;
  border: 1px solid #d1d5db !important; /* Tailwind's border-gray-200 */
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

::ng-deep .p-datepicker .p-inputtext:focus {
  border-color: #9ca3af !important; /* border-gray-400 */
  box-shadow: 0 0 0 1px #9ca3af !important;
  outline: none;
}
::ng-deep .p-select-label {
  color: #000000 !important; /* Black text */
}

/* When focused */
::ng-deep .p-select.p-focus .p-select-label {
  color: #000000 !important;
}
`
})
export class ExpenseFormComponent {
  title: string = '';
  amount: number | null = null;
  category: string = '';
  categories = [
    { label: 'Food', value: 'Food' },
    { label: 'Transport', value: 'Transport' },
    { label: 'Bills', value: 'Bills' },
    { label: 'Entertainment', value: 'Entertainment' },
    { label: 'Shopping', value: 'Shopping' },
    { label: 'Health', value: 'Health' },
    { label: 'Other', value: 'Other' }
  ];
  
  date: Date = new Date();
  notes: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: HotToastService,
  ) {}



  onCreateExpense() {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    const payload = {
      title: this.title,
      amount: this.amount,
      category: this.category,
      date: this.date,
      notes: this.notes
    };
  
    this.http.post('http://localhost:3000/api/expense', payload, { headers }).subscribe({
      next: (res: any) => {
        this.toast.success('Expense created successfully!', {
          autoClose: true,
          duration: 2000,
        });
        this.router.navigate(['/expense']);
      },
      error: (err) => {
        this.toast.error(err.error.message || 'Failed to create expense.', {
          autoClose: true,
          duration: 2000,
        });
      }
    });
  }
  
}