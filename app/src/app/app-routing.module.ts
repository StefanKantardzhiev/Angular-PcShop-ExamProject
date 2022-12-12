import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { MainComponent } from './main/main.component';
import { RecentItemsComponent } from './recent-items/recent-items.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    component:HomeComponent
  },
  {
    path:'items/catalog',
    pathMatch:'full',
    component:ItemsListComponent
  },{
    path:'recent/catalog',
    pathMatch:'full',
    component:RecentItemsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
