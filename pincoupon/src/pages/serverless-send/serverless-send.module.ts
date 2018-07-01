import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServerlessSendPage } from './serverless-send';

@NgModule({
  declarations: [
    ServerlessSendPage,
  ],
  imports: [
    IonicPageModule.forChild(ServerlessSendPage),
  ],
})
export class ServerlessSendPageModule {}
