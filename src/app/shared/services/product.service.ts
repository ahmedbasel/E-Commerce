import { Injectable, inject, signal } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Wishlist } from '../interface/wishlist';
import { Updateuserdata } from '../interface/updateuserdata';
import { Useraddress } from '../interface/useraddress';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  _HttpClient=inject(HttpClient);


  numofcart=signal(0)
  numoflist=signal(0)
  cartItems = signal<any[]>([]);

  
  


  private baseUrl = 'https://ecommerce.routemisr.com/api/v1/products';

  constructor() {
   
    
   }

  getsomeproduct():Observable<any>{
     return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  getallbrands():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/brands');
  }



  getallproduct(
  page: number,
  limit: number,
  category?: string | null,
  pricelte?:number | null,
  pricegte?:number | null,
):Observable<any> {

  let params: any = {
    page,
    limit
  };

  if (category) {
    params.category = category;
  }
if (pricelte ) {
  params['price[lte]'] = pricelte;
}

if (pricegte ) {
  params['price[gte]'] = pricegte;
}

  return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products', { params });
}

  getallcategories():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  getspecificProduct(id:any):Observable<any>{

    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }


  addproducttowishlist(productid:any):Observable<any>{
 
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/wishlist',{productId:productid})
  }

  getuserwishlist():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/wishlist');

  }


  deleteproductformwishlist(id:any):Observable<any>{

    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`)
  }



  addtocart(pid:any):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart',
    {productId:pid})
  }

  getusercart():Observable<any>{
   return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart')
  }

  Updatequantity(id:any,newcount:any):Observable<any>{

    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count:newcount})
  }

  deleteproductformcart(id:any,):Observable<any>{

    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`)
  }

  Clearusercart():Observable<any>{
    return this._HttpClient.delete('https://ecommerce.routemisr.com/api/v1/cart')
  }

  checkout(mytoken:any,addressdata:any,cartid:any):Observable<any>{



    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=http://localhost:4200`,
    {
      shippingAddress:addressdata 
    },
    {
     headers:{
      token:mytoken
     }
    })

  }

  addaddress(useraddress:Useraddress):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/addresses',useraddress)
  }


  deleteaddress(id:any):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`)
  }

  getuseraddress():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/addresses')
  }


  COD(mytoken:any,addressdata:any,cartid:any):Observable<any>{

    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartid}`,{
      shippingAddress:addressdata

    },{
      headers:{
        token:mytoken
      }
    })

  }


  getuserorder(userid:any):Observable<any>{

    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userid}`)
  }
}
 