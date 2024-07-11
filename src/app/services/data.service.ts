import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { Workout } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private usersSource = new BehaviorSubject<User[]>([]);
  users$ = this.usersSource.asObservable();

  private workoutsSource = new BehaviorSubject<Workout[]>([]);
  workouts$ = this.workoutsSource.asObservable();

  addUser(user: User) {
    const currentUsers = this.usersSource.value;
    this.usersSource.next([...currentUsers, user]);
  }

  addWorkout(workout: Workout) {
    const currentWorkouts = this.workoutsSource.value;
    this.workoutsSource.next([...currentWorkouts, workout]);
  }
}
