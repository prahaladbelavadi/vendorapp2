import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePageModule } from '../pages/home/home.module';
import { ListPageModule } from '../pages/list/list.module';
import { IonicStorageModule } from '@ionic/storage';
import { LoginPage } from '../pages/login-page/login-page';
import { SignupPage } from '../pages/signup-page/signup-page';
import { Todos } from '../providers/todos';
import { Manager } from '../providers/manager';
import { Coupon } from '../providers/coupon';
import { Auth } from '../providers/auth';
import { Bitcoin } from '../providers/bitcoin';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CouponIssuePageModule } from '../pages/coupon-issue/coupon-issue.module';
import { PlansPageModule } from '../pages/plans/plans.module';
import { CouponRedeemPageModule } from '../pages/coupon-redeem/coupon-redeem.module';
import { CouponAdminPageModule } from '../pages/coupon-admin/coupon-admin.module';
import { CouponsPageModule } from '../pages/coupons/coupons.module';
import { PlanviewPageModule } from '../pages/planview/planview.module';
import { CouponviewPageModule } from '../pages/couponview/couponview.module';


@NgModule({
  declarations: [
    MyApp,
    LoginPage, 
    SignupPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    HomePageModule,
    ListPageModule,
    PlansPageModule,
    PlanviewPageModule,
    CouponviewPageModule,
    CouponIssuePageModule,
    CouponsPageModule,
    CouponRedeemPageModule,
    CouponAdminPageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage, 
    SignupPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Todos, 
    Manager, 
    Coupon, 
    Bitcoin, 
    Auth,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
