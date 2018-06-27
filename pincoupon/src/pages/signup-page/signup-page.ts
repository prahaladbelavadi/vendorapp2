import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';
import { environment } from '../../config/environment';

let termsurl = environment.termsurl;

@Component({
  selector: 'signup-page',
  templateUrl: 'signup-page.html'
})
export class SignupPage {

  role: string;
  email: string;
  password: string;
  loading : any;
  termsurl : any;

  constructor(public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController) {

     this.termsurl = termsurl;
  }

  ionViewDidLoad() {

  }

  register(){

    this.showLoader();

  	let details = {
  	    email: this.email,
  	    password: this.password,
  	    role: this.role
  	};

  	this.authService.createAccount(details).then((result) => {
      this.loading.dismiss();
      console.log(result);
      this.navCtrl.setRoot(HomePage);
  	}, (err) => {
  		this.loading.dismiss();
  	});

  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }

}
