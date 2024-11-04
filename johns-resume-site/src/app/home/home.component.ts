import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToProjects() {
    this.router.navigate(['/projects']);
  }

  navigateToContact() {
    this.router.navigate(['/contact']);
  }
}
