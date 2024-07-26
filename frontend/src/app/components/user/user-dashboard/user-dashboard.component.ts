import { Component, OnInit } from '@angular/core';
import { User } from '../../../interfaces/user';
import { AdminServiceService } from '../../../services/adminService/admin-service.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  upcomingClasses: User[] = [];
  name:string="user";
  ngOnInit(): void {
    this.todaysClasses()
  }

  constructor(
    private adminService: AdminServiceService) {}

    todaysClasses(){
    this.adminService.getStudentClasses().subscribe({
      next: (response) => {
        console.log(response.data);
        this.name = response.data[0].username;
        
        this.upcomingClasses = response.data;
       
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
  }

}
