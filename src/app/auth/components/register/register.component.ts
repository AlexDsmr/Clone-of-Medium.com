import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { AuthService } from '../../services/auth.service';
import { registerAction } from '../../store/action/register.action';
import { isSubmittingSelector } from '../../store/selectors';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  isSubmitting$!: Observable<boolean>

  constructor(private fb: FormBuilder, private store: Store, private authService: AuthService) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))

  }

  initializeForm(): void {
    this.form = this.fb.group({
        username: ['', Validators.required],
        email: '',
        password: ''
    })
    
  }
  onSubmit() {
    console.log(this.form.value)
    const request: RegisterRequestInterface = {
      user: this.form.value
    }
    this.store.dispatch(registerAction({request}))
  }
}
