import { Injectable } from '@angular/core';
import { State } from './Dtos/state.model';
import { Food } from './Dtos/food.model';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  states: State[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    },
    {
      name: 'Colombia',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://libertyflagandbanner.com/wp-content/uploads/2015/08/colombia-flag.jpg'
    }

  ];

  foods: Food[] = [
    {value: '10.000', viewValue: 'Carne'},
    {value: '20.000', viewValue: 'Pizza'},
    {value: '5.000', viewValue: 'Tacos'}
  ];


  constructor() { }

  getStates(): State[] {
    return this.states;
  }

  getFood(): Food[] {
    return this.foods;
  }

  searchFood(searched: string): Food {
    return this.foods.find(data => data.viewValue === searched);
  }
}
