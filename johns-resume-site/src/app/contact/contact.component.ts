import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-contact',
  standalone: true, // Make the component standalone
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [ReactiveFormsModule, CommonModule] // Import ReactiveFormsModule and CommonModule directly
})
export class ContactComponent {
  // Define the reactive form controls
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required])
  });

  // Method to send email through EmailJS
  sendEmail() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      emailjs.send(
        'service_gjgszhe',     // Replace with your EmailJS Service ID
        'template_ja03608',     // Replace with your EmailJS Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message
        },
        'pNbfm7_Im___dJ6gR'          // Replace with your EmailJS User ID
      )
      .then((response: EmailJSResponseStatus) => {
        alert('Message sent successfully!');
        this.contactForm.reset(); // Reset the form after a successful submission
      })
      .catch((error) => {
        console.error('Failed to send message:', error);
        alert('Failed to send message. Please try again later.');
      });
    } else {
      alert('Please fill out all required fields.');
    }
  }
}
