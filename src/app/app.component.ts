import { Component } from '@angular/core';
import { F4mdAbstractNavigationComponent} from '@f4md/component'
import { F4mdAppConfigurationService, F4mdFeatureManager } from '@f4md/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent extends F4mdAbstractNavigationComponent{

    constructor(featureManager:F4mdFeatureManager, private configService:F4mdAppConfigurationService){
      super(featureManager);
    }

    selectedIndex = -1
    appPages = this.getData()
    menuTitle = this.getMenuTitle()
    
    getMenuTitle(){
      return this.configService.getPropertyValue("menu-title")
    }
    
    getData(){
      return this.defaultNavigationItems.map(navItem => {
        return {
          url: `/app/${ navItem.url }`,
          title: navItem.label,
          icon: navItem.icon
        }
      })
    }
    

}
