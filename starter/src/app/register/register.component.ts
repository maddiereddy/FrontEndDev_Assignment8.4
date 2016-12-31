import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { AlphaNumericValidator } from '../alphanumeric.validator'
import { MatchingPasswordsValidator } from '../matchingPasswords.validator'

@Component({
    selector: 'my-form',
    templateUrl: './register.component.html',
    styleUrls: ['../app.component.css']
})
export class RegisterComponent implements OnInit{
    signUpForm: FormGroup

    ngOnInit () {

        this.signUpForm = new FormGroup({
            fullName: new FormControl('', Validators.required),
            userName: new FormControl('', [Validators.required, AlphaNumericValidator.invalidAlphaNumeric]),
            email: new FormControl('',
                [Validators.required,
                Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$')
                ]),
            mobile: new FormControl('', Validators.required),
            passwordsGroup: new FormGroup({
                password: new FormControl('', [Validators.required,
                    Validators.minLength(6), Validators.pattern('^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$')]),
                confirmPassword: new FormControl('', [Validators.required,
                    Validators.minLength(6), Validators.pattern('^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$')])
            }, MatchingPasswordsValidator.mismatchedPasswords('password', 'confirmPassword'))
        })
    }

    onSubmit() {

        console.log(this.signUpForm.value);

        alert(`Submitted Form Info: \n
            Name: ${this.signUpForm.value.fullName} \n
            User Name: ${this.signUpForm.value.userName} \n
            Email: ${this.signUpForm.value.email} \n
            Mobile: ${this.signUpForm.value.mobile} \n
            Password: ${this.signUpForm.value.password}`)

        this.signUpForm.reset() //reset form


    }

}