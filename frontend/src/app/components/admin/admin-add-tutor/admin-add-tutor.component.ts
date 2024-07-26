import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from '../../../services/adminService/admin-service.service';
import { ToastService } from '../../../services/toastService/toast.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-add-tutor',
  templateUrl: './admin-add-tutor.component.html',
  styleUrl: './admin-add-tutor.component.css'
})
export class AdminAddTutorComponent {
  tutorForm!: FormGroup;
  selectedFile: File | null = null;
  tutorId: string | null = null;
  title:string='Enter Tutor Information';
  button:string='Add Tutor'

  constructor(
    private fb: FormBuilder,
    private adminService: AdminServiceService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private router: Router
  ) {}
  ngOnInit() {
    this.validateForm();
    this.route.paramMap.subscribe(params => {      
      this.tutorId = params.get('id');
      console.log(params.get('id'));
      
      if (this.tutorId) {
        this.loadTutorData(this.tutorId);
      }
    });
  }

  validateForm(){
    this.tutorForm = this.fb.group({
      tutorName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      education: [''],
      password: ['', Validators.required],
    });
  }

  loadTutorData(id: string): void {
    this.adminService.getTutor(id).subscribe({
      next: (response) => {
        this.title = "Edit Tutor Information";
        this.button = "Update Tutor";
        console.log(response);
        this.populateForm(response.data);
      },
      error: (error) => {
        console.error('Error fetching student data:', error);
      }
    });
  }
  populateForm(data: any): void {
    this.tutorForm.patchValue({
      tutorName: data.username,
      phone: data.phone,
      password: '***********', 
      education: data.education, 
      email: data.email
    });
  }

  onSubmit() {
    if (this.tutorForm.valid) {
      if (this.tutorId) {
        console.log(this.tutorForm.value,this.tutorId);
        
        this.adminService.updateTutor(this.tutorId, this.tutorForm.value).subscribe({
          next: (response) => {
            console.log('Tutor updated successfully', response);
            this.toast.showSuccess(response.message, 'Success');
            this.router.navigate(['/admin/tutors']);
          },
          error: (error) => {
            console.error('Error updating tutor:', error);
          }
        });
      }else{
        this.adminService.addTutor(this.tutorForm.value).subscribe({
          next: (response) => {
            console.log('Tutor added successfully', response);
            this.toast.showSuccess(response.message, 'Success');
            this.router.navigate(['/admin/tutors']);
          },
          error: (error) => {
            console.error(error.response, error);
            this.toast.showError(error.response, 'Error');
          }
        });
      }
      }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    // Handle file upload logic
  }
}
