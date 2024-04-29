import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { ProductFormComponent } from './product/product-form/product-form.component';

const routes: Routes = [
  {path:'dashboard', component:DashboardComponent},
  {path:'product', component:ProductComponent},
  {path: 'product-form', component: ProductFormComponent},
  {path:'', redirectTo:'dashboard', pathMatch:'full'}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
