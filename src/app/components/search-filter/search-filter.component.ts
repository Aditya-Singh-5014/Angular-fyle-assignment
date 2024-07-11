import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { Workout } from '../../models/workout.model';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent {
  searchForm: FormGroup;
  dataSource = new MatTableDataSource<Workout>();

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.searchForm = this.fb.group({
      search: ['']
    });
    this.dataService.workouts$.subscribe(workouts => {
      this.dataSource.data = workouts;
    });
  }

  applyFilter() {
    const filterValue = this.searchForm.get('search')?.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
