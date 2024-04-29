import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayLayoutComponent } from './layout/display-layout/display-layout.component';

const routes: Routes = [

  {
    path:'',
    component:DisplayLayoutComponent,
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
