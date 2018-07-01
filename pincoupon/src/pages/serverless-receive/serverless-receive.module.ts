import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServerlessReceivePage } from './serverless-receive';

@NgModule({
  declarations: [
    ServerlessReceivePage,
  ],
  imports: [
    IonicPageModule.forChild(ServerlessReceivePage),
  ],
})
export class ServerlessReceivePageModule {}
