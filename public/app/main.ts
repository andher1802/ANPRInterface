import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { mainModule } from './app.main.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(mainModule);