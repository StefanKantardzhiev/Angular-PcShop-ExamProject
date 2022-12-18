import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { NewItemComponent } from './new-item/new-item.component';
import { RecentItemsComponent } from './recent-items/recent-items.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'items/catalog',
    pathMatch: 'full',
    component: ItemsListComponent,
  },
  {
    path: 'items/catalog/latest',
    pathMatch: 'full',
    component: RecentItemsComponent,
  },
  {
    path: 'items/catalog/create',
    component: NewItemComponent,
    data: {
      title: 'New Item',
      // loginRequired: true,
    },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
