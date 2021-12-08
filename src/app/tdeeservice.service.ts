import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TdeeserviceService {
  activityArr = [1.2, 1.375, 1.55, 1.725, 1.9];
  bmr = 0;
  maintenance!: number;

  arr: any[] = [];

  constructor() { }

    weightConversion(w: any){
      return w * 0.45359237;
    }

    calculateTdee(age: any, weight: any, gender: any, height: any, activity: any){
      weight = this.weightConversion(weight);
      
      if(gender === 'male'){
        this.bmr = this.men(weight, height, age);
        console.log('bmr: '+this.bmr);
      } else {
        this.bmr = this.female(weight, height, age);
        console.log('bmr: '+this.bmr);
      }

      console.log('is it this? '+this.activityArr[activity]);
      let res = this.bmr * this.activityArr[activity];
      this.maintenance = Math.round(res);
      this.bmr = Math.round(this.bmr);

      this.arr.push(this.bmr);

      for(let i = 0; i < 5; i++){
        if(this.maintenance - Math.round(this.bmr * this.activityArr[i]) === -1 || this.maintenance - Math.round(this.bmr * this.activityArr[i]) === 1){
          this.arr.push(this.maintenance);
        } else {
          this.arr.push(Math.round(this.bmr * this.activityArr[i]));
        }
      }

    }

    // both gender functions take in the same vars: weight, height, years depending on gender
    men(w: any, h: any, y: any) {
      // (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
      return 10 * w + 6.25 * h - 5 * y + 5;
    }
  
    female(w: any, h: any, y: any) {
      // (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
      return 10 * w + 6.25 * h - 5 * y - 161;
    }
  
    // takes in weight and body fat percentage
    lbm(w: any, bf: any) {
        return w * (100 - bf) / 100;
    }
  
    bmrWithBf(lbm: any){
        return 370 + 21.6 * lbm;
    }

}
