import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { ContentComponent } from './content/content.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { AccountComponent } from './user/account/account.component';
import { BeforeLoginService } from './service/before-login.service';
import { AfterLoginService } from './service/after-login.service';
import { DetailsComponent } from './user/details/details.component';
import { ProfileComponent } from './user/profile/profile.component';
import { PostComponent } from './user/post/post.component';
import { MypostComponent } from './user/mypost/mypost.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'Login', component: LoginComponent,canActivate: [BeforeLoginService] },
  {path: 'Signin', component: SigninComponent,canActivate: [BeforeLoginService] },
  {path: 'User', component: AccountComponent,canActivate: [AfterLoginService], 

  children: [
    
         {path: 'Profile', component: ProfileComponent, outlet: 'side',canActivate: [AfterLoginService]},
         {path: 'Details', component: DetailsComponent, outlet: 'side',canActivate: [AfterLoginService] },
         {path: 'Post', component: PostComponent, outlet: 'side',canActivate: [AfterLoginService] },
         {path: 'Mypost', component: MypostComponent, outlet: 'side' ,canActivate: [AfterLoginService]}
     ],
        },

  {path: 'Category', component: CategoryComponent},
  {path: 'Content/:id', component: ContentComponent },
  {path: 'addcat', component:  AddcategoryComponent },
  {path: 'About', component:  AboutComponent },
  {path: 'Contact', component:  ContactComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }