import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

declare var foo;

@Injectable()
export class Serverless {

  constructor(public http: Http) {

  var x = this.getCouponAddress();
  alert(x);
  }
  
  getCouponAddress()
  {
  
  var couponstub = {
   couponhash: 1,
   couponpin: 2
  };
  var keyPair = foo.bitcoin.ECPair.makeRandom();
  var uidkey =  keyPair.getPublicKeyBuffer();
  var globalnetwork = foo.bitcoin.networks.testnet;

  var Pin = JSON.stringify(couponstub);
  var Pinkey = Buffer.from(Pin);

   var docaddr = compositekeylib.getBufControlCodeAddress(Pinkey,
                uidkey,
                globalnetwork);
   console.log("docaddr = "+docaddr);

   return docaddr;
   }



  getRandomPubkey(){
    var keyPair = foo.bitcoin.ECPair.makeRandom();
    return keyPair.getPublicKeyBuffer().toString('hex');
  }

  getBalances(addr: any): any {

     var address = '2N43g2SV2PRp3FJUZ92NHDYY36QckV6mSP9'
      if(addr)
      {
             address = addr;
      }
     var url = 'https://api.blockcypher.com/v1/btc/test3/addrs/';
     return new Promise((resolve, reject) => {


     this.http.get(url+address+"/full").map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });


  }



}
