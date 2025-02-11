import { Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { UsersComponent } from "./pages/admin/users/users.component";
import { LayoutComponent } from "./layouts/layout/layout.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { AuthGuard } from "./guards/auth.guard";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "dashboard",
  },
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "admin/users",
        component: UsersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "login",
        component: LoginComponent,
      },
    ],
  },
];
