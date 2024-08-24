import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    ReactiveFormsModule
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
      id: [],
      name: [],
      description: [],
      logo: [],
      date_release: [],
      date_revision: []
    });
  }

  resetForm() {
    this.form.reset();
  }

  ngOnInit() {
    this.initializeForm();
  }

}
