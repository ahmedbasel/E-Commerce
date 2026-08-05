import { Pipe, PipeTransform } from '@angular/core';
import { Allproduct } from '../interface/allproduct';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Allproduct[] | undefined, searchW: string | undefined): Allproduct[] {
    if (!products) return [];      
    if (!searchW) return products; 

    const searchTerm = searchW.toLowerCase();

    return products.filter(pro => pro.title.toLowerCase().includes(searchTerm));
  }

}
