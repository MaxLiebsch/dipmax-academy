/*
🧱 Structural Pattern 1: Adapter
🧩 Goal:
Convert one interface into another that clients expect — without modifying the original code.

✅ Real-Life Analogy:
A power adapter lets your EU plug work in a US outlet. The device stays the same, but the interface to the outlet changes.

✅ Task:
Create an existing class OldAPI with a request() method.

Define a new expected interface: NewAPI with getData().

Create an APIAdapter that implements NewAPI and wraps OldAPI.

Demonstrate usage via polymorphism.

*/

/*
  device: charger (APIAdapter)
  EU outlet (NewAPI)
  US outlet (OldAPI)
*/

class OldAPI {
  request() {
    return "data from old api";
  }
}

interface NewAPI {
  getData(): unknown;
}

class APIAdapter implements NewAPI {
  constructor(private readonly oldAPI: OldAPI) {}

  getData(): unknown {
    return this.oldAPI.request();
  }
}

const oldAPI = new OldAPI();
const adapter = new APIAdapter(oldAPI);

console.log(adapter.getData());
console.log(oldAPI.request());

/*
✅ Your Goals:
Implement the Logger interface.

Create LegacyLoggerAdapter that wraps a LegacyLogger.

Use it in a new system that expects a Logger.

*/

interface Logger {
  log(message: string): void;
}

class LegacyLogger {
  writeLog(message: string) {
    console.log(new Date().toISOString(), "Message: ", message);
  }
}

class LegacyLoggerAdapter implements Logger {
  constructor(private readonly legacyLogger: LegacyLogger) {}
  log(message: string): void {
    this.legacyLogger.writeLog(message);
  }
}

const legacyLogger = new LegacyLoggerAdapter(new LegacyLogger());

legacyLogger.log("Always logging is a good habit.");

class NewLogger implements Logger {
  log(message: string): void {
    console.log(new Date().toISOString(), "Message: ", message);
  }
}

const logger = new NewLogger();

logger.log("Logging the new way.");


const loggers: Logger[] = [legacyLogger, logger];

        
for (const logger of loggers) {
    logger.log('Logging is my favorit.')
}