import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './components/charts/charts.component';

const routes: Routes = [
  {
    path: "charts",
    component: ChartsComponent,
  },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "ignore" }),
  CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
