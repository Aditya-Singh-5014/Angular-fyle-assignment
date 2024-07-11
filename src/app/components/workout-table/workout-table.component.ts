import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

interface Workout {
  name: string;
  workouts: string[];
  totalMinutes: number;
}

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

  ngOnInit() {
    this.filterWorkouts();
  }

  filterWorkouts() {
    const filteredData = WORKOUT_DATA.filter(workout => {
      const matchesSearchTerm = workout.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesWorkoutType = this.selectedWorkoutType ? workout.workouts.includes(this.selectedWorkoutType) : true;
      return matchesSearchTerm && matchesWorkoutType;
    });
    this.filteredWorkouts = filteredData.slice(this.pageEvent.pageIndex * this.pageEvent.pageSize, (this.pageEvent.pageIndex + 1) * this.pageEvent.pageSize);
    this.dataSource.data = this.filteredWorkouts;
    this.totalWorkouts = filteredData.length;
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageEvent = event;
    this.filterWorkouts();
  }
}

const WORKOUT_DATA: Workout[] = [
  {name: 'John Doe', workouts: ['Running', 'Cycling'], totalMinutes: 75},
  {name: 'Jane Smith', workouts: ['Swimming', 'Running'], totalMinutes: 80},
  {name: 'Mike Johnson', workouts: ['Yoga', 'Cycling'], totalMinutes: 90},
];
