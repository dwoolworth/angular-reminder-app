import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { onCLS, onINP, onLCP} from 'web-vitals';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


onCLS((metric) => { console.log(metric) });
onINP((metric) => { console.log(metric) });
onLCP((metric) => { console.log(metric) });
