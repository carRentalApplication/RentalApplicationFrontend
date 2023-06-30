import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss']
})
export class AnimationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  carPosition: number = 0;

  @HostListener('window:animationiteration', ['$event'])
  onAnimationIteration(event: AnimationEvent) {
    const carImage = document.querySelector('.home .image img');
    const carRect = carImage?.getBoundingClientRect();
    if (carRect) {
      const windowWidth = window.innerWidth;
      this.carPosition = (carRect.left / windowWidth) * 100;
    }
  }

}
