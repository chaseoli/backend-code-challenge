import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransferComponent } from './transfer/transfer.component';
import { PrivateComponent } from './private.component';
import { CustomCarbonModule } from '../shared/custom-carbon-angular.module';
import { WalletComponent } from './wallet/wallet.component';
import { IdentityComponent } from './identity/identity.component';
import { PayComponent } from './pay/pay.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgTypedModule } from '../shared/modules/typed-module'
import { SessionService } from '../shared/services/session.service';
import { BalancesResolver } from '../shared/guards/balances.resolver';
import { SessionResolver } from '../shared/guards/session.resolver';
import { StellarSdkService } from '../shared/services/stellar.service';
import { LodashService } from '../shared/services/lodash.service';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { SwitcherComponent } from './switcher/switcher.component';
import { TradeComponent } from './trade/trade.component';
import { CustomLoadingComponent } from './../shared/components/loading.component';
import { ConvertModalComponent } from './wallet/convert/convert.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { SwapComponent } from './swap/swap.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TransferComponent,
    PrivateComponent,
    WalletComponent,
    IdentityComponent,
    PayComponent,
    QrcodeComponent,
    SwitcherComponent,
    TradeComponent,
    CustomLoadingComponent,
    ConvertModalComponent,
    AuthComponent,
    SwapComponent
  ],
  entryComponents: [
    ConvertModalComponent
  ],
  providers: [
    SessionService,
    LodashService,
    StellarSdkService,
    SessionResolver,
    BalancesResolver
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PrivateRoutingModule,
    QRCodeModule,
    ZXingScannerModule,
    FormsModule,
    ReactiveFormsModule,
    CustomCarbonModule,
    NgTypedModule
  ]
})
export class PrivateModule { }
