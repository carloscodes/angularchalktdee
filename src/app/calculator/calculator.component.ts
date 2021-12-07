import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
}

interface Goal {
  value: number; 
  viewValue: string;
}

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;


  selectedGender!: string;
  selectedHeight!: string;
  selectedActivity!: string;
  selectedGoal!: number;
  resultsReady = false;
  btnText = 'Calculate';

  // values to display
  selectedHeightDisplay = '';
  selectedActivityDisplay = '';
  selectedGoalDisplay = '';

  // lean bulk: 1.1
  //traditional: 1.2
  // fat loss: .75
  // maintenance: 1
  goalArray = [1.1, 1.2, .75, 1];

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
    {aValue: 1.2, value: 'Sedentary(Office Job)'},
    {aValue: 1.375, value: 'Light Exercise (1-2 times/week)'},
    {aValue: 1.55, value: 'Moderate Exercise (3-5times/week)'},
    {aValue: 1.725, value: 'Heavy Exercise (6-7 times/week)'},
    {aValue: 1.9, value: 'Athlete (Twice/day)'},
  ];

  goals: Goal[] = [
    {value: 1, viewValue: 'Lean Bulk (110% Surplus)'},
    {value: 2, viewValue: 'Traditional Bulk (120% Surplus)'},
    {value: 3, viewValue: 'Fat Loss (25% Deficit)'},
    {value: 4, viewValue: 'Maintenance'},
  ];



  constructor(private snack: MatSnackBar, private _formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
  }

  showHideResults(el: HTMLElement) {
    // validate that all fields have been entered
    if(this.selectedGender && this.selectedHeight && this.selectedActivity && this.selectedGoal){
      
    this.resultsReady = !this.resultsReady;
    this.btnText = this.resultsReady ? 'Reset' : 'Calculate';


    // TO DO: use values to calculate BMR
    // TO DO: use values to calculate TDEE
    // TO DO: use values to calculate daily calories
    // TO DO: use values to calculate macros
    // TO DO: use values to calculate macros per day
    // TO DO: use values to calculate macros per week

    // TO DO: update to display values

    this.showRealValues();
    el.scrollIntoView({behavior: 'smooth'});
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

    console.log(this.firstFormGroup.get('firstCtrl')!.value);
    console.log(this.secondFormGroup.get('secondCtrl')!.value);
    console.log(this.thirdFormGroup.get('thirdCtrl')!.value);

    this.selectedHeightDisplay = h.ftIn;
    this.selectedActivityDisplay = a.value;
    this.selectedGoalDisplay = g.viewValue;
  }

}
