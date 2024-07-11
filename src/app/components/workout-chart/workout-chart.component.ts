import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-workout-chart',
  templateUrl: './workout-chart.component.html',
  styleUrls: ['./workout-chart.component.css']
})
export class WorkoutChartComponent implements OnInit {
  chart!: Chart;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.workouts$.subscribe(workouts => {
      const workoutData = workouts.map(workout => workout.duration);
      const workoutLabels = workouts.map(workout => workout.type);

      const config: ChartConfiguration<'bar'> = {
        type: 'bar',
        data: {
          labels: workoutLabels,
          datasets: [{
            data: workoutData,
            borderColor: '#3cba9f'
          }]
        },
        options: {
          scales: {
            x: {
              display: true
            },
            y: {
              display: true
            }
          }
        }
      };

      this.chart = new Chart('canvas', config);
    });
  }
}
