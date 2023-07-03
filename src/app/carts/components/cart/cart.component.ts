import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  carts: any[] = [];
  products: any[] = [];
  form: FormGroup;
  details:any;
  total = 0
  constructor(private services: CartsService, private build: FormBuilder, private prdServices:ProductsService) {
    this.form = this.build.group({
      startdate: [''],
      enddate: [''],
    });
  }

  ngOnInit(): void {
    this.getCarts();
  }

  getCarts() {
    this.services.getCarts().subscribe((res: any) => {
      this.carts = res;
    });
  }

  applyFilter() {
    let date = this.form.value;
    this.services.getCarts(date).subscribe((res: any) => {
      this.carts = res;
    });
  }

  deleteCart(id: number) {
    this.services.deleteCart(id).subscribe(
      (res) => {
        this.getCarts();
        alert('done deleted');
      },
      (err) => {
        alert(err);
      }
    );
  }

  view(index: number) {
    this.products = []
    this.details = this.carts[index];
    for(let i in this.details.products){
      this.prdServices.getProductByID(this.details.products[i].productId).subscribe(res => {
        this.products.push({item: res, quantity: this.details.products[i].quantity})
        
      })
      this.getTotalPrice()
    }
  }


  getTotalPrice() {
    // this.total = 0;
    // for (let x in this.carts) {
      // this.total +=
      //   this.carts[x].item.price * this.carts[x].quantity;
    // }
    console.log(this.details.products[0].quantity)
  }
}
