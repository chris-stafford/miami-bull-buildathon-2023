import { InjectionToken } from '@angular/core';

export const DEFAULT_APP_CONFIG: AppConfig = {
  miamibullApiEndpoint: 'https://miamibullApiEndpoint',
  web3ApiEndpoint: 'https://web3ApiEndpoint'
};

export let APP_CONFIG = new InjectionToken('app.config');