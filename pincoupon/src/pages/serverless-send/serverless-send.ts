import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Payment } from '../../providers/payment';
import { Serverless } from '../../providers/serverless';

/**
 * Generated class for the PaymentAcceptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var foo;


@IonicPage()
@Component({
  selector: 'page-serverless-send',
  templateUrl: 'serverless-send.html',
})
export class ServerlessSendPage {


  payments: any;
  payment: any;
  balance: any;
  loading: any;
  serverless: any;
  sendingset: any;
  broadcasttx: any;
  paymentdata: any;
  acceptstatus: any; 
  acceptdata: any;

  constructor(public navCtrl: NavController, public paymentService: Payment, 
              public loadingCtrl: LoadingController,
              public serverlessService: Serverless,
              public navParams: NavParams) {

       this.paymentdata = {
            paymentid: ''
       };
       this.broadcasttx= '';

       this.serverless = {
            sendamount: '',
            sendqrcode: '',
            sendstring: '',
            sendtxid: '',
            sendaddress: ''
       };

       this.balance = {
            address: '',
            balance: '',
            unconfirmed_balance: ''
       };

       this.acceptdata = {
            paymentpin: '',
            paymentmetadata: '',
            acceptaddress: ''
       };
      this.sendingset = {
      address: '',
      uidkey: '',
      moneydata: ''
      };


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentIssuePage');
  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Working...'
    });

    this.loading.present();

  }
  

  getPayment() {
    this.showLoader();


   this.paymentService.getPaymentMade(this.paymentdata.paymentid).then((result: any) => {
                this.loading.dismiss();
//                alert(JSON.stringify(result));
                this.paymentdata = result;
    this.paymentdata.paymentaddress = '2N5ZyMz5xmt47znM9CCKnrLbXmymGLknus9' ;
                        console.log("payment retrieved");
                                }, (err) => {
                this.loading.dismiss();
                        console.log("payment retreive failed  "+ err);
                                });
  }
  
  acceptPayment(){

    this.showLoader();
    this.acceptdata.paymentmetadata = this.payment.paymentplan;
    // in this example extracted from payment

    this.paymentService.acceptPayment(this.payment, this.acceptdata).then((result) => {

      this.loading.dismiss();
      this.acceptstatus = result;


    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }

  
  getPaymentBalance(){

    this.showLoader();

    this.paymentdata.paymentaddress = '2N5ZyMz5xmt47znM9CCKnrLbXmymGLknus9' ;
    // AX_03138A00F
    this.paymentService.getPaymentBalance(this.paymentdata).then((result) => {

      this.loading.dismiss();
      this.balance = result;


    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }

  prepareToSend(){

    this.showLoader();
    this.sendingset = this.serverlessService.getSendingSet();
    //alert(JSON.stringify(this.sendingset));
    var removedpinset = this.sendingset; 
    removedpinset.moneydata.randompin = '';
    this.serverless.sendstring = JSON.stringify(removedpinset);
    this.serverless.sendqrcode = JSON.stringify(removedpinset);
    this.serverlessService.prepareToSend(this.serverless.sendamount, this.sendingset).then ((result) => {

      this.loading.dismiss();
      this.serverless.sendtxid = result;

    }, (err) => {
      this.loading.dismiss();
     console.log("err="+ err);
    });
 

  }

  
}
