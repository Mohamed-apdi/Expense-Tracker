import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-expense-update',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    InputTextModule,
    FloatLabel,
    DatePickerModule,
    SelectModule,
    ButtonModule
  ],
  template: `
    <div class="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow text-black">
      <h2 class="text-2xl font-bold mb-6">Update Expense</h2>

      <form (ngSubmit)="onUpdateExpense()" class="flex flex-col gap-5 mt-2">
        <p-floatlabel>
          <input pInputText id="title" name="title" [(ngModel)]="title" class="w-full !bg-white !text-black border border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-400" />
          <label for="title">Title</label>
        </p-floatlabel>

        <p-floatlabel>
          <input pInputText id="amount" name="amount" type="number" [(ngModel)]="amount" class="w-full !bg-white !text-black border border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-400" />
          <label for="amount">Amount</label>
        </p-floatlabel>

        <p-select
          [(ngModel)]="category"
          name="category"
          [options]="categories"
          placeholder="Select category"
          optionLabel="label"
          optionValue="value"
          styleClass="w-full !bg-white !text-black border border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
        ></p-select>

        <p-datepicker
          [(ngModel)]="date"
          name="date"
          [showIcon]="true"
          iconDisplay="input"
          inputId="date"
          styleClass="w-full !bg-white !text-black border border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
        ></p-datepicker>

        <p-floatlabel>
          <input pInputText id="notes" name="notes" [(ngModel)]="notes" class="w-full !bg-white !text-black border border-gray-300 focus:border-gray-400 focus:ring-1 focus:ring-gray-400" />
          <label for="notes">Notes</label>
        </p-floatlabel>

        <button type="submit" pButton class="!bg-blue-600 hover:!bg-blue-700 !text-white">Update Expense</button>
      </form>
    </div>
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
export class ExpenseUpdateComponent implements OnInit {
  id: string = '';
  title: string = '';
  amount: number = 0;
  category: string = '';
  date: Date = new Date();
  notes: string = '';

  categories = [
    { label: 'Food', value: 'Food' },
    { label: 'Transport', value: 'Transport' },
    { label: 'Bills', value: 'Bills' },
    { label: 'Entertainment', value: 'Entertainment' },
    { label: 'Shopping', value: 'Shopping' },
    { label: 'Health', value: 'Health' },
    { label: 'Other', value: 'Other' },
  ];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    const token = localStorage.getItem('token');

    this.http.get<any>(`http://localhost:3000/api/expense/${this.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe((res) => {
      this.title = res.title;
      this.amount = res.amount;
      this.category = res.category;
      this.date = new Date(res.date);
      this.notes = res.notes;
    });
  }

  onUpdateExpense() {
    const token = localStorage.getItem('token');
    const payload = {
      title: this.title,
      amount: this.amount,
      category: this.category,
      date: this.date,
      notes: this.notes
    };

    this.http.put(`http://localhost:3000/api/expense/${this.id}`, payload, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(() => {
      this.router.navigate(['/expense']);
    });
  }
}
