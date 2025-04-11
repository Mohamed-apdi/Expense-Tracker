import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-dashboard-overview',
  imports: [CardModule],
  template: `
    <div class="">
      <div class="w-full flex justify-arrownd p-0 m-0 gap-4">
        
      <p-card class="w-[25%]">
       <div class="flex items-center justify-between mb-4">
       <p class="m-0 font-bold">
          Total Balance
        </p>
        <i class="pi pi-wallet !text-[16px] text-gray-500"></i>
       </div>
        <p class="text-2xl font-bold">$5,231.89</p>
        <p class="text-sm text-gray-500 mb-4">+20.1% from last month</p>
      </p-card>

      <p-card class="w-[25%]">
       <div class="flex items-center justify-between mb-4">
       <p class="m-0 font-bold">
        Monthly Expenses
        </p>
        <i class="pi pi-wallet !text-[16px] text-gray-500"></i>
       </div>
        <p class="text-2xl font-bold">$1,245.69</p>
        <p class="text-sm text-gray-500 mb-4">+4.3% from last month</p>
      </p-card>

      <p-card class="w-[25%]">
       <div class="flex items-center justify-between mb-4">
       <p class="m-0 font-bold">
        Weekly Expenses
        </p>
        <i class="pi pi-wallet !text-[16px] text-gray-500"></i>
       </div>
        <p class="text-2xl font-bold">$845.12</p>
        <p class="text-sm text-gray-500 mb-4">+10.1% from last week</p>
      </p-card>

      <p-card class="w-[25%]">
       <div class="flex items-center justify-between mb-4">
       <p class="m-0 font-bold">
        Daily Expenses
        </p>
        <i class="pi pi-wallet !text-[16px] text-gray-500"></i>
       </div>
        <p class="text-2xl font-bold">$31.89</p>
        <p class="text-sm text-gray-500 mb-4">+3% from last day</p>
      </p-card>
      
      </div>
    </div>
  `,
  styles: ``
})
export class DashboardOverviewComponent {

}
