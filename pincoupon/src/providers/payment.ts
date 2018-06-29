import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from './auth';
import 'rxjs/add/operator/map';

import { environment } from '../config/environment';

let url = environment.url;

@Injectable()
export class Payment {

  url : string;
  constructor(public http: Http, public authService: Auth) {
     this.url = url;

  }

  getPayments(){

    var tryurl = this.url + '/api/payment/getpayments' 
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get(tryurl, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });

  }

  getPayment(paymentid ){


    var tryurl = this.url + '/api/payment/getpayment/' + paymentid;
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get(tryurl, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });

  }

  createPayment(paymentdata){

    var tryurl = this.url + '/api/payment/createpayment/';

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post(tryurl ,JSON.stringify(paymentdata), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });

  }
  
  getPaymentBalance(paymentdata){


    var tryurl = this.url + '/api/payment/getpaymentBalance/';

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post(tryurl,JSON.stringify(paymentdata), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });

  }

  deletePayment(paymentid){

    var tryurl = this.url + '/api/payment/delete/' + paymentid;

  	return new Promise((resolve, reject) => {

	    let headers = new Headers();
	    headers.append('Authorization', this.authService.token);

	    this.http.delete(tryurl, {headers: headers}).subscribe((res) => {
	    	resolve(res);
	    }, (err) => {
	    	reject(err);
	    });    

  	});

  }


  acceptPayment(paymentdata, redeemdata){
    var paymentid =1;

    var tryurl = this.url + '/api/payment/redeem/' + paymentid;

  	return new Promise((resolve, reject) => {

	    let headers = new Headers();
	    headers.append('Authorization', this.authService.token);

           this.http.post(tryurl,JSON.stringify(paymentdata), {headers: headers})
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });


  	});

  }

  validatepayment(paymentdata){
    var paymentid =1;

    var tryurl = this.url + '/api/payment/validate/' + paymentid;

  	return new Promise((resolve, reject) => {

	    let headers = new Headers();
	    headers.append('Authorization', this.authService.token);

           this.http.post(tryurl,JSON.stringify(paymentdata), {headers: headers})
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });


  	});

  }
   pauseActivatePayment(pauseactivate){
    var paymentid =1;
    var tryurl = this.url + '/api/payment/pauseactivate/' + paymentid;

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post(tryurl ,JSON.stringify(pauseactivate), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });

  }

  getChargingBalance(){

 
    var tryurl = this.url + '/api/payment/getChargingBalance/';
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post(tryurl ,{}, {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });

  }

  getFeesBalance(){

 
    var tryurl = this.url + '/api/payment/getFeesBalance/';
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post(tryurl ,{}, {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });

  }
}
