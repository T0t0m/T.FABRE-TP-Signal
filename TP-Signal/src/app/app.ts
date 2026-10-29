import { Component } from '@angular/core';
import { ProductivityTrackerComponent } from './productivity-tracker/productivity-tracker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductivityTrackerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}