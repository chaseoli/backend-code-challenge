import { Component, OnInit, HostBinding, NgZone, ViewChild, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { AuthService } from '../../../shared/services/auth.service'
import { ActivatedRoute, Router } from '@angular/router'
import { ICarbonInput, CarbonInput } from '../../../shared/models/forms.model'
import { LodashService } from 'src/app/shared/services/lodash.service '

interface IEmailForm {
  email: string
}

interface IPasswordForm {
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public hidePasswordForm = true
  public loginAttemptInProgress = false
  public loginErrorNotification: {
    type: string
    title: string
    message: string
    showClose: boolean
  }
  public emailForm: FormGroup
  public passwordForm: FormGroup
  public emailInput: ICarbonInput
  public passwordInput: ICarbonInput
  public rememberMe: boolean
  private email: string

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private _: LodashService,
    private router: Router
  ) {

    this.initFormControls()

  }

  @HostBinding('attr.class') cls = 'flex-fill'
  @ViewChild('password') passwordElement: ElementRef

  ngOnInit() {

    // check if firebase user exists
    if (!this._._.isEmpty(this._._.get(this.authService, 'auth.auth.currentUser'))) {
      this.redirect()
    }

  }

  initFormControls() {

    this.emailForm = this.formBuilder.group({
      email: '',
    })

    this.emailInput = new CarbonInput('Email', 'you@domain.com').model

    this.passwordForm = this.formBuilder.group({
      password: ''
    })

    this.passwordInput = new CarbonInput('Password', '').model

  }

  onRememberMe(event) {
    console.log('event', event)
    this.rememberMe = event.checked
  }

  onSubmitEmail(formData: IEmailForm) {

    this.email = formData.email.trim().toLocaleLowerCase()

    if (this.validateEmail(this.email)) {
      // show password form
      this.hidePasswordForm = false
      this.emailInput.invalid = false
      this.emailInput.invalidText = ''

      // on transition to the next form select the password field
      setTimeout(() => {
        this.passwordElement.nativeElement.focus()
        this.passwordElement.nativeElement.select()
      }, 0);

    } else {
      this.emailInput.invalid = true
      this.emailInput.invalidText = 'Invalid email format'
    }

  }

  validateEmail(email: string): boolean {
    var re = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  onSubmitPassword(formData: IPasswordForm) {

    this.loginAttemptInProgress = true

    // console.log('formData', formData)

    this.authService.signInEmailPassword(this.email, formData.password, this.rememberMe)
      .then(() => {

        this.redirect()

        // this.EmailForm.reset()
        // this.loginAttemptInProgress = false
        // this.showPasswordBlock = false

      }, (errorMsg) => {

        this.loginAttemptInProgress = false
        this.hidePasswordForm = true

        this.loginErrorNotification = {
          type: 'error',
          title: 'Login failed',
          showClose: false,
          message: errorMsg
        }

        this.emailInput.invalid = !!this.loginErrorNotification
        this.emailInput.invalidText = this.loginErrorNotification.message

        // clear password field on error
        this.passwordForm.get('password').reset()

      })

  }

  redirect() {
    // user already logged in so redirect      
    this.router.navigate(['/secure'])
  }

}
