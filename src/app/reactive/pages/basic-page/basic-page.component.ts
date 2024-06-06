import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

const rdx24 = {
  name: 'rdx24' ,
  price: 200,
  inStorage: 20,
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit {

  /* public myForm: FormGroup = new FormGroup ({
    name: new FormControl('', [], []),
    price: new FormControl('', [], []),
    inStorage: new FormControl('', [], [])
  }); */

  public myFrom: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [ Validators.required, Validators.min(0) ]],
    inStorage: [0, [ Validators.required, Validators.min(0) ]],
  })

  constructor( private fb: FormBuilder ) {}

  ngOnInit(): void {
    // this.myFrom.reset(rdx24)
  };

  isValidField( field: string ): boolean | null {
    return this.myFrom.controls[ field ].errors
        && this.myFrom.controls[ field ].touched;
  };

  getFieldError( field: string ): string | null {
    if( !this.myFrom.controls[field] ) return null;

    const errors = this.myFrom.controls[field].errors || {};

    for (const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido ☝️';

        case 'minlength':
          return ` Minimo ${ errors['minlength'].requiredLength } caracteres. `;
      }
    }
    return null;
  };

  onSave(): void {

    if( this.myFrom.invalid ) {

      this.myFrom.markAllAsTouched();

      return;
    };

    console.log(this.myFrom.value)

    this.myFrom.reset( { price: 0, inStorage: 0 } );
  };

}
