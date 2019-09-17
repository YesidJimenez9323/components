import {Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DataServiceService } from './data-service.service';
import { State } from './Dtos/state.model';
import { Food } from './Dtos/food.model';
import { MediaMatcher } from '@angular/cdk/layout';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  states: State[];
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;
  foods: Food[] = [];
  title = 'Componentes';
  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;
  formGroup: FormGroup;
  resultFood: Food;
  buscado: string;
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  private _mobileQueryListener: () => void;

  ngOnInit() {
    this.states = this.service.getStates();
    this.foods = this.service.getFood();
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      searchedValue: [null, [Validators.required, Validators.maxLength(30)]]
    });
  }


  constructor(private service: DataServiceService, private formBuilder: FormBuilder, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.filteredStates = this.stateCtrl.valueChanges
    .pipe(
      startWith(''),
      map(state => state ? this._filterStates(state) : this.states.slice())
    );

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  buscarComida() {
    this.buscado = this.formGroup.value.searchedValue;
    this.resultFood = this.service.searchFood(this.formGroup.value.searchedValue);
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
