import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JarwisService } from '../service/jarwis.service';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';
declare var $: any;
export interface Gender {
  value: string;
  viewValue: string;
}
export interface Town {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
 
  public form = {
    email: null,
    firstname: null,
    lastname: null,
    middlename: null,
    family: 'family',
    familybackground: null,
    gender: 'Male',
    address: null,
    town: 'Abeokuta',
    phone:null,
    password: null,
    password_confirmation: null,
    role_id:null
  };
 
  public error: any;
  public gender;
  response: Object;
  roleid: any;
  public res;
  options: { name: string; value: number; }[];
  constructor( private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router) { }
    Genders: Gender[] = [
      {value: 'Miss', viewValue: 'Miss'},
      {value: 'Mr', viewValue: 'Mr'},
      {value: 'Mrs', viewValue: 'Mrs'}
    ];
    Towns: Town[] = [
      {value: 'Abeokuta', viewValue: 'Miss'},
      {value: 'Egba', viewValue: 'Egba'},
      {value: 'Ota', viewValue: 'Ota'}
    ];
    onSubmit() {
      // this.form.town='Abeokuta'
      // this.form.gender="Miss"
      this.form.role_id=1
      console.log(this.form)
      this.Jarwis.signup(this.form).subscribe(
        // data =>console.log(data),
        data => this.handleResponse(data),
        error => this.handleError(error),         
      );
    }
    handleResponse(data) {
      this.Token.handle(data.access_token);
      this.router.navigateByUrl('/User/(side:Details)');
    }
  
    handleError(error) {
      this.error = error.error.errors;
      console.log(this.error);
    }
    displayroleuser(){
      this.Jarwis.roleuser().subscribe(
        data=>{
        // console.log(data);
        this.res = data;
        
        this.roleid=this.res[0]
        console.log(this.roleid.id)
        }
      )
    }    
 
  ngOnInit() {   
    
  // this.options = [
  //   { name: "option1", value: 1 },
  //   { name: "option2", value: 2 }
  // ] 
    this.displayroleuser()
    
  
}


}