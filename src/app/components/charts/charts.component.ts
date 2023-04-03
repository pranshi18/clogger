import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  constructor(private router : Router) {
    // console.log(this.router.getCurrentNavigation().extras.state)
   }

  ngOnInit(): void {
    // console.log(this.router.getCurrentNavigation().extras.state)
  }

}
