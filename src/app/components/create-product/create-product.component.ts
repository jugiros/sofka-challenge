import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {marginErrorValidator} from "../../functions/common";

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

  constructor(
    private formBuilder: FormBuilder
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
  }

  resetForm() {
    this.form.reset();
  }

  onSubmit() {
    this.form.markAsTouched();
    this.form.markAllAsTouched();
    this.form.markAsDirty();

    if (!this.form.valid) {
      return;
    }
  }

  ngOnInit() {
    this.initializeForm();
  }

}
