import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserLoginService } from '../../../services/userLogin/user-login.service';
import { FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { ToastService } from '../../../services/toastService/toast.service';
import { UserSignupService } from '../../../services/userSignup/user-signup.service';
import { SwPush } from '@angular/service-worker';
import { apiUrls } from '../../../API';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit{

  
  fb = inject(FormBuilder);
  router = inject(Router);
  userLoginService = inject(UserLoginService)


  error: string|null ='';
  studentLoginForm!: FormGroup;
  tutorLoginForm!: FormGroup;
  coordinatorLoginForm!: FormGroup;
  adminLoginForm!: FormGroup;
  message:string='';

  studentFormSubscription!: Subscription;
  tutorFormSubscription!: Subscription;
  coordinatorFormSubscription!: Subscription;
  adminFormSubscription!: Subscription;
  loginSubscription!: Subscription;
  user!: SocialUser;
  loggedIn!: boolean;
  readonly VAPID_PUBLIC_KEY = 'BD_qZ0tyVaPC6DVg2kKmWTqw9C4NOMyHiZYyLJIwDmoKvhdF0ieqIw9vaffOnfJCoI2fWAyBk1Pib8KWsp5Lsd8';
  

  constructor(
    private loginService: UserLoginService,
  private socialAuthService: SocialAuthService,
  private toast: ToastService,
  private signupService:UserSignupService,
  private swPush:SwPush
  ){}

  ngOnInit(): void {
    this.validateStudentForm();
    this.validateTutorForm();
    this.validateCoordinatorForm();
    this.validateAdminForm();

    
    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
            this.user = user;
            this.loggedIn = true;
            console.log(user);
            this.toast.showSuccess("Login Sucessfully", 'Success');
            this.router.navigate(['/user/dashboard']);
            
            //Store user data in the backend
            this.signupService.storeUserData(user).subscribe(
              (response) => {
                console.log('User data stored successfully', response);
                sessionStorage.setItem('STUDENT', "student");
                this.router.navigate(['/user/dashboard']);
              },
              (error) => {
                console.error('Error storing user data', error);
                this.toast.showError("Error logging in", 'Error');
              }
            );
          }
    });
  }

  pushSubscription(token) {
    if (!this.swPush.isEnabled) {
      console.log("Service Worker Push is not enabled");
      return;
    }    
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
      
    }).then(sub => {      
      console.log("Subscription", sub);
      this.sendSubscriptionToServer(sub,token);
    }).catch(err => {
      console.error("Subscription error", err);
    
    });
  }

  sendSubscriptionToServer(subscription: PushSubscription,token:String) {
    // URL of your backend endpoint
    const endpoint = `${apiUrls.usersApi}subscribe`;
    const payload = {
      subscription: subscription,
      token: token
  };
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Subscription data sent successfully:',data);
    })
    .catch(error => {
        console.error('Error sending subscription data:', error);
    });
}


  // this.socialAuthService.authState.subscribe((user) => {
  //   if (user) {
  //     this.user = user;
  //     this.loggedIn = true;
  //     console.log(user);
  //     this.toast.showSuccess("Login Sucessfully", 'Success');
  //     this.router.navigate(['/user/dashboard']);
      
      // Store user data in the backend
      // this.signupService.storeUserData(user).subscribe(
      //   (response) => {
      //     console.log('User data stored successfully', response);
      //     sessionStorage.setItem('STUDENT', "student");
      //     this.toast.showSuccess(response.message, 'Success');
      //     this.router.navigate(['/user/dashboard']);
      //   },
      //   (error) => {
      //     console.error('Error storing user data', error);
      //     this.toast.showError("Error logging in", 'Error');
      //   }
      // );
  //   }
  // });

  validateStudentForm(){
    this.studentLoginForm = this.fb.group({
      email:  ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });

    this.studentFormSubscription = this.studentLoginForm.valueChanges.subscribe(() => {
      this.error = null;
    });
  }
  validateTutorForm(){
    this.tutorLoginForm = this.fb.group({
      email:  ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });

    this.tutorFormSubscription = this.tutorLoginForm.valueChanges.subscribe(() => {
      this.error = null;
    });
  }
  validateCoordinatorForm(){
    this.coordinatorLoginForm = this.fb.group({
      email:  ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });

    this.coordinatorFormSubscription = this.coordinatorLoginForm.valueChanges.subscribe(() => {
      this.error = null;
    });

  }
  validateAdminForm(){
    this.adminLoginForm = this.fb.group({
      email:  ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });

    this.adminFormSubscription = this.adminLoginForm.valueChanges.subscribe(() => {
      this.error = null;
    });

  }


  onStudentLogin() {
    this.loginSubscription = this.loginService.userLogin(this.studentLoginForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          sessionStorage.setItem('STUDENT', "student");
          sessionStorage.setItem('auth_token', res.user_token);
          this.toast.showSuccess(res.message, 'Success');
            this.router.navigate(['/user/dashboard']);
            this.pushSubscription(res.user_token);
          
        },
        error: (err) => {
          this.error = err.error.message || 'Something went wrong!';
          this.toast.showError(err.error.message, 'Error');
        }
      });
  }

  onTutorLogin() {
    if (this.tutorLoginForm.valid) {
      this.loginSubscription = this.loginService.tutorLogin(this.tutorLoginForm.value)
      .subscribe({
        next: (res) => {
          console.log(res.token);
          
          sessionStorage.setItem('TUTOR', "tutor");
          sessionStorage.setItem('auth_token', res.token);
          this.toast.showSuccess(res.message, 'Success');
            this.router.navigate(['/tutor/dashboard']);
          
        },
        error: (err) => {
          this.error = err.error.message || 'Something went wrong!';
          this.toast.showError(err.error.message, 'Error');
        }
      });
    }
  }

  onCoordinatorLogin() {
    if (this.coordinatorLoginForm.valid) {
      // Handle coordinator login
      this.loginSubscription = this.loginService.coordinatorLogin(this.coordinatorLoginForm.value)
      .subscribe({
        next: (res) => {
          sessionStorage.setItem('COORDINATOR', "coordinator");
          this.toast.showSuccess(res.message, 'Success');
          sessionStorage.setItem('auth_token', res.token);
            this.router.navigate(['/coordinator/dashboard']);
          
        },
        error: (err) => {
          this.error = err.error.message || 'Something went wrong!';
          this.toast.showError(err.error.message, 'Error');
        }
      });
    }
  }

  onAdminLogin() {
    if (this.adminLoginForm.valid){
      // Handle admin login
      this.loginSubscription = this.loginService.adminLogin(this.adminLoginForm.value)
      .subscribe({
        next: (res) => {
          sessionStorage.setItem('ADMIN', "admin");
          this.toast.showSuccess(res.message, 'Success');
          sessionStorage.setItem('auth_token', res.token);
            this.router.navigate(['/admin/dashboard']);
          
        },
        error: (err) => {
          this.error = err.error.message || 'Something went wrong!';
          this.toast.showError(err.error.message, 'Error');
        }
      });
    }
  }


  ngOnDestroy(): void {
    if (this.studentFormSubscription) {
      this.studentFormSubscription.unsubscribe();
    }
    if (this.tutorFormSubscription) {
      this.tutorFormSubscription.unsubscribe();
    }
    if (this.coordinatorFormSubscription) {
      this.coordinatorFormSubscription.unsubscribe();
    }
    if (this.adminFormSubscription) {
      this.adminFormSubscription.unsubscribe();
    }
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }


  
}


