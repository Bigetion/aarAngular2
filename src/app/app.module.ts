import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { ConfirmDialogModule, ConfirmationService, DropdownModule, CheckboxModule } from 'primeng/primeng';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

import { LoginComponent } from './login';
import { HomeComponent } from './home';
import { RolesComponent } from './roles';
import { UsersComponent } from './users';
import { PermissionsComponent } from './permissions';
import { ProfileComponent } from './profile';
import { NotFoundComponent } from './not-found';

import { HttpService } from './shared/services/http.service';
import { GlobalService } from './shared/services/global.service';
import { CookieService } from './shared/services/cookie.service';
import { MainService } from './shared/services/main.service';
import { ValidationService } from './shared/services/validation.service';

import { ControlMessagesComponent } from './shared/components/control-messages.component';
import { CustomSubmitComponent } from './shared/components/custom-submit.component';
import { ModalConfirmation } from './shared/components/modal-confirmation.component';

import '../styles/styles.scss';
import '../styles/headings.css';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  HttpService,
  CookieService,
  GlobalService,
  ValidationService,
  ConfirmationService,
  MainService
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    ControlMessagesComponent,
    CustomSubmitComponent,
    ModalConfirmation,

    LoginComponent,
    HomeComponent,
    RolesComponent,
    UsersComponent,
    PermissionsComponent,
    ProfileComponent,
    NotFoundComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    Ng2SmartTableModule,
    NgxDatatableModule,
    AngularFontAwesomeModule,
    ConfirmDialogModule,
    DropdownModule,
    CheckboxModule,
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
  ],
  entryComponents: [
    ModalConfirmation,
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) { }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    /**
     * Set state
     */
    this.appState._state = store.state;
    /**
     * Set input values
     */
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    /**
     * Save state
     */
    const state = this.appState._state;
    store.state = state;
    /**
     * Recreate root elements
     */
    store.disposeOldHosts = createNewHosts(cmpLocation);
    /**
     * Save input values
     */
    store.restoreInputValues = createInputTransfer();
    /**
     * Remove styles
     */
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    /**
     * Display new elements
     */
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
