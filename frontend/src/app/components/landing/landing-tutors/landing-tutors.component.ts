import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-tutors',
  templateUrl: './landing-tutors.component.html',
  styleUrl: './landing-tutors.component.css'
})
export class LandingTutorsComponent {
  courses = [
    {
      image: 'https://www.shutterstock.com/image-photo/smiling-businesswoman-looking-camera-webcam-260nw-1302585136.jpg', // Replace with the actual image path
      tag: 'Web development',
      title: 'Complete React js course',
      tutor: 'Esther Howard',
    },
    {
      image: 'https://www.shutterstock.com/image-photo/smiling-businesswoman-looking-camera-webcam-260nw-1302585136.jpg', // Replace with the actual image path
      tag: 'Web developmen',
      title: 'React Crash Course',
      tutor: 'Brooklyn Simmons',
    },
    {
      image: 'https://www.shutterstock.com/image-photo/smiling-businesswoman-looking-camera-webcam-260nw-1302585136.jpg', // Replace with the actual image path
      tag: 'Web development',
      title: 'Learn hooks in React Js',
      tutor: 'Annetta Black',
    },
    {
      image: 'https://www.shutterstock.com/image-photo/smiling-businesswoman-looking-camera-webcam-260nw-1302585136.jpg', // Replace with the actual image path
      tag: 'Web development',
      title: 'Learn hooks in React Js',
      tutor: 'Annetta Black',
    }
  ];
}
