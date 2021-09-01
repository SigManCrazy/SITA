import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements  OnInit, OnDestroy, AfterViewInit {
  public contentLoaded: boolean = false;
  private sub: Subscription;
  @ViewChild('canvas', {static: true}) canvasCtrl;


  constructor(private route: ActivatedRoute,
              private location: Location,
              private router: Router
  ) {
  }

  ngOnInit() {
    
    //this.canvasAnimationStart(this.canvasCtrl.nativeElement);

  }

  ngAfterViewInit() {
    /*Timeout a 100 necessario per eseguire l'animazione dopo il lifecycle di Angular*/
    setTimeout(() => {
      this.contentLoaded = true
    },500);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private canvasAnimationStart(canvasCtrl: any) {
    // Little Canvas things
    let ctx = canvasCtrl.getContext('2d');

// Set Canvas to be window size
    canvasCtrl.width = window.innerWidth;
    canvasCtrl.height = window.innerHeight;

// Configuration, Play with these
    let config = {
      particleNumber: 800,
      maxParticleSize: 10,
      maxSpeed: 40,
      colorVariation: 50
    };

// Colors
    let colorPalette = {
      bg: {r: 243, g: 243, b: 243, a: 0},
      matter: [
        {r: 52, g: 125, b: 235}, // darkPRPL
        {r: 0, g: 4, b: 255}, // rockDust
        {r: 23, g: 222, b: 252}, // solorFlare
        {r: 193, g: 200, b: 201} // totesASun
      ]
    };

    let particles = [];

    let drawBg = function (ctx, color) {
      ctx.fillStyle = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
      ctx.fillRect(0, 0, canvasCtrl.width, canvasCtrl.height);
    };

    let Particle = function (x, y) {
      
      // X Coordinate
      this.x = x || Math.round(Math.random() * canvasCtrl.width);
      // Y Coordinate
      this.y = y || Math.round(Math.random() * canvasCtrl.height);
      // Radius of the space dust
      this.r = Math.ceil(Math.random() * config.maxParticleSize);//*4;
      // Color of the rock, given some randomness
      this.c = colorVariation(colorPalette.matter[Math.floor(Math.random() * colorPalette.matter.length)], true);
      // Speed of which the rock travels
      this.s = Math.pow(Math.ceil(Math.random() * config.maxSpeed), .7);
      // Direction the Rock flies
      this.d = Math.round(Math.random() * 360);
    };

// Provides some nice color variation
// Accepts an rgba object
// returns a modified rgba object or a rgba string if true is passed in for argument 2
    let colorVariation = function (color, returnString) {
      let r, g, b, a, variation;
      r = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation / 2)) + color.r);
      g = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation / 2)) + color.g);
      b = Math.round(((Math.random() * config.colorVariation) - (config.colorVariation / 2)) + color.b);
      a = Math.random() + .5;
      if (returnString) {
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
      } else {
        return {r, g, b, a};
      }
    };

// Used to find the rocks next point in space, accounting for speed and direction
    let updateParticleModel = function (p) {
      let a = 180 - (p.d + 90); // find the 3rd angle
      p.d > 0 && p.d < 180 ? p.x += p.s * Math.sin(p.d) / Math.sin(p.s) : p.x -= p.s * Math.sin(p.d) / Math.sin(p.s);
      p.d > 90 && p.d < 270 ? p.y += p.s * Math.sin(a) / Math.sin(p.s) : p.y -= p.s * Math.sin(a) / Math.sin(p.s);
      return p;
    };

// Just the function that physically draws the particles
// Physically? sure why not, physically.
    let drawParticle = function (x, y, r, c, d) {
      ctx.beginPath();
      ctx.fillStyle = c;
      ctx.arc(x, y, r, 0, 2 * Math.PI, false);
      //ctx.translate(x, y);
      //ctx.rotate(d);
      //ctx.font= r+'px Material Icons';
      //ctx.fillText('flight',x,y,);
      ctx.fill();
      ctx.closePath();
    };

// Remove particles that aren't on the canvas
    let cleanUpArray = function () {
      particles = particles.filter((p) => {
        return (p.x > -100 && p.y > -100);
      });
    };


    let initParticles = function (numParticles, x?, y?) {
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(x, y));
      }
      particles.forEach((p) => {
        drawParticle(p.x, p.y, p.r, p.c, p.d);
      });
    };


// That thing
    window['requestAnimFrame'] = (function () {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    })();


// Our Frame function
    let frame = function () {
      // Draw background first
      drawBg(ctx, colorPalette.bg);
      // Update Particle models to new position
      particles.map((p) => {
        return updateParticleModel(p);
      });
      // Draw em'
      particles.forEach((p) => {
        drawParticle(p.x, p.y, p.r, p.c, p.d);
      });
      // Play the same song? Ok!
      window['requestAnimFrame'](frame);
    };

// Click listener
    this.canvasCtrl.nativeElement.addEventListener("click", function (event) {
        let x = event.clientX,
          y = event.clientY;
        cleanUpArray();
        initParticles(config.particleNumber, x, y);
      }
    );

// First Frame
    frame();

// First particle explosion
    initParticles(config.particleNumber);
  }
}
