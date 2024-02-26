import { registerApplication, start } from 'single-spa';

export const registerApp = (apps) => {
  apps.forEach(item => {
    registerApplication(item);
  })

  start();
}
