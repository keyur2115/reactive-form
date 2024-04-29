import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  employeeData:any = [];

  constructor(private apiSerive: ApiService,
              private router: Router){}

  ngOnInit():void {
    //calling the get api to fetch all Employee data
    this.getEmployee();
  }

  // Api fuction to fetch Employee data
  getEmployee(){
    this.apiSerive.getApi().then((res:any) => {
      if(res){
        this.employeeData = res;
      } else {
        console.log("error in response in api")
      }
    }, (err) => {
       console.log("Error in get Employee api", err.message);
    })
  }

  updateEmployee(emp:any){
    this.router.navigate(['/product-form'])
  }


  deleteEmployee(id:any, index:any){

  }

}
