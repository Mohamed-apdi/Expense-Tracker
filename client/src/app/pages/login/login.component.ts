import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-login',
  imports: [CardModule, InputTextModule, FormsModule, FloatLabel, ButtonModule, HttpClientModule, HotToastModule,],
  template: `
    <div class="flex justify-center items-center h-screen bg-[#fff] text-black">
      <p-card class="w-[400px] p-4 shadow-lg rounded-md">
        <div class="flex flex-col items-center mb-4 gap-4">
        <p-floatlabel variant="on">
          <input pInputText id="email" autocomplete="off" [(ngModel)]="email" name="email" />
          <label for="email">Email</label>
         </p-floatlabel>

         <p-floatlabel variant="on">
          <input pInputText id="password" type="password" autocomplete="off" [(ngModel)]="password" name="password" />
          <label for="password">Password</label>
         </p-floatlabel>

         <p-button label="Login" (onClick)="onLogin()" />
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
