import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from './auth';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';


import { environment } from '../config/environment';

let url = environment.url;

@Injectable()
export class ServerlessPayment {

  url : string;
  constructor(public http: Http, 
        private storage: Storage,
	public authService: Auth) {
     this.url = url;

  }

  getPaymentsMade(){

    return new Promise((resolve, reject) => {

      this.storage.get('paymentsmade').then((val) => {
        console.log('Your age is', val);
          resolve(val);
      }, (err) => {
          reject(err);

     });

    });

  }

  getPaymentMade(txid){

    return new Promise((resolve, reject) => {

      this.storage.get('paymentsmade').then((val) => {
        console.log('Your age is', val);
          resolve(val[txid]);
      }, (err) => {
          reject(err);

     });

    });

  }

  getPaymentsReceived(){

    return new Promise((resolve, reject) => {
      this.storage.get('paymentsreceived').then((val) => {
        console.log('Your age is', val);
          resolve(val);
      }, (err) => {
          reject(err);

     });

    });

  }

  getPaymentReceived(txid){

    return new Promise((resolve, reject) => {
      this.storage.get('paymentsreceived').then((val) => {
        console.log('Your age is', val);
          resolve(val[txid]);
      }, (err) => {
          reject(err);

     });

    });

  }


  createPaymentReceived(paymentdata){


    return new Promise((resolve, reject) => {

         this.storage.set('paymentsreceived', paymentdata);
          resolve(0);

    });

  }
  
  createPaymentSent(paymentdata){


    return new Promise((resolve, reject) => {

         this.storage.set('paymentsmade', paymentdata);
          resolve(0);

    });

  }

}
