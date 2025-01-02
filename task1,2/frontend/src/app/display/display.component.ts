import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  imports: [CommonModule, HttpClientModule],
  standalone: true,

  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  courses: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses() {
    this.http.get('http://localhost:4000/courses').subscribe(
      (response: any) => {
        this.courses = response;
      },
      (error: any) => {
        console.error('Error fetching courses:', error);
      }
    );
  }
}
