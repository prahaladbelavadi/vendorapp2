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
  selector: 'page-serverless-receive',
  templateUrl: 'serverless-receive.html',
})
export class ServerlessReceivePage {


  payments: any;
  payment: any;
  balance: any;
  wallet: any;
  loading: any;
  serverless: any;
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

       this.serverless = {
            receivedqrcode: '',
            receivedstring: '',
            receivedtxid: '',
            receivedpincode: '',
            receivedaddress: '',
            receivedamount: ''
       };

       this.balance = {
            address: '',
            balance: '',
            unconfirmed_balance: ''
       };
       this.wallet = {
            address: '',
            balance: '',
            unconfirmed_balance: ''
       };

       this.acceptdata = {
            paymentpin: '',
            paymentmetadata: '',
            acceptaddress: ''
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
 
  receiveFund(){
 
    var stub = JSON.parse(this.serverless.receivedstring); 
    stub.moneydata.randompin = this.serverless.receivedpincode;
    var address=stub.address;
    var uid= new foo.Buffer.Buffer(stub.uidkey, 'hex');



     this.showLoader();

     this.serverlessService.receiveFund(stub, uid, address ).then ((result) => {
 
       this.loading.dismiss();
       this.serverless.receivedtxid = result;
 
     }, (err) => {
       this.loading.dismiss();
      console.log("err="+ err);
     });

  
  }
}
