import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { DataService } from '../../services/data.service';
import { Workout } from '../../models/workout.model';

@Component({
  selector: 'app-workout-table',
  templateUrl: './workout-table.component.html',
  styleUrls: ['./workout-table.component.css']
})
export class WorkoutTableComponent implements OnInit {
  searchTerm: string = '';
  selectedWorkoutType: string = '';
  workoutTypes: string[] = [];
  displayedColumns: string[] = ['userName', 'workouts', 'numberOfWorkouts', 'totalWorkoutMinutes'];
  dataSource = new MatTableDataSource<Workout>([]);
  pageSize: number = 5;
  pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 5 };
  totalWorkouts: number = 0;
  originalData: Workout[] = []; // To store original data

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.workouts$.subscribe(workouts => {
      this.originalData = workouts; // Store original data
      this.dataSource.data = workouts;
      this.totalWorkouts = workouts.length;
      this.populateWorkoutTypes(workouts);
      this.applyFilter();
    });
  }

  populateWorkoutTypes(workouts: Workout[]) {
    const typesSet = new Set(workouts.map(workout => workout.type));
    this.workoutTypes = Array.from(typesSet);
  }

  applyFilter() {
    let filteredData = this.originalData;

    if (this.searchTerm) {
      filteredData = filteredData.filter(workout =>
        workout.userName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.selectedWorkoutType) {
      filteredData = filteredData.filter(workout => workout.type === this.selectedWorkoutType);
    }

    this.dataSource.data = filteredData;
    this.totalWorkouts = filteredData.length;
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageEvent = event;
    this.applyFilter();
  }
}
