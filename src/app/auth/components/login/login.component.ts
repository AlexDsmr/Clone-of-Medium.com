import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loginAction } from '../../store/action/login.action';
import { isSubmittingSelector, validationErrorsSelector } from '../../store/selectors';
import { BackendErrorsInterface } from '../../types/backendErrors.interface';
import { LoginRequestInterface } from '../../types/loginRequest.interface';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isSubmitting$!: Observable<boolean>
  backendErrors$!: Observable<BackendErrorsInterface | null>

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  initializeForm(): void {
    this.form = this.fb.group({
        email: '',
        password: ''
    })
    
  }
  onSubmit() {
    console.log(this.form.value)
    const request: LoginRequestInterface = {
      user: this.form.value
    }
    this.store.dispatch(loginAction({request}))
  }
}
