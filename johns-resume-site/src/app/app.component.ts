import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Add this import
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router'; // Import RouterModule if not imported
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FooterComponent } from './footer/footer.component'; // Import FooterComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    FooterComponent
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Johnathan Rossi';
  showSearch: boolean = false; // Ensure this property is defined

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    console.log('Searching for:', searchTerm);
  }
}
