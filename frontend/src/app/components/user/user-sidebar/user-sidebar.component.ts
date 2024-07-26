import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toastService/toast.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent {
  name = 'User';
  constructor( private router: Router,private toast:ToastService,private socialAuthService: SocialAuthService,){}



  logout() {
    sessionStorage.removeItem('STUDENT');
      this.toast.showSuccess("Logout Successfully", 'Success');
      this.router.navigate(['/login']);
  }
  
  
}
