import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { faSync,faPlus, faMinus, faEdit, faArrowDown, faArrowUp,   
  faCheckCircle, faTimesCircle, faBan, faArrowCircleRight, faArrowCircleLeft,
  faExclamationCircle, faCopy, faExpand, faSignOutAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule,
    FontAwesomeModule
  ],
  providers: [
    ApiService
  ],
  exports: [ FontAwesomeModule ]
})
export class CoreModule {

 //Prevent reimport of the CoreModule
  constructor (@Optional() @SkipSelf() parentModule: CoreModule, 
              library: FaIconLibrary) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
    library.addIcons(faSync);
    library.addIcons(faPlus);
    library.addIcons(faMinus);
    library.addIcons(faEdit);
    library.addIcons(faArrowUp);
    library.addIcons(faArrowDown);
    library.addIcons(faCheckCircle);
    library.addIcons(faTimesCircle);
    library.addIcons(faExclamationCircle);
    library.addIcons(faBan);
    library.addIcons(faArrowCircleLeft);
    library.addIcons(faArrowCircleRight);
    library.addIcons(faCopy);
    library.addIcons(faExpand);
    library.addIcons(faSignOutAlt);
    library.addIcons(faTrash);
  }
}