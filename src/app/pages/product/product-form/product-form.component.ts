import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  employeeForm !:FormGroup;

  hobbies = [
    { label: "Reading", value: "reading" },
    { label: "Hiking", value: "hiking" },
    { label: "Cooking", value: "cooking" },
    { label: "Gaming", value: "gaming" }
  ];

 techOptions = [
    { label: "JavaScript", value: "javascript" },
    { label: "Python", value: "python" },
    { label: "Java", value: "java" },
    { label: "C#", value: "csharp" }
  ];

  constructor(private fb: FormBuilder){
    this.employeeForm = this.fb.group({
      name:[''],
      email:[''],
      dob:[''],
      gender:[''],
      hobby:[this.fb.array([])]
    })
  }

  ngOnInit():void {

  }
}
