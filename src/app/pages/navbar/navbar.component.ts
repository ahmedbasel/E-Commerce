import { TranslationService } from './../../shared/services/translation.service';
import { User } from './../../shared/interface/orderdata';
import { AuthService } from './../../shared/services/auth.service';
import { Component, Renderer2, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ProductService } from '../../shared/services/product.service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

 _AuthService= inject(AuthService);
 R=inject(Router)
 _TranslateService=inject(TranslationService)
 _ProductService=inject(ProductService)


 numofcart=computed(()=>{return this._ProductService.numofcart()})
 numoflist=computed(()=>{return this._ProductService.numoflist()})

 constructor(private renderer: Renderer2) {}


  enableNavbar:boolean=false;

  user:string=''

closeNavbar() {
  const navbar = document.getElementById('navbarContent');
  if (navbar && navbar.classList.contains('show')) {
    navbar.classList.remove('show');
  }
}


  ngOnInit():void{

    this.user = localStorage.getItem('username') || '';
  

    
    

    this._AuthService.islogin.subscribe((val)=>{
      this.enableNavbar=val;
    })

   
  }



  change(lan:any){

    
    this._TranslateService.changelan(lan)

    
  }



  Signout(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this._AuthService.islogin.next(false);
    this.R.navigate(['/login'])
  }
}
