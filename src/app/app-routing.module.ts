import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, ROUTES, Routes } from '@angular/router';
import { F4mdFeatureManager } from '@f4md/core';
import { F4mdAuthenticationRoutingManager, F4mdAuthGuard} from '@f4md/security'


@NgModule({
  imports: [
    RouterModule.forRoot([])
  ],
  providers:[
    {
      provide:ROUTES,
      useFactory:(authRoutingManager:F4mdAuthenticationRoutingManager,featureManager:F4mdFeatureManager):Routes =>{
        
        const featureModulePaths = featureManager.getFeatureRoutes()
        const authModuleRoute =  authRoutingManager.getSingleAuthenticationRoute()

        const childPaths:Routes = [
          {
            path:'',
            children:featureModulePaths
          }
        ]
        
        if(authModuleRoute){
          featureModulePaths.forEach(r => {
            r.canLoad = [F4mdAuthGuard]
          })
          childPaths.push(authModuleRoute)
        }

        console.log('f4mdRouter.childPaths',authModuleRoute)
        
        return [
          {
              path:'app',
              children:childPaths
          },
          {
            path:'',
            redirectTo:'app',
            pathMatch:'full'
          }
      ]


      },
      deps:[F4mdAuthenticationRoutingManager,F4mdFeatureManager],
      multi:true
    }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
