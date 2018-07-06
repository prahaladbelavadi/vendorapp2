import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from './auth';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { environment } from '../config/environment';

let url = environment.url;

@Injectable()
export class ServerlessWallet {

  url : string;
  constructor(public http: Http, 
        private storage: Storage,
	public authService: Auth) {
     this.url = url;

  }

  getWallet(){

    return new Promise((resolve, reject) => {

      this.storage.get('wallet').then((val) => {
        console.log('Your age is', val);
          resolve(val);
      }, (err) => {
          reject(err);

     });

    });

  }

  createWallet(todo){
      this.storage.set('wallet', todo);
  }

  updateWallet(todo){
      this.storage.set('wallet', todo);
  }


}
