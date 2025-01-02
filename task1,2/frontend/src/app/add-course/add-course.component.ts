import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  courseName: string = '';
  instructorName: string = '';
  courseImage: File | null = null;
  courseVideo: File | null = null;
  description: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onFileSelected(event: any, type: string) {
    if (type === 'image') {
      this.courseImage = event.target.files[0];
    } else if (type === 'video') {
      this.courseVideo = event.target.files[0];
    }
  }

  onSubmit() {
    if (!this.courseName || !this.instructorName || !this.courseImage || !this.courseVideo || !this.description) {
      alert('Please fill all the fields');
      return;
    }

    const formData = new FormData();
    formData.append('courseName', this.courseName);
    formData.append('instructorName', this.instructorName);
    formData.append('courseImage', this.courseImage);
    formData.append('courseVideo', this.courseVideo);
    formData.append('description', this.description);

    this.http.post('http://localhost:4000/add-course', formData).subscribe(
      (response: any) => {
        alert('Course added successfully');
        this.router.navigate(['home']);
      },
      (error: any) => {
        console.error('Error adding course:', error);
        alert('Error adding course');
      }
    );
  }
}
