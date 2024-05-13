import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPageAdminComponent } from './product-page-admin.component';

describe('ProductPageAdminComponent', () => {
  let component: ProductPageAdminComponent;
  let fixture: ComponentFixture<ProductPageAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPageAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductPageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
