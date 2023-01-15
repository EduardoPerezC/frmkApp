import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component'; 
import { HomePluginModule} from '@myorg/home';
import { WishManagerPluginModule } from '@myorg/wish-manager'
import { F4mdComponentModule } from '@f4md/component';
import { CommonModule } from '@angular/common';
import { F4mdAppRoutingModule } from '@f4md/router';
import { AuthenticationPluginModule } from '@myorg/authentication';
import { HttpClientModule} from '@angular/common/http'
import { F4mdHttpModule,F4mdAppConfigurationModule} from '@f4md/core'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    CommonModule, 
    IonicModule.forRoot(),
    HttpClientModule,
    F4mdHttpModule.forRoot(),
    F4mdAppConfigurationModule.forRoot(),
    AuthenticationPluginModule, 
    HomePluginModule,
    WishManagerPluginModule,
    F4mdAppRoutingModule,
    F4mdComponentModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
