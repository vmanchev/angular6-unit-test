import { Component, OnInit } from '@angular/core';
import { JokesService } from '../../providers/jokes/jokes.service';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.css']
})
export class JokeComponent implements OnInit {

  public joke: any;

  constructor(private jokesService: JokesService) {

  }

  ngOnInit() {

  }

  getJoke() {
    this.jokesService.getRandomJoke().subscribe((j) => this.joke = j);
  }

}
