import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toastService/toast.service';

@Component({
  selector: 'app-tutor-sidebar',
  templateUrl: './tutor-sidebar.component.html',
  styleUrl: './tutor-sidebar.component.css'
})
export class TutorSidebarComponent {
  name="tutor"

  constructor( private router: Router,private toast:ToastService){}


  logout() {
    sessionStorage.removeItem('TUTOR');
    this.router.navigate(['/login']);  // Adjust the route as per your application's routing structure
    this.toast.showSuccess('Logged out successfully', 'Success');
  }
  
}
