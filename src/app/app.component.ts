import { Component } from '@angular/core';
import { F4mdAbstractNavigationComponent} from '@f4md/component'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent extends F4mdAbstractNavigationComponent{

    selectedIndex = -1
    appPages = this.getData()
    
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
