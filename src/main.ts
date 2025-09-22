import '@angular/localize/init';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // ✅ استيراد HttpClient
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), // لو عندك providers قديمة في appConfig
    provideHttpClient() // ✅ أضف HttpClient هنا
  ]
}).catch((err) => console.error(err));
