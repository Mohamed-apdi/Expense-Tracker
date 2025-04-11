import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HotToastService } from '@ngneat/hot-toast';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-register',
  imports: [FormsModule, InputTextModule, ButtonModule, CardModule, HttpClientModule, FloatLabel],
  template: `
    <div class="flex justify-center items-center min-h-screen  text-black">
      <p-card class="w-[400px] shadow-md rounded-md !bg-[#f9fafb]" styleClass="!bg-[#f9fafb]">
        <form (ngSubmit)="onRegister()" class="flex flex-col gap-4">

          <p-floatlabel > 
            <input pInputText id="name" name="name" [(ngModel)]="name" autocomplete="off" class="w-full !bg-[#f9fafb] !text-black"/>
            <label for="name" class="!text-black">Full Name</label>
          </p-floatlabel>

          <p-floatlabel>
            <input pInputText id="email" name="email" [(ngModel)]="email" autocomplete="off" class="w-full !bg-[#f9fafb] !text-black"/>
            <label for="email" class="!text-black">Email</label>
          </p-floatlabel>

          <p-floatlabel>
            <input pInputText type="password" id="password" name="password" [(ngModel)]="password" autocomplete="off" class="w-full !bg-[#f9fafb] !text-black"/>
            <label for="password" class="!text-black">Password</label>
          </p-floatlabel>

          <p-floatlabel > 
            <input pInputText id="mobile" name="mobile" [(ngModel)]="mobile" autocomplete="off" class="w-full !bg-[#f9fafb] !text-black"/>
            <label for="mobile" class="!text-black">Mobile</label>
          </p-floatlabel>

          <button pButton type="submit" label="Register" class="!bg-blue-600 hover:!bg-blue-700 !text-white"></button>
          <div class="text-center">
            <span>Already have an account?? </span>
            <a routerLink="/login" class="text-blue-600 hover:underline">Login</a>
          </div>
        </form>
      </p-card>
    </div>
  `,
  styles: ``
})
export class RegisterComponent  {
  name: string = '';
  email: string = '';
  password: string = '';
  mobile: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: HotToastService
  ) {}

  onRegister() {
    const payload = {
      name: this.name,
      email: this.email,
      password: this.password,
      mobile: this.mobile
    };

    this.http.post('http://localhost:3000/api/user/register', payload).subscribe({
      next: (res: any) => {
        console.log('Registration successful', res);
        this.toast.success('Registration successful!', {
          autoClose: true,
          duration: 2000,
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.toast.error(err.error.message, {
          autoClose: true,
          duration: 2000,
        });
      }
    })

  }
}