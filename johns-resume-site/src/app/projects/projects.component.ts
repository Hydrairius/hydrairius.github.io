import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  standalone: true, // Make the component standalone
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projectsByCategory: { [key: string]: any[] } = {}; // Grouped projects by category
  expandedCategories: { [key: string]: boolean } = {}; // Track collapsed/expanded state for each category
  selectedProject: any = null;

  private sheetId = '1Csk8Np3duQIwkNWkN9GpM24X0sXokuZIqYff1Y9w3Aw';
  private apiKey = 'AIzaSyDd8wJc-eyZeL-_vRjUJtgCLWUJntMeHsg';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/Sheet1?key=${this.apiKey}`;
    this.http.get(url).subscribe((data: any) => {
      const rows = data.values;
      this.projectsByCategory = this.formatProjectData(rows);
    });
  }

  formatProjectData(rows: any[]): { [key: string]: any[] } {
    const headers = rows[0];
    const projects = rows.slice(1).map(row => {
      const project: any = {};
      headers.forEach((header: string, i: number) => {
        if (header === 'Skills' && row[i]) {
          project[header] = row[i].split(',').map((skill: string) => skill.trim());
        } else {
          project[header] = row[i];
        }
      });
      return project;
    });

    // Group projects by category
    const projectsByCategory: { [key: string]: any[] } = {};
    projects.forEach(project => {
      const category = project['Category'] || 'Uncategorized';
      if (!projectsByCategory[category]) {
        projectsByCategory[category] = [];
      }
      projectsByCategory[category].push(project);
    });
    return projectsByCategory;
  }

  toggleCategory(category: string) {
    this.expandedCategories[category] = !this.expandedCategories[category];
  }

  selectProject(project: any) {
    console.log('Project selected:', project); // Debugging line
    this.selectedProject = {
      title: project['Project Title'],
      requirements: project['Requirements'] || 'No requirements provided.',
      summary: project['Description'] || 'No summary provided.',
      takeaways: project['Takeaways'] || 'No takeaways provided.',
      skills: project['Skills'] || [],
      url: project['URL'],
      codeUrl: project['Code URL']
    };
  }
  

  getCategories(): string[] {
    return Object.keys(this.projectsByCategory);
  }
}
