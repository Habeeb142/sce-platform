import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../service/jarwis.service';
import { Router, ActivatedRoute } from '@angular/router';
import {map} from 'rxjs/operators';
import {} from 'googlemaps';
import { ViewChild } from '@angular/core';
import { MapServiceService } from '../map-service.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  res: any;
  response: any;
  contents: any;
  actname: any;
  catname: any;
  image: any;
  name: any;
public detail;
public data;
map: google.maps.Map;
id: any;
  bio: any;
  public form = {
    comment: null,
    title_id: null,
   
  };
  comment: any;
constructor(private Jarwis: JarwisService,public snackBar: MatSnackBar,private router: Router, public actRoute: ActivatedRoute, private coordGet: MapServiceService) { }
@ViewChild('map') mapElement: any;



onSubmit() {
  let token=localStorage.getItem('token')
//  alert(token)
  if (token==null){
    let snackBarRef = this.snackBar.open('Please, Login to proceed', 'Dismiss', {
      duration: 4000
    })
  this.router.navigateByUrl('/Login');
  }
  else{
   
    console.log(this.form)
     this.Jarwis.comment(this.form).subscribe(
    // data =>console.log(data),
    data => this.handleResponse(data),
    error => this.handleError(error)
  );
  }
 
 
}
handleResponse(data) {
  let snackBarRef = this.snackBar.open('Comment Successfully', 'Dismiss', {
    duration: 2000
  })
  
}

handleError(error) {
  // this.error = error.error.errors;
}
  ngOnInit() {

    this.actRoute.paramMap.subscribe((params => {  
      
      var id= this.actRoute.snapshot.params['id'];
      // id = data[x].id;
     
      
      // console.log(id)

      if(typeof params.get('id') == 'string') { 
        
        console.log(id)
        
        this.Jarwis.getalltitle().subscribe(data=>{
            for(let x in data){
              data[x]              
              if(data[x].name_title==params.get('id') || data[x].location==params.get('id')){
                this.detail = data[x];                
                id = data[x].id;
                
                    this.Jarwis.getcontent(id).subscribe(data=>{
                    this.response = data;
                   
                    this.res=this.response.name[0];
                    this.actname=this.res.actname;
                    this.catname=this.res.catname;
                    this.form.title_id=this.res.id;
                    this.bio=this.res.familybackground;
                    this.name=this.res.firstname+" "+this.res.lastname+" "+this.res.middlename
                    // console.log(this.response.content[0].location)
                    this.contents=this.response.content
                    this.comment=this.response.comment
                    // console.log(this.contents);
                    
                    //map Init
                    this.coordGet.getLocality(this.response.content[0].location).subscribe(data=>{
                      this.data = data;
                
                      let lat = this.data.results[0].geometry.location.lat;
                      let long = this.data.results[0].geometry.location.lng;
                      console.log('lat= '+ lat +' and long= '+ long );

                      this.map = new google.maps.Map(document.getElementById('map'), {
                        center: {lat: lat, lng:  long},
                        zoom: 10,
                        panControl: true,
                        mapTypeControl: false,
                        scaleControl: true,
                        streetViewControl: false,
                        // overviewMapControl: true,
                        rotateControl: true,
                        //mapTypeId: google.maps.mapTypeId.ROADMAP
                      })
                  })
                    
                    this.image='https://sabiogun.jtcheck.com/sce-ogun/backend/public/upload//'+this.res.t_image
                      // console.log(this.sdet);
                    })
                
              }

              else {
                console.log(id)
          
                // var id = params.get('id');
                this.Jarwis.getcontent(id).subscribe(data=>{
                  this.response = data;
                  console.log(this.response)
                  this.res=this.response.name[0];
                  this.actname=this.res.actname;
                  this.catname=this.res.catname;
                  this.bio=this.res.familybackground;
                  this.form.title_id=this.res.id;
                  this.name=this.res.firstname+" "+this.res.lastname+" "+this.res.middlename
                  console.log(this.response.content[0].location)
                  this.contents=this.response.content
                  console.log(this.contents);
                  this.comment=this.response.comment
                  //map Init
                  this.coordGet.getLocality(this.response.content[0].location).subscribe(data=>{
                    this.data = data;
              
                    let lat = this.data.results[0].geometry.location.lat;
                    let long = this.data.results[0].geometry.location.lng;
                    console.log('lat= '+ lat +' and long= '+ long );
      
                    this.map = new google.maps.Map(document.getElementById('map'), {
                      center: {lat: lat, lng:  long},
                      zoom: 10,
                      panControl: true,
                      mapTypeControl: false,
                      scaleControl: true,
                      streetViewControl: false,
                      // overviewMapControl: true,
                      rotateControl: true,
                      //mapTypeId: google.maps.mapTypeId.ROADMAP
                    })
                })
                  
                  this.image='https://sabiogun.jtcheck.com/sce-ogun/backend/public/upload/uploads/'+this.res.t_image
                    // console.log(this.sdet);
                  })
              }

            }
          })
          
        }

        

    // this.Jarwis.productdetail1(id).subscribe(data=>{
    //   this.response1 = data;
      
    // })
    // this.Jarwis.productdetail2(id).subscribe(data=>{
    //   this.response2 = data;
     

   }));
   
   
  }
  navigate(id){
    this.router.navigate(['Content/'+id+''])
  }
}
