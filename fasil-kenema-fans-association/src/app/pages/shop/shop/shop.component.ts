import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  days: any;
  hours: any;
  minutes: any;
  seconds: any;

  ngOnInit(): void {
    // Set the date and time for the countdown
    const countdownDate = new Date('2023-08-01T00:00:00').getTime();

    // Update the countdown every second
    const countdownInterval = setInterval(() => {
      // Get the current date and time
      const now = new Date().getTime();

      // Calculate the time remaining
      const timeRemaining = countdownDate - now;

      // Calculate the days, hours, minutes, and seconds remaining
      this.days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      this.hours = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      // If the countdown is over, stop the interval
      if (timeRemaining < 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);
  }
}