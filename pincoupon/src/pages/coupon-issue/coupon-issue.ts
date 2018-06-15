import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Coupon } from '../../providers/coupon';
import { Bitcoin } from '../../providers/bitcoin';
import { Manager } from '../../providers/manager';

/**
 * Generated class for the CouponIssuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coupon-issue',
  templateUrl: 'coupon-issue.html',
})
export class CouponIssuePage {


  coupons: any;
  coupon: any;
  balance: any;
  loading: any;
  coupondata: any;
  availablePlans: any;

  constructor(public navCtrl: NavController, public couponService: Coupon, 
              public managerService: Manager,
              public bitcoinService: Bitcoin,
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {

    this.coupondata = {
            couponid: '',
            coupontype: '',
            couponplan: '',
	    couponvalue: '',
            couponpin: ''
    };
    this.availablePlans = '';
    this.balance = '';
    this.getAvailablePlans();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CouponIssuePage');
  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Working...'
    });

    this.loading.present();

  }

  checkFunds() {
    var fundaddress = '2N43g2SV2PRp3FJUZ92NHDYY36QckV6mSP9';
    this.bitcoinService
      .getBalances(fundaddress).subscribe(posts  => {
      this.balance = posts;
    }, error => {
        console.log(error);
    });
  }
 
  createPIN()
  {
    var length = 5;
    this.coupondata.couponpin  = Math.random().toString().substr(2, length);
  }
  
  createCouponId()
  {
    this.coupondata.couponid = this.bitcoinService.getRandomPubkey();
  }
  
  couponCreate() {
    this.showLoader();

   this.couponService.createCoupon(this.coupondata).then((result) => {
                this.loading.dismiss();
                this.coupon = result;
                                        console.log("coupon created");
                                }, (err) => {
                this.loading.dismiss();
                                        console.log("not allowed"+ err);
                                });
  }

  getCoupon() {
    this.showLoader();

   var coupondata = {
        name: 'test'
   };
   this.couponService.getCoupon(coupondata).then((result) => {
                this.loading.dismiss();
                this.coupon = result;
                                        console.log("coupon created");
                                }, (err) => {
                this.loading.dismiss();
                                        console.log("not allowed"+ err);
                                });
  }

  getAvailablePlans() {

   var vendorid = 10;

   this.managerService.getAvailablePlans(vendorid).then((result) => {
                this.availablePlans = result;
                console.log("got plans");
                       }, (err) => {
                console.log("getting plans failed "+ err);
                });
  }
  
  activateCoupon(coupon){

    this.showLoader();

    var pauseactivate = {
	activate : true,
	pause: false,
        couponid : 1
    };

    this.couponService.pauseActivateCoupon(pauseactivate).then((result) => {

      this.loading.dismiss();

      //Remove locally
                let index = this.coupons.indexOf(coupon);

                if(index > -1){
                        this.coupons.splice(index, 1);
                }

    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }

  pauseCoupon(coupon){

    this.showLoader();

    var pauseactivate = {
	activate : false,
	pause: true,
        couponid : 1
    };

    this.couponService.pauseActivateCoupon(pauseactivate).then((result) => {

      this.loading.dismiss();

      //Remove locally
                let index = this.coupons.indexOf(coupon);

                if(index > -1){
                        this.coupons.splice(index, 1);
                }

    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }
  
  getCouponBalance(coupon){

    this.showLoader();

    var coupondata = {
        activate : false,
        pause: true,
        couponid : 1
    };

    this.couponService.getcouponBalance(coupondata).then((result) => {

      this.loading.dismiss();
      this.balance = result;


    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }



  
}
