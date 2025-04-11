import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-login',
  imports: [CardModule, InputTextModule, FormsModule, FloatLabel, ButtonModule, HttpClientModule, HotToastModule,RouterLink],
  template: `
    <div class="flex justify-center items-center h-screen text-black">
      <p-card class="w-[400px] shadow-lg rounded-md" styleClass="!bg-[#f9fafb]">
        <div class="flex flex-col items-center mb-4 gap-6 !w-full">
        <p-floatlabel class='w-full'>
          <input pInputText id="email" autocomplete="off" [(ngModel)]="email" name="email" class="!w-full !bg-[#f9fafb] !text-black"/>
          <label for="email" class="!text-black">Email</label>
         </p-floatlabel>

         <p-floatlabel class='w-full'>
          <input pInputText id="password" type="password" autocomplete="off" [(ngModel)]="password" name="password" class="w-full !bg-[#f9fafb] !text-black"/>
          <label for="password" class="!text-black ">Password</label>
         </p-floatlabel>

         <button pButton type="submit"  class="!bg-blue-600 hover:!bg-blue-700 !text-white w-full font-semibold py-2 rounded transition-all duration-300" (click)="onLogin()">
            Login
          </button>
         <div class="text-center">
          <span class='text-black'>Don't have an account? </span>
            <a routerLink="/register" class="text-blue-600 hover:underline curspor-pointer">Register</a>
          </div>
        </div>
      </p-card>
    </div>
  `,
  styles: ``
})
export class LoginComponent {
    email: string = '';
    password: string = '';

    constructor(private http: HttpClient, private router: Router, private toast: HotToastService) {}

    onLogin = () => {
        const payload = {email: this.email, password: this.password};

        this.http.post('http://localhost:3000/api/user/login', payload).subscribe({
          next: (res: any) => {
            console.log('Login successful', res);
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res));
            this.toast.success('Login successful!',{
              autoClose: true,
              duration: 2000,
            });
            this.router.navigate(['/']);

          },
          error: (err) => {
            this.toast.error(err.error.message,
              {
                autoClose: true,
                duration: 2000,
              }
            );
          }
        });
    }
    
}
