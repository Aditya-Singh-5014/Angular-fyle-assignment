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
  workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga'];
  displayedColumns: string[] = ['name', 'workouts', 'numberOfWorkouts', 'totalWorkoutMinutes'];
  dataSource = new MatTableDataSource<Workout>([]);
  pageSize: number = 5;
  pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 5 };
  totalWorkouts: number = 0;
  filteredWorkouts: Workout[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.workouts$.subscribe(workouts => {
      this.filterWorkouts(workouts);
    });
  }

  filterWorkouts(workouts: Workout[]) {
    const filteredData = workouts.filter(workout => {
      const matchesSearchTerm = workout.userName.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesWorkoutType = this.selectedWorkoutType ? workout.type === this.selectedWorkoutType : true;
      return matchesSearchTerm && matchesWorkoutType;
    });
    this.filteredWorkouts = filteredData.slice(this.pageEvent.pageIndex * this.pageEvent.pageSize, (this.pageEvent.pageIndex + 1) * this.pageEvent.pageSize);
    this.dataSource.data = this.filteredWorkouts;
    this.totalWorkouts = filteredData.length;
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageEvent = event;
    this.dataService.workouts$.subscribe(workouts => {
      this.filterWorkouts(workouts);
    });
  }
}
