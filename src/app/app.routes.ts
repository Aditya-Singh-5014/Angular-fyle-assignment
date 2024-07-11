import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { WorkoutFormComponent } from './components/workout-form/workout-form.component';
import { WorkoutTableComponent } from './components/workout-table/workout-table.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { WorkoutChartComponent } from './components/workout-chart/workout-chart.component';

const routes: Routes = [
  { path: '', redirectTo: '/user-form', pathMatch: 'full' },
  { path: 'user-form', component: UserFormComponent, data: { animation: 'UserFormPage' } },
  { path: 'workout-form', component: WorkoutFormComponent, data: { animation: 'WorkoutFormPage' } },
  { path: 'workout-table', component: WorkoutTableComponent, data: { animation: 'WorkoutTablePage' } },
  { path: 'search-filter', component: SearchFilterComponent, data: { animation: 'SearchFilterPage' } },
  { path: 'workout-chart', component: WorkoutChartComponent, data: { animation: 'WorkoutChartPage' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
