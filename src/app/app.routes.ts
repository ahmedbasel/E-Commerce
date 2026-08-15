import { Useraddress } from './shared/interface/useraddress';
import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';

import { authGuard } from './shared/gurad/auth.guard';
import { notloginGuard } from './shared/gurad/notlogin.guard';

import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { VerifyResetCodeComponent } from './pages/verify-reset-code/verify-reset-code.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },


  {
    path: 'login',
    component: LoginComponent,
    title: 'login',
    canActivate: [notloginGuard]
  },

  {
    path: 'register',
    component: SignupComponent,
    title: 'Register',
    canActivate: [notloginGuard]
  },

  {
    path: 'home',
    component: HomeComponent,
    title: 'Home'
  },

  {
    path: 'forgetpassword',
    component: ForgetPasswordComponent,
    title: 'forgetpassword',
    canActivate: [notloginGuard]
  },

  {
    path: 'verifycode',
    component: VerifyResetCodeComponent,
    title: 'verifycode',
    canActivate: [notloginGuard]
  },

  {
    path: 'restpassword',
    component: ResetPasswordComponent,
    title: 'restpassword',
    canActivate: [notloginGuard]
  },



  {
    path: 'product',
    loadComponent: () =>
      import('./pages/product/product.component')
        .then(m => m.ProductComponent),
    title: 'Product'
  },

  {
    path: 'categories',
    loadComponent: () =>
      import('./pages/categories/categories.component')
        .then(m => m.CategoriesComponent),
    title: 'Categories'
  },

  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/cart/cart.component')
        .then(m => m.CartComponent),
    title: 'Cart',
    canActivate: [authGuard]
  },

  {
    path: 'checkout/:cartid',
    loadComponent: () =>
      import('./pages/checkout/checkout.component')
        .then(m => m.CheckoutComponent),
    title: 'Checkout',
    canActivate: [authGuard]
  },

  {
    path: 'brands',
    loadComponent: () =>
      import('./pages/bradns/bradns.component')
        .then(m => m.BradnsComponent),
    title: 'Bradns'
  },

  {
    path: 'ShopBY/:categID',
    loadComponent: () =>
      import('./pages/singlecategory/singlecategory.component')
        .then(m => m.SinglecategoryComponent),
    title: 'ShopBy'
  },

  {
    path: 'COD',
    loadComponent: () =>
      import('./pages/cash-order/cash-order.component')
        .then(m => m.CashOrderComponent),
    title: 'COD',
    canActivate: [authGuard]
  },

  {
    path: 'allorders',
    loadComponent: () =>
      import('./pages/getuserorders/getuserorders.component')
        .then(m => m.GetuserordersComponent),
    title: 'Your Orders',
    canActivate: [authGuard]
  },

  {
    path: 'add-address',
    loadComponent: () =>
      import('./pages/user-address/user-address.component')
        .then(m => m.UserAddressComponent),
    title: 'Add address',
    canActivate: [authGuard]
  },

  {
    path: 'My address',
    loadComponent: () =>
      import('./pages/myaddress/myaddress.component')
        .then(m => m.MyaddressComponent),
    title: 'My address',
    canActivate: [authGuard]
  },

  {
    path: 'wishlist',
    loadComponent: () =>
      import('./pages/wishlist/wishlist.component')
        .then(m => m.WishlistComponent),
    title: 'wishlist',
    canActivate: [authGuard]
  },

  {
    path: 'single/:pid',
    loadComponent: () =>
      import('./pages/single-product/single-product.component')
        .then(m => m.SingleProductComponent),
    title: 'single'
  },

  {
    path: 'updatedata',
    loadComponent: () =>
      import('./pages/update-logged-user-data/update-logged-user-data.component')
        .then(m => m.UpdateLoggedUserDataComponent),
    title: 'UpdateLoggedUserData',
    canActivate: [authGuard]
  },

  {
    path: 'Updatepassword',
    loadComponent: () =>
      import('./pages/update-logged-user-password/update-logged-user-password.component')
        .then(m => m.UpdateLoggedUserPasswordComponent),
    title: 'Updatepassword',
    canActivate: [authGuard]
  }

];
