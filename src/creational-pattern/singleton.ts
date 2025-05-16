/*

🧱 Creational Pattern 2: Singleton
✅ Purpose:
Ensure a class has only one instance and provide global access to it — like a shared config, logger, or cache.

🧩 Task: Config Service Singleton
✅ Scenario:
You need a central ConfigService to manage runtime settings (e.g., API keys, feature flags).
All parts of your app should access the same instance.

✅ Your Goals:
Create a class ConfigService with:

A private static instance

A public static getInstance() method

A get(key: string) and set(key: string, value: string) method

Use it in two places:

Set a config in one "file"

Read the same config in another "file" (same execution context)

Confirm that changes are reflected across usages — proving the shared state.

🧪 Bonus:
Prevent new ConfigService() from being called directly.

Add has(key: string): boolean


*/

class ConfigService {
  private static instance: ConfigService;
  private config = new Map<string, unknown>();

  private constructor() {
  }

  public static getInstance() {
    if (ConfigService.instance === undefined) {
      this.instance = new ConfigService;
      return this.instance
    } else {
      return ConfigService.instance;
    }
  }

  get(key: string) {
    return this.config.get(key);
  }

  set(key: string, value: string) {
    this.config.set(key, value);
  }

  has(key: string): boolean {
    return this.config.has(key);
  }
}

function configureApp() {
  const configService = ConfigService.getInstance();
  configService.set("apiUrl", "https://api.example.com");
}

function useConfig() {
  let apiUrl = null;
  const configService = ConfigService.getInstance();

  if (configService.has("apiUrl")) {
    apiUrl = configService.get("apiUrl");
    console.log("The url is ", apiUrl);
  }else{
    throw new Error('Api url not set')
  }
}


configureApp()
useConfig()