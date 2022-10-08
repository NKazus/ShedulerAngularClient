import { Injectable } from '@angular/core';
import { IApi } from './api.interface';


@Injectable({
  providedIn: 'root'
})
export class TaskParameterService {
  public apis:Array<IApi> = [{type:1, name:'Weather',holder:'PLACE'},{type:2, name:'Currency',holder:'CURRENCY'},{type:3, name:'Airport',holder:'IATA'}];
  chosenType:string=this.apis[0].holder;

  constructor() { }

  changeTaskParameter(parameterValue:number){
    this.chosenType=this.apis[parameterValue-1].holder;
  }
}
