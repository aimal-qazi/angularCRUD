import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productName = '';
  cheap = 0;

  catName = '';
  venName = '';

  showProds = 'all';

  vendorIsActive = false;
  categoryIsActive = false;

  showAddProd = false;
  showAddVen = false;
  showAddCat = false;
  showEdit = false;
  showViewProd = false;
  showViewVen = false;
  showViewCat = false;
  showDelProd = false;
  showGetByCat = false;
  showGetByVen = false;
  showCheap = false;

  products: any[] = [];
  vendor: any[] = [];
  category: any[] = [];

  activeProducts: any[] = [];

  productForm!: FormGroup;
  vendorForm!: FormGroup;
  categoryForm!: FormGroup;

  ngOnInit(): void {
    const id = new FormControl();

    this.productForm = new FormGroup({
      id: id,
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      vendorId: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
    });

    this.vendorForm = new FormGroup({
      id: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });

    this.categoryForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
    });
  }

  onAddProduct() {
    this.showAddProd = false;
    this.productForm
      .get('id')
      ?.setValue(Math.floor(Math.random() * (9999 - 1000 + 1) + 1000));

    const data = this.productForm.getRawValue();
    this.products.push(data);
    this.productForm.reset();
  }

  showProducts() {
    this.activeProducts = [];

    for (let i = 0; i < this.products.length; i++) {
      this.vendorIsActive = this.vendor.find(
        (v) => v.id == this.products[i].vendorId && v.status == 'active'
      );

      this.categoryIsActive = this.category.find(
        (c) => c.id == this.products[i].categoryId && c.status == 'active'
      );

      if (this.vendorIsActive && this.categoryIsActive) {
        this.activeProducts.push(this.products[i]);
      }
    }
    console.log(this.activeProducts);
  }

  onAddVendor() {
    this.showAddVen = false;
    const data = this.vendorForm.getRawValue();
    this.vendor.push(data);
    this.vendorForm.reset();
  }

  onAddCategory() {
    this.showAddCat = false;
    const data = this.categoryForm.getRawValue();
    this.category.push(data);
    this.categoryForm.reset();
  }

  toggleStatusVen(status: string, i: number) {
    if (status == 'active') {
      this.vendor[i].status = 'inactive';
    } else {
      this.vendor[i].status = 'active';
    }
  }

  toggleStatusCat(status: string, i: number) {
    if (status == 'active') {
      this.category[i].status = 'inactive';
    } else {
      this.category[i].status = 'active';
    }
  }

  deleteVendor(i: number) {
    const vendorId = this.vendor[i].id;
    const confirmed =
      confirm(`Are you sure you want to delete Vendor: ${this.vendor[i].id}? 
    This will delete all of their products as well.`);

    if (confirmed) {
      for (let i = 0; i < this.vendor.length; i++) {
        if (this.vendor[i].id === vendorId) {
          for (let j = 0; j < this.products.length; j++) {
            if (this.products[j].vendorId === vendorId) {
              this.products.splice(j, 1);
              j--;
            }
          }
          this.vendor.splice(i, 1);
          break;
        }
      }
    }
  }

  deleteCategory(i: number) {
    const categoryId = this.category[i].id;
    const confirmed =
      confirm(`Are you sure you want to delete category: ${this.category[i].id}? 
    This will delete all of their products as well.`);
    if (confirmed) {
      for (let i = 0; i < this.category.length; i++) {
        if (this.category[i].id === categoryId) {
          for (let j = 0; j < this.products.length; j++) {
            if (this.products[j].categoryId === categoryId) {
              this.products.splice(j, 1);
              j--;
            }
          }
          this.category.splice(i, 1);
          break;
        }
      }
    }
  }

  deleteProductById(i: number) {
    alert('Are you sure');
    this.products.splice(i, 1);
  }

  deleteByName() {
    this.showDelProd = false;
    for (let i = 0; i <= this.products.length; i++) {
      if (this.productName == this.products[i].name) {
        this.products.splice(i, 1);
      }
    }
  }

  getByCatName() {
    this.showGetByCat = false;
    this.showProds = 'cat';
    this.showViewProd = true;
  }

  getByVenName() {
    this.showGetByVen = false;
    this.showProds = 'ven';
    this.showViewProd = true;
  }

  getCheapProducts() {
    this.showCheap = false;
    this.showProds = 'cheap';
    this.showViewProd = true;
  }
}
