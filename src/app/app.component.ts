import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {ToastComponent} from "./components/common/toast/toast.component";
import {ToastService} from "./services/common/toast.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'challenge';

  toast: { message: string, type: 'success' | 'error' | 'warning' } | null = null;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.getToast().subscribe(toast => {
      this.toast = toast;
    });
  }
}
