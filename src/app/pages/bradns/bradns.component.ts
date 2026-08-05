import { Component, inject } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Allbrands } from '../../shared/interface/allbrands';
import { log } from 'console';
import { LoaderComponent } from "../loader/loader.component";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-bradns',
  imports: [LoaderComponent,TranslatePipe],
  templateUrl: './bradns.component.html',
  styleUrl: './bradns.component.css'
})
export class BradnsComponent {
  _ProductService=inject(ProductService);
  allbrandss!:Allbrands[];
  ngOnInit():void{
    localStorage.setItem('currentpage',"brands");

    this._ProductService.getallbrands().subscribe({
      next:(res)=>{
        console.log(res);
        this.allbrandss=res.data
        console.log(this.allbrandss);
        
        
      
      },
      error:(err)=>
      {
        console.log(err);
        
      }
    })

  }
}
