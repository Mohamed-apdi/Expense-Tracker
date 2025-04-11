import { Component } from '@angular/core';
import { HeaderItemsComponent } from "./header-items/header-items.component";

@Component({
  selector: 'app-header',
  imports: [HeaderItemsComponent],
  template: `
   <app-header-items/>
  `,
  styles: ``
})
export class HeaderComponent {

}
