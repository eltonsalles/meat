import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic().bootstrapModule(AppModule);

const loadApp = () => {
  platformBrowserDynamic().bootstrapModule(AppModule, { preserveWhitespaces: true })
    .catch(err => console.log(err));
}

if (window['Zone'] === undefined) {
  console.log('Unable to find zone, so loading one...');
  import('zone.js/dist/zone').then(() => {
    loadApp();
  });
} else {
  console.log('Found an existing Zone, so just reusing it')
  loadApp();
}
