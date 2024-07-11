import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DataService } from '../../services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { Workout } from '../../models/workout.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements AfterViewInit {
  dataSource = new MatTableDataSource<Workout>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dataService: DataService) { }

  ngAfterViewInit() {
    this.dataService.workouts$.subscribe(workouts => {
      this.dataSource.data = workouts;
      this.dataSource.paginator = this.paginator;
    });
  }
}
