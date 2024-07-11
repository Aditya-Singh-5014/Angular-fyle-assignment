import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent {
  workoutForm: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router) {
    this.workoutForm = this.fb.group({
      type: ['', Validators.required],
      duration: ['', Validators.required],
      userName: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.workoutForm.valid) {
      this.dataService.addWorkout(this.workoutForm.value);
      this.workoutForm.reset();
      this.router.navigate(['/workout-table']);
    }
  }
}
