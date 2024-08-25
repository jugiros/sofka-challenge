import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {getMinDateRevision, marginErrorValidator} from "../../functions/common";
import {ProductDto} from "../../models/productDto";
import {ProductService} from "../../services/product/product.service";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {ToastService} from "../../services/common/toast.service";
import {debounceTime, distinctUntilChanged, of, Subscription, switchMap} from "rxjs";

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit{

  form!: FormGroup;
  today: string = '';
  minDateRevision: string = '';
  private readonly endpointCreate = environment.endpoints.postProducts;
  private readonly endpointValidateId = environment.endpoints.verificationProduct;
  idValidationSubscription$: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private toastService: ToastService
  ) {
  }

  private initializeForm() {
    this.form = this.formBuilder.group({
      id: ["", [Validators.required, marginErrorValidator(3, 10)]],
      name: ["", [Validators.required, marginErrorValidator(5, 100)]],
      description: ["", [Validators.required, marginErrorValidator(10, 200)]],
      logo: ["", [Validators.required]],
      date_release: ["", [Validators.required]],
      date_revision: ["", [Validators.required]]
    });

    this.form.patchValue({
      date_release: this.today
    });
    this.minDateRevision = getMinDateRevision(this.today);

    this.setupIdValidation();
  }

  setupIdValidation() {
    const idControl = this.form.get('id');
    if (idControl) {
      this.idValidationSubscription$.unsubscribe();

      let previousId: string | null = null;

      this.idValidationSubscription$ = idControl.valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(id => {
          if (!id || id === previousId) {
            return of(null);
          }

          previousId = id;

          idControl.setErrors({
            ...idControl.errors,
            validating: true
          });
          return this.productService.getValidationId(this.endpointValidateId, id).pipe(
            switchMap(validationResult => {
              if (validationResult) {
                idControl.setErrors({
                  ...idControl.errors,
                  idTaken: true
                });
              } else {
                idControl.clearValidators();
                idControl.setValidators([Validators.required, marginErrorValidator(3, 10)]);
                idControl.updateValueAndValidity();
              }

              return of(null);
            })
          );
        })
      ).subscribe();
    }
  }

  resetForm() {
    this.form.reset({
      id: '',
      name: '',
      description: '',
      logo: '',
      date_release: this.today,
      date_revision: ''
    });
  }

  onDateReleaseChange(event: Event) {
    const dateRelease = (event.target as HTMLInputElement).value;
    this.minDateRevision = getMinDateRevision(dateRelease);
  }

  onSubmit() {
    this.form.markAsTouched();
    this.form.markAllAsTouched();
    this.form.markAsDirty();

    if (!this.form.valid) {
      return;
    }

    const product: ProductDto = this.form.value;

    this.productService.createProduct(this.endpointCreate, product).subscribe({
      next: (response) => {
        this.toastService.showToast('Operación exitosa!', 'success');
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.toastService.showToast('Error al consumir el servicio!', 'error');
      }
    });
  }

  ngOnInit() {
    this.today = new Date().toISOString().split('T')[0];
    this.initializeForm();
  }

}
