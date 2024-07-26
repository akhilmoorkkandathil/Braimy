import { Component } from '@angular/core';
type Topic = 'gettingStarted' | 'reactBasics';

@Component({
  selector: 'app-landing-course',
  templateUrl: './landing-course.component.html',
  styleUrl: './landing-course.component.css'
})
export class LandingCourseComponent {
  openSubtopics: Record<Topic, boolean> = {
    gettingStarted: false,
    reactBasics: false,
    // Initialize other topics as needed
  };

  toggleSubtopics(topic: Topic) {
    this.openSubtopics[topic] = !this.openSubtopics[topic];
  }
}
