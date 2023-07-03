import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../models/iproduct';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  products: IProduct[] = [];
  categories: string[] = [];
  loading: boolean = false;
  cartProducts: any[] = [];
  base64:any = ''
  form!:FormGroup;
  itemUpdate:any

  constructor(private services: ProductsService, private build:FormBuilder) {
    this.form = this.build.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      category: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.loading = true
    this.services.getAllProducts().subscribe(
      (res: any) => {
        this.products = res;
        this.loading = false
      },
      (err) => {
        console.log('Error: ' + err.message);
        this.loading = false
      }
    );
  }

  getCategories() {
    this.services.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res;
      }
    );
  }

  getSelectedCategories(event:any){
    this.form.get('category')?.setValue(event.target.value)
    console.log(this.form.value)
  }

  // filterCategory(event: any) {
  //   let value = event.target.value;
  //   value == 'all' ? this.getProducts() : this.getProductsByCats(value);
  // }

  // getProductsByCats(value: string) {
  //   this.loading = true
  //   return this.services.getProductsByCats(value).subscribe((res: any) => {
  //     this.products = res;
  //     this.loading = false
  //   });
  // }

  // addToCard(event:any){
  //   if('cart' in localStorage){
  //     this.cartProducts = JSON.parse(localStorage.getItem('cart')!)
  //     let exist = this.cartProducts.find(item => item.item.id == event.item.id)
  //     // check if product was chosen or not
  //     if(exist) {
  //       alert("this product already in your cart")
  //     }
  //     else {
  //       this.cartProducts.push(event)
  //       localStorage.setItem('cart', JSON.stringify(this.cartProducts))
  //       alert("Successful Added " + event.quantity + " items")
  //     }
  //   }
  //   else {
  //     this.cartProducts.push(event)
  //     localStorage.setItem('cart', JSON.stringify(this.cartProducts))
  //   }
  // }

  handleUpload(event:any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.base64 = reader.result
        this.form.get('image')?.setValue('this.base64')
    };
  }

  clearData(){
    this.form.patchValue({
      title: "",
      price: "",
      description: "",
      image: "",
      category: "",
    })
    this.base64 = ''
  }

  addProduct(){
    const model = this.form.value
    this.services.createProduct(model).subscribe((res: any) => {
      alert("successful added product")
    })
    this.clearData()

  }

  UpdatePrd(item:any){
    this.itemUpdate = item
    this.form.patchValue({
      title: item.title,
      price: item.price,
      description: item.description,
      image: item.image,
      category: item.category,
    })
    this.base64 = item.image
  }

  sendUpdate(){
    let updateForm = this.form.value
    console.log()
    // console.log(this.itemUpdate.id)
    this.services.UpdatePrd(updateForm, this.itemUpdate.id).subscribe((res: any) => {
      alert("successful Update product")
    })
    this.products[this.itemUpdate.id - 1] = updateForm
    console.log(this.products[this.itemUpdate.id - 1])
  }
}
