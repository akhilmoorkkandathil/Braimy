import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-home',
  templateUrl: './landing-home.component.html',
  styleUrl: './landing-home.component.css'
})
export class LandingHomeComponent {
  courses = [
    { title: 'Build your brand & business', instructor: 'With Robert Johnson', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGWgNWCEJddCJy8CNj9YbIm2a5G-m1MIWByRWOEDcyCBlgA9Wd-3InQ3Xo3hBPZ97AJTg&usqp=CAU' },
    { title: 'Build your brand & business', instructor: 'With Robert Johnson', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGWgNWCEJddCJy8CNj9YbIm2a5G-m1MIWByRWOEDcyCBlgA9Wd-3InQ3Xo3hBPZ97AJTg&usqp=CAU' },
    { title: 'Build your brand & business', instructor: 'With Robert Johnson', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGWgNWCEJddCJy8CNj9YbIm2a5G-m1MIWByRWOEDcyCBlgA9Wd-3InQ3Xo3hBPZ97AJTg&usqp=CAU' },
    { title: 'Build your brand & business', instructor: 'With Robert Johnson', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGWgNWCEJddCJy8CNj9YbIm2a5G-m1MIWByRWOEDcyCBlgA9Wd-3InQ3Xo3hBPZ97AJTg&usqp=CAU' },
    { title: 'Build your brand & business', instructor: 'With Robert Johnson', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGWgNWCEJddCJy8CNj9YbIm2a5G-m1MIWByRWOEDcyCBlgA9Wd-3InQ3Xo3hBPZ97AJTg&usqp=CAU' },
    { title: 'Build your brand & business', instructor: 'With Robert Johnson', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGWgNWCEJddCJy8CNj9YbIm2a5G-m1MIWByRWOEDcyCBlgA9Wd-3InQ3Xo3hBPZ97AJTg&usqp=CAU' },
    
  ];
  features = [
    {
        title: 'INDIVIDUAL ATTENTION',
        description: 'Individual attention is the key that unlocks the full potential of every student.'
    },
    {
        title: 'PERSONAL MENTORSHIP',
        description: 'Personal mentorship is like having a trusted guide by your side.'
    },
    {
        title: 'CUSTOMISED TIMETABLE',
        description: 'Unleash the true potential of your studies with a customized timetable.'
    },
    {
        title: 'INSTANT DOUBT CLEARING',
        description: 'Imagine having a lifeline that instantly connects you with expert guidance.'
    },
    {
        title: 'TEST PREPARATION',
        description: 'Maximize your test preparation and unleash your full potential.'
    }
];

  faqs = [
    { question: 'What is UX design?', answer: 'UX design stands for User Experience design. It is the process of designing digital or physical products that are easy to use, intuitive, and enjoyable for the user.', open: false },
    { question: 'What are the key principles of UX design?', answer: 'The key principles of UX design include user-centered design, consistency, usability, feedback, and accessibility.', open: false },
    { question: 'What is the difference between UX and UI design?', answer: 'UX design focuses on the overall experience of the user, while UI design focuses on the visual and interactive elements of a product.', open: false },
    { question: 'What is a wireframe?', answer: 'A wireframe is a low-fidelity visual representation of a user interface, used to plan the layout and functionality of a product.', open: false },
    { question: 'What is user testing?', answer: 'User testing involves evaluating a product by testing it with real users to identify any issues and improve the user experience.', open: false },
  ];
  toggleFaq(faq: any) {
    faq.open = !faq.open;
  }

}
