// import { CapacitorConfig } from '@capacitor/cli';

// const config: CapacitorConfig = {
//   appId: 'io.ionic.starter',
//   appName: 'nomad-places-front',
//   webDir: 'build',
//   bundledWebRuntime: false
// };

// export default config;
import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.coffi.pwa",
  appName: "Coffi",
  webDir: "build",
  bundledWebRuntime: false,
  server: {
    url: "http://localhost:8100", // Use localhost for development
    cleartext: true,
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
