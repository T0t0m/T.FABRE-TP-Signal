import { Component, signal, computed, effect } from '@angular/core';

const DAILY_GOAL = 5;

@Component({
  selector: 'app-productivity-tracker',
  standalone: true,
  templateUrl: './productivity-tracker.html',
  styleUrl: './productivity-tracker.scss'
})
export class ProductivityTrackerComponent {
  completedTasks = signal<number>(
    typeof localStorage !== 'undefined' ? Number(localStorage.getItem('tasks')) || 0 : 0
  );

  progressPercentage = computed(() => 
    (this.completedTasks() / DAILY_GOAL) * 100
  );

  message = computed(() => {
    const percentage = this.progressPercentage();
    if (percentage === 0) return "Prêt à démarrer la journée ?";
    if (percentage < 100) return "Continuez comme ça, vous y êtes presque !";
    return "Félicitations, objectif atteint ! 🚀";
  });

  constructor() {
    effect(() => {
      const currentTasks = this.completedTasks();
      
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('tasks', currentTasks.toString());
      }

      if (currentTasks >= DAILY_GOAL) {
        if (typeof window !== 'undefined') {
          setTimeout(() => {
            window.alert("Bravo, vous avez fini votre journée !");
          }, 10);
        }
      }
    });
  }

  incrementTask() {
    this.completedTasks.update(tasks => tasks + 1);
  }

  resetTasks() {
    this.completedTasks.set(0);
  }
}