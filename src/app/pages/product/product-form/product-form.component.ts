import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @ViewChild('currentWorking', {static:true}) currentWorking !: ElementRef;
  employeeForm !:FormGroup;
  employeeUpdateId:any;
  submitted:boolean = false;
  employeeImage:any = null;
  checkedObj:any = {};

  hobbies = [
    { label: "Reading", value: "reading", isChecked: false },
    { label: "Hiking", value: "hiking", isChecked: false },
    { label: "Cooking", value: "cooking", isChecked: false },
    { label: "Gaming", value: "gaming", isChecked: false }
  ];

 techOptions = [
    { label: "JavaScript", value: "javascript" },
    { label: "Python", value: "python" },
    { label: "Java", value: "java" },
    { label: "C#", value: "csharp" }
  ];

  constructor(private fb: FormBuilder, 
              private apiService: ApiService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private el: ElementRef){}

  ngOnInit():void {

    // employeeForm START
    this.employeeForm = this.fb.group({
      id:[''],
      name:['', ],
      email:['', [Validators.required, Validators.email]],
      dob:['', Validators.required],
      gender:['', Validators.required],
      tech:['', Validators.required],
      image:[''],
      hobbies:new FormArray([]),
      address: this.fb.group({
        street:['', Validators.required],
        city:['', Validators.required],
        state:['', Validators.required], 
        zip:['', Validators.required]
      }),
      education: this.fb.array([this.fb.control('', Validators.required)]),
      experience:this.fb.array([])
    }) // --- END ----

    // getting the id from queryParams
    this.employeeUpdateId = this.activatedRoute.snapshot.queryParams['id'];

    if(this.employeeUpdateId){
      this.getEmployeeById();
    }
  }

 // --- add hobby value from checkbox functionality
  get hobbyArray(){
    return this.employeeForm.get('hobbies') as FormArray;
  }
  

  onChangeHobby(event:any, item:any){
    let hobbyArray = this.employeeForm.get('hobbies') as FormArray;

    if(event.target.checked){
      hobbyArray.push(new FormControl(event.target.value))
    } else {
      let index = 0;
      hobbyArray.controls.forEach((ctrl:any) => {
        if(ctrl.value == event.target.value){
          hobbyArray.removeAt(index)
        }
        index++;
      })
    }
  }

  updateCheckbox(){
    console.log("this.hobbyArray", this.employeeForm)
    this.hobbyArray.controls.forEach((item:any) => {
      this.checkedObj.item = true;
    })
  }

// ----START education form control dynamically add remove functinality ----------
  get education() {
    return this.employeeForm.get('education') as FormArray;
  }

  addEducation(){
    this.education.push(new FormControl(''));
  }

  removeEducation(i:any){
    if(this.education.controls.length > 1){
      this.education.removeAt(i)
    }
  } // ---- end of education form control add remove------------

  //START experience form control manupulation dynamically functionality

  get experience(){
    return this.employeeForm.get('experience') as FormArray;
  }

  addExperience(){
    let frmGroup = this.fb.group({
      companyName: ['', Validators.required],
      curretlyWork: [false],
      position: [''],
      startDate: ['', Validators.required],
      endDate: ['']
    });

    this.experience.push(frmGroup);
}

  removeExperience(i:number){
    this.experience.removeAt(i);
  }

  onCurrentWork(event:any, exp:any){
    console.log("exp>>>", exp);
    if(event.target.checked){
      exp.controls.endDate.reset();
      exp.controls.endDate.value = "";
    }
  }

  // ------------------ End Experience --------------------------


 // Add Employee api call
  saveEmployee(){
    this.submitted = true;
    if(this.employeeForm.valid){

      this.apiService.addApi(this.employeeForm.value).subscribe((res:any) => {
        if(res){
          this.router.navigate(['/product']);
        } else {
          console.log("Problem in getting response in add api of save employee");
        }
      }, (err) => {
         console.log("Error in add api", err);
      })

    }
  }

  // function to get employee data based on id 
  getEmployeeById(){
    this.apiService.getApiById(this.employeeUpdateId).subscribe((res:any) => {
      console.log("res by id", res);
      console.log("experience ***>", this.experience);
      this.updateCheckbox();
       
      if(res){
        this.employeeForm.patchValue({
          id: res.id,
          name: res.name,
          email: res.email,
          dob: res.dob,
          gender:res.gender,
          tech: res.tech,
          image:res.image,
          hobbies: res.hobbies,
          address: {
            street: res.address.street,
            city:res.address.city,
            state:res.address.state, 
            zip:res.address.zip
          },
        })

        if(res.education && res.education?.length){
          this.education.removeAt(0)
          res.education.forEach((item:any) => {
            this.education.push(new FormControl(item))
          })
        }

        if(res.hobbies && res.hobbies?.length){
          res.hobbies.forEach((item:any) => {
            console.log("item", item);
            this.checkedObj[item] = true
          })
        }

        console.log("this.checkdObj", this.checkedObj)

        if(res.experience && res.experience?.length){
          res.experience.forEach((item:any, index:any) => {
            this.experience.push(this.fb.group({
              companyName:[item.companyName, Validators.required],
              position: [item.position, ],
              startDate: [item.startDate, ],
              endDate: [item.endDate],
              curretlyWork:[item.curretlyWork]
            }))
          })
        }
      }
    })
  }

  // populateHobbies(employeeHobbies: string[]) {
  //   if (employeeHobbies && employeeHobbies.length > 0) {
  //     employeeHobbies.forEach((hobby: any) => {
  //       const index = this.hobbies.indexOf(hobby);
  //       if (index !== -1) {
  //         (this.employeeForm.get('hobbies') as FormArray).push(new FormControl(true));
  //       }
  //     });
  //   }
  // }

  updateEmployee(){
    this.submitted = true;
    if(this.employeeForm.valid){
      this.apiService.updateApi(this.employeeUpdateId, this.employeeForm.value).subscribe((res:any) => {
         if(res){
          console.log("update res", res);
          this.router.navigate(['/product']);
         }
      })
    }
  }

  // image file add base64
  addImage(event:any){
    let file:any;
    if(event.target.files && event.target.files[0]){
      file = event.target.files[0];
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      console.log("reader111", reader);
      this.employeeImage = reader.result;
        this.employeeForm.patchValue({
           image: reader.result
        })
    }
  }

  


}
