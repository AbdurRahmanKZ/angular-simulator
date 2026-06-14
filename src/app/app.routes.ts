import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ProductComponent } from './pages/product/product.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'product/:id', component: ProductComponent},
  { path: '**', redirectTo: '' }
];
