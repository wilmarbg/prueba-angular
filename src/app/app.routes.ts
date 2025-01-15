import { Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';

export const routes: Routes = [{ path: '', redirectTo: '/product', pathMatch: 'full' }, // Redirige al componente por defecto
{ path: 'product', component: ProductComponent } ];
