import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { guestGuard } from './auth/guest.guard';
export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/expense/expense.component').then((c) => c.ExpenseComponent),  // ✅ protected
        canActivate:[authGuard]
    },
    {
        path: "login",
        loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent), // unprotected route
        canActivate: [guestGuard],
    },
    {
        path: "register",
        loadComponent: () => import('./pages/register/register.component').then((c) => c.RegisterComponent), // unprotected route
        canActivate: [guestGuard],
    },
    {
        path:"expense/:id",
        loadComponent:() => import("./pages/expense/expense-update/expense-update.component").then((c) => c.ExpenseUpdateComponent), // ✅ protected
        canActivate:[authGuard]
    }
];
