import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/* import * as customValidators from '../../../shared/validators/validators'; */
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidators } from '../../../shared/services/email-validators.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: [ '', [ Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern) ] ],
    /* email: [ '', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern) ], [ new EmailValidators() ] ], */
    email: [ '', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern) ], [ this.emailValidators ] ],
    userName: [ '', [ Validators.required, this.validatorsService.cantBeStrider ] ],
    password: [ '', [ Validators.required, Validators.minLength(6) ] ],
    password2: [ '', [ Validators.required ] ],
  }, {
    Validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  });

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidators: EmailValidators,
   ) {}

   isValidField( field: string ) {
    return this.validatorsService.isValidField( this.myForm, field );
  }

  onSave() {
    this.myForm.markAllAsTouched();

    console.log(this.myForm.value)
  }

}
