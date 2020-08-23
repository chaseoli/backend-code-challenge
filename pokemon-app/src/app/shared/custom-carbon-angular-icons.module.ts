// see https://carbon-elements.netlify.com/icons/examples/preview/
// see https://www.carbondesignsystem.com/guidelines/icons/library
// see https://www.ibm.com/design/language/iconography/ui-icons/library/
// see https://github.com/carbon-design-system/carbon-icons-angular

import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import {
  CarbonModule,
  FadeModule,
  UserIdentificationModule,
  WalletModule,
  MoneyModule,
  LogoutModule,
  UserAvatarModule,
  NotificationModule,
  CheckmarkOutlineModule,
  UserModule,
  ExamModeModule,
  ListCheckedModule,
  DropPhotoModule,
  QrCodeModule,
  RepeatModule,
  IbmSecurityModule,
  SendModule,
  RenewModule,
  MovementModule,
  FinanceModule,
  ArrowsHorizontalModule,
  DataVis_3Module
} from '@carbon/icons-angular'

@NgModule({
  imports: [
    CommonModule,
    CarbonModule,
    FadeModule,
    UserIdentificationModule,
    WalletModule,
    MoneyModule,
    LogoutModule,
    UserAvatarModule,
    NotificationModule,
    CheckmarkOutlineModule,
    UserModule,
    ExamModeModule,
    ListCheckedModule,
    DropPhotoModule,
    QrCodeModule,
    RepeatModule,
    IbmSecurityModule,
    SendModule,
    RenewModule,
    MovementModule,
    FinanceModule,
    ArrowsHorizontalModule,
    DataVis_3Module
  ],
  declarations: [],
  exports: [
    CommonModule,
    CarbonModule,
    FadeModule,
    UserIdentificationModule,
    WalletModule,
    MoneyModule,
    LogoutModule,
    UserAvatarModule,
    NotificationModule,
    CheckmarkOutlineModule,
    UserModule,
    ExamModeModule,
    ListCheckedModule,
    DropPhotoModule,
    QrCodeModule,
    RepeatModule,
    IbmSecurityModule,
    SendModule,
    RenewModule,
    MovementModule,
    FinanceModule,
    ArrowsHorizontalModule,
    DataVis_3Module
  ]
})
export class CustomCarbonIconModule {}
