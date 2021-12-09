import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TdeeserviceService } from '../tdeeservice.service';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';


interface Gender {
  value: string;
  viewValue: string;
}

interface Height {
  cmValue: number;
  ftIn: string;
}

interface Activity {
  aValue: number;
  value: string;
  position: number;
}

interface Goal {
  value: number; 
  viewValue: string;
}

export interface Results {
  activity: string;
  calories: number;
}


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  faBookmark = faBookmark;
  faInstagram = faInstagram;
  faFacebook = faFacebook;
  faYouTube = faYoutube;
  faTiktok = faTiktok;

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;


  selectedGender!: string;
  selectedHeight!: string;
  selectedActivity!: string;
  selectedGoal!: number;
  resultsReady = false;
  btnText = 'Calculate';

  wantsInfo = false;

  // values to display
  selectedHeightDisplay = '';
  selectedActivityDisplay = '';
  selectedGoalDisplay = '';

  chosenGoal!: number;

  // lean bulk: 1.1
  //traditional: 1.2
  // fat loss: .75
  // maintenance: 1
  goalArray = [1.1, 1.2, .75, 1];
  carbsCalories = 0;
  carbsGrams = 0;

  proteinCalories = 0;
  proteinGrams = 0;

  fatCalories = 0;
  fatGrams = 0;


  displayedColumns: string[] = ['activity', 'calories/day'];

  DATA: Results[] = [];

  dataSource: any[] = [];

  genders: Gender[] = [
    {value: 'male', viewValue: 'Male'},
    {value: 'female', viewValue: 'Female'},
  ];

  heights: Height[] = [
    {cmValue: 139.7 , ftIn: '4ft. 7in.'},
    {cmValue: 142.2, ftIn: '4ft. 8in.' },
    {cmValue: 144.8, ftIn: '4ft. 9in.'  },
    {cmValue: 147.3, ftIn: '4ft. 10in.'},
    {cmValue: 149.9, ftIn: '4ft. 11in.' },
    {cmValue: 152.4, ftIn: '5ft. 0in.'},
    {cmValue: 154.9, ftIn: '5ft. 1in.' },
    {cmValue: 157.5, ftIn: '5ft. 2in.'  },
    {cmValue: 160.0, ftIn: '5ft. 3in.'},
    {cmValue: 162.6, ftIn: '5ft. 4in.' },
    {cmValue: 165.1, ftIn: '5ft. 5in.'  },
    {cmValue: 167.6, ftIn: '5ft. 6in.'},
    {cmValue: 170.2, ftIn: '5ft. 7in.' },
    {cmValue: 172.7, ftIn: '5ft. 8in.'  },
    {cmValue: 175.3, ftIn: '5ft. 9in.'},
    {cmValue: 177.8, ftIn: '5ft. 10in.' },
    {cmValue: 180.3, ftIn: '5ft. 11in.' },
    {cmValue: 182.9, ftIn: '6ft. 0in.'},
    {cmValue: 185.4, ftIn: '6ft. 1in.' },
    {cmValue: 188.0, ftIn: '6ft. 2in.'  },
    {cmValue: 190.5, ftIn: '6ft. 3in.'},
    {cmValue: 193.0, ftIn: '6ft. 4in.' },
    {cmValue: 195.6, ftIn: '6ft. 5in.'  },
    {cmValue: 198.1, ftIn: '6ft. 6in.'},
    {cmValue: 200.7, ftIn: '6ft. 7in.' },
    {cmValue: 203.2, ftIn: '6ft. 8in.'  },
    {cmValue: 205.7, ftIn: '6ft. 9in.'},
    {cmValue: 208.3, ftIn: '6ft. 10in.' },
    {cmValue: 210.8, ftIn: '6ft. 11in.' },
    {cmValue: 213.4, ftIn: '7ft. 0in.'},
  ]

  activities: Activity[] = [
    {aValue: 1.2, value: 'Sedentary(Office Job)', position: 0},
    {aValue: 1.375, value: 'Light Exercise (1-2 times/week)', position: 1},
    {aValue: 1.55, value: 'Moderate Exercise (3-5times/week)', position: 2},
    {aValue: 1.725, value: 'Heavy Exercise (6-7 times/week)', position: 3},
    {aValue: 1.9, value: 'Athlete (Twice/day)', position: 4},
  ];

  goals: Goal[] = [
    {value: 1, viewValue: 'Lean Bulk (110% Surplus)'},
    {value: 2, viewValue: 'Traditional Bulk (120% Surplus)'},
    {value: 3, viewValue: 'Fat Loss (25% Deficit)'},
    {value: 4, viewValue: 'Maintenance'},
  ];


  displayValues: any[] = [];
  displayMaintenance!: number;
  displayMaintenance2!: number;

  constructor(private spinner: NgxSpinnerService,private servce: TdeeserviceService, private snack: MatSnackBar, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

  }

  showInfo() {
    this.wantsInfo = !this.wantsInfo;
  }

  showResults(el: HTMLElement) {
    if(this.btnText === 'Reset'){
      this.resultsReady = !this.resultsReady;
      this.btnText = 'Calculate';
      this.resetValues();
      return;
    }
    // validate that all fields have been entered
    if(this.selectedGender && this.selectedHeight && this.selectedActivity && this.selectedGoal){
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 700);
      
    this.resultsReady = !this.resultsReady;
    this.btnText = 'Reset';


    this.showRealValues();
    el.scrollIntoView({behavior: 'smooth'});
    this.snack.open('Results ready below!', '', {
      duration: 3000,
    });
    } else {
      this.snack.open('Missing field(s)', 'x', {
        duration: 3000
      });
    }

  }


  showRealValues(){
    let g = this.goals.find(o => o.value === this.selectedGoal)!;
    console.log(g);
    
    let h = this.heights.find(o => o.cmValue === Number(this.selectedHeight))!;
    console.log(h);

    let a = this.activities.find(o => o.aValue === Number(this.selectedActivity))!;
    console.log(a);

    let gndr = this.genders.find(o => o.value === this.selectedGender)!;
    console.log(gndr);

    let age = this.firstFormGroup.get('firstCtrl')!.value;
    let weight = this.secondFormGroup.get('secondCtrl')!.value;

    this.selectedHeightDisplay = h.ftIn;
    this.selectedActivityDisplay = a.value;
    this.selectedGoalDisplay = g.viewValue;

    this.chosenGoal = g.value;

    this.doCalculations(age, weight, gndr.value, h.cmValue, a.position);
    this.calculateSplit(g.value);
  }

  resetValues(){
    this.selectedHeight = '';
    this.selectedActivity = '';
    this.selectedGoal = 0;
    this.selectedGender = '';
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.displayValues = [];
    this.displayMaintenance = 0;
    this.displayMaintenance2 = 0;
    this.DATA = [];
    this.servce.arr = [];
    this.servce.maintenance = 0;
  }

  doCalculations(age: any, weight: any, gender: any, height: any, activity: any){
    this.servce.calculateTdee(age, weight, gender, height, activity);
    this.displayValues = this.servce.arr;
    this.displayMaintenance = this.servce.maintenance;

    this.DATA = [{activity: 'Basal Metabolic Rate', calories: this.displayValues[0]},
    {activity: 'Sedentary', calories: this.displayValues[1]},
    {activity: 'Light Exercise', calories: this.displayValues[2]},
    {activity: 'Moderate Exercise', calories: this.displayValues[3]},
    {activity: 'Heavy Exercise', calories: this.displayValues[4]},
    {activity: 'Athlete', calories: this.displayValues[5]},];

    this.dataSource = this.DATA;

    console.log('loggin correctly in doCalculations() ?'+ this.displayValues + ' '+ this.displayMaintenance);
  }

  calculateSplit(goal: any){
    switch (goal) {
      case 1: 
        this.displayMaintenance2 = Math.round(this.displayMaintenance  * this.goalArray[0]);
        this.carbsCalories = Math.round(this.displayMaintenance2 * .55);
        this.carbsGrams = Math.round(this.carbsCalories/4);
        this.proteinCalories = Math.round(this.displayMaintenance2 * .25);
        this.proteinGrams = Math.round(this.proteinCalories/4);
        this.fatCalories = Math.round(this.displayMaintenance2 * .2);
        this.fatGrams = Math.round(this.fatCalories/9);
        break;
    
      case 2:
        this.displayMaintenance2 = Math.round(this.displayMaintenance  * this.goalArray[1]);
        this.carbsCalories = Math.round(this.displayMaintenance2 * .55);
        this.carbsGrams = Math.round(this.carbsCalories/4);
        this.proteinCalories = Math.round(this.displayMaintenance2 * .25);
        this.proteinGrams = Math.round(this.proteinCalories/4);
        this.fatCalories = Math.round(this.displayMaintenance2 * .2);
        this.fatGrams = Math.round(this.fatCalories/9);
        break;

      case 3:
        this.displayMaintenance2 = Math.round(this.displayMaintenance  * this.goalArray[2]);
        this.carbsCalories = Math.round(this.displayMaintenance2 * .4);
        this.carbsGrams = Math.round(this.carbsCalories/4);
        this.proteinCalories = Math.round(this.displayMaintenance2 * .4);
        this.proteinGrams = Math.round(this.proteinCalories/4);
        this.fatCalories = Math.round(this.displayMaintenance2 * .2);
        this.fatGrams = Math.round(this.fatCalories/9);
        break;

      case 4:
        this.displayMaintenance2 = Math.round(this.displayMaintenance  * this.goalArray[3]);
        this.proteinGrams = this.secondFormGroup.get('secondCtrl')!.value;
        this.proteinCalories = this.proteinGrams * 4;
        break;

      default:
        console.log('goal default');
        break;
    }
  }

}
