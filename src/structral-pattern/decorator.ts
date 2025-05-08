/*

🧱 Structural Pattern 2: Decorator
✅ Real-World Use Case:
You’re building a logging system, and want to:

Add timestamping

Add message formatting

Possibly add color coding (optional)
...but you don’t want to hardcode all that into your main Logger.

🧩 Task: Log Message Decorator Chain
✅ Context:
You have a core logger:

interface Logger {
  log(message: string): void;
}
class BasicLogger implements Logger {
  log(message: string) {
    console.log(message);
  }
}
You want to be able to wrap it with additional features, like:

TimestampLogger – prepends a timestamp

UppercaseLogger – uppercases the message

PrefixLogger – adds [INFO] or [WARN] prefixes

Each should implement Logger and wrap another Logger.

✅ Your Goals:
Implement Logger interface for each decorator.

Pass one logger into another (e.g. chain: TimestampLogger -> PrefixLogger -> BasicLogger).

Log a message and see all enhancements applied.

🧪 Bonus:
Add a ColorLogger that adds ANSI color codes for CLI logs.

*/

interface Logger {
  log(message: string): void;
}
class BasicLogger implements Logger {
  log(message: string) {
    console.log(message);
  }
}

class TimestampLogger implements Logger {
  constructor(private readonly logger: Logger) {}

  private addTimeStamp(message: string) {
    return `${new Date().toISOString()} ${message}`;
  }

  log(message: string) {
    this.logger.log(this.addTimeStamp(message));
  }
}

class PrefixLogger implements Logger {
  constructor(private readonly logger: Logger) {}
  private addPrefix(message: string) {
    return `[INFO] ${message}`;
  }
  log(message: string): void {
    this.logger.log(this.addPrefix(message));
  }
}

class ColorLogger implements Logger {
  constructor(private readonly logger: Logger) {}

  private addColor(message: string) {
    return `\x1b[34m${message}\x1b[0m`;
  }

  log(message: string): void {
    this.logger.log(this.addColor(message));
  }
}

const logger = new BasicLogger();
const loggerWithTime = new TimestampLogger(logger);
const loggerWithPrefix = new PrefixLogger(loggerWithTime);
const finalLogger = new ColorLogger(loggerWithPrefix);

finalLogger.log("Applied all features.");

/*

🧩 Decorator Task 2: HTTP Request Enhancers
✅ Scenario:
You’re building a system where services make HTTP requests via a shared HttpClient. You want to extend its behavior without modifying its core.

Your goals:

Add request logging

Add a retry mechanism

Add authorization headers

These are perfect for decorators — each enhances behavior in a modular way.


✅ Your Task:
Implement these decorators (all should implement HttpClient):

LoggingHttpClient
Logs the requested URL and time.

RetryHttpClient
Retries the request if it fails (simulate with Math.random()).

AuthHttpClient
Adds a fake Authorization header (just log it — no real request needed).

*/

interface HttpClient {
  get(url: string): Promise<unknown>;
}

class BasicHttpClient implements HttpClient {
  async get(url: string): Promise<unknown> {
    // simulate fetch with dummy response
    return { data: `GET ${url}` };
  }
}

class LoggingHttpClient implements HttpClient {
  constructor(private readonly client: HttpClient) {}

  private logUrlandTime(url: string) {
    console.log(new Date().toISOString(), `${url}`);
  }
  async get(url: string): Promise<unknown> {
    this.logUrlandTime(url);
    return this.client.get(url);
  }
}

class RetryHttpClient implements HttpClient {
  constructor(private readonly client: HttpClient) {}
  async get(url: string): Promise<unknown> {
    let retries = 0;

    const attempt = async (): Promise<unknown> => {
      if (retries !== 0) console.log(`${url}, Retry: ${retries}`);

      try {
        const hasFailed = Math.random() < 0.5;
        if (hasFailed) {
          retries++;
          throw new Error("Request failed");
        } else {
          return this.client.get(url);
        }
      } catch (error) {
        if (retries < 3) return attempt(); 
        else return { data: "GET: Request failed after 3 retries" };
      }
    };

    return attempt();
  }
}

class AuthHttpClient implements HttpClient {
  constructor(private readonly client: HttpClient) {}

  async get(url: string): Promise<unknown> {
    console.log("Added header: Authorization: Bearer fake123");
    return this.client.get(url);
  }
}

const httpClient = new BasicHttpClient();

const httpClientWithLogging = new LoggingHttpClient(httpClient);
const httpClientWithRetry = new RetryHttpClient(httpClientWithLogging);
const finalClient = new AuthHttpClient(httpClientWithRetry);

finalClient.get("https://www.dipmax-software.org");
