import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './auth/auth.guard';
import { guestGuard } from './auth/guest.guard';
export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,  // ✅ protected
        pathMatch: 'full',
        canActivate:[authGuard]
    },
    {
        path: 'expense',
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
        path: "history",
        loadComponent: () => import('./pages/history/history.component').then((c) => c.HistoryComponent),  // ✅ protected
        canActivate:[authGuard]
    },
    {
        path: "analysis",
        loadComponent: () => import('./pages/analyses/analyses.component').then((c) => c.AnalysesComponent),  // ✅ protected
        canActivate:[authGuard]
    }
];
