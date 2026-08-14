import { Useraddress } from './shared/interface/useraddress';
import { CashOrderComponent } from './pages/cash-order/cash-order.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CartComponent } from './pages/cart/cart.component';
import { BradnsComponent } from './pages/bradns/bradns.component';
import { authGuard } from './shared/gurad/auth.guard';
import { notloginGuard } from './shared/gurad/notlogin.guard';
import { UpdateLoggedUserDataComponent } from './pages/update-logged-user-data/update-logged-user-data.component';
import { UpdateLoggedUserPasswordComponent } from './pages/update-logged-user-password/update-logged-user-password.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { VerifyResetCodeComponent } from './pages/verify-reset-code/verify-reset-code.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { GetuserordersComponent } from './pages/getuserorders/getuserorders.component';
import { UserAddressComponent } from './pages/user-address/user-address.component';
import { MyaddressComponent } from './pages/myaddress/myaddress.component';
export const routes: Routes = [
    {path:'',redirectTo:'/home',pathMatch:'full'}, 
    {path:'login',component:LoginComponent,title:'login',canActivate:[notloginGuard]},
    {path:'register',component:SignupComponent,title:'Register',canActivate:[notloginGuard]},
    {path:'home',component:HomeComponent,title:'Home'},
    {path:'product',component:ProductComponent,title:'Product',},
    {path:'categories',component:CategoriesComponent,title:'Categories'},
    {path:'cart',component:CartComponent,title:'Cart',canActivate:[authGuard]},
    {path:'checkout/:cartid',component:CheckoutComponent,title:'Checkout',canActivate:[authGuard]},
    {path:'brands',component:BradnsComponent,title:'Bradns',},
    {path:'COD',component:CashOrderComponent,title:'COD',canActivate:[authGuard]},
    {path:'allorders',component:GetuserordersComponent,title:'Your Orders',canActivate:[authGuard]},
    {path: 'add-address',component:UserAddressComponent,title:'Add address',canActivate:[authGuard]},
    {path:'My address',component:MyaddressComponent,title:'My address',canActivate:[authGuard]},
    {path:'wishlist',component:WishlistComponent,title:'wishlist',canActivate:[authGuard]},
    {path:'single/:pid',component:SingleProductComponent,title:'single'},
    {path:'updatedata',component:UpdateLoggedUserDataComponent,title:'UpdateLoggedUserData',canActivate:[authGuard]},
    {path:'Updatepassword',component:UpdateLoggedUserPasswordComponent,title:'Updatepassword',canActivate:[authGuard]},
    {path:'forgetpassword',component:ForgetPasswordComponent,title:'forgetpassword',canActivate:[notloginGuard]},
    {path:'verifycode',component:VerifyResetCodeComponent,title:'verifycode',canActivate:[notloginGuard]},
    {path:'restpassword',component:ResetPasswordComponent,title:'restpassword',canActivate:[notloginGuard]},


    








];
