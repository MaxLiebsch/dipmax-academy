/* 
🔗 Behavioral Pattern 5: Chain of Responsibility
✅ Purpose:
Pass a request along a chain of handlers until one of them handles it.
Each handler either processes the request or passes it to the next.

🧩 Real-World Scenario: Request Validation Pipeline
You're building an HTTP request validation pipeline. Before accepting a request, the system should:

Check that the request has a valid auth token

Ensure it has required data

Optionally log the request

Each of these is a handler in the chain.

✅ Your Task:
Define a Handler interface with:

setNext(handler: Handler): Handler

handle(request: Request): void

Implement:

AuthHandler
DataValidationHandler
LoggingHandler

Create a Request object like:

type Request = {
  token?: string;
  body?: Record<string, any>;
}
Chain handlers together like:

authHandler.setNext(dataHandler).setNext(loggingHandler);
authHandler.handle(request);
🧪 Bonus:
Add a stopOnFail flag

Return a result or status instead of just logging
 */

const testToken = "test-token";

interface Handler {
  next: Handler | null;
  setNext(handler: Handler): Handler;
  handle(request: Request): { status: number; data: unknown } | undefined;
}

type Request = {
  token?: string;
  body?: Record<string, any>;
  trace?: string[]
};

type Result<T extends unknown = unknown> = {
  status: number;
  error?: string;
  data: T;
};

const next = (
  request: Request,
  nextHandler: null | Handler
): Result | undefined => {
  if (nextHandler) {
    return nextHandler.handle(request);
  } else {
    return {
      status: 200,
      data: request?.body,
    };
  }
};

class AuthHandler implements Handler {
  next: Handler | null = null;
  setNext(handler: Handler): Handler {
    this.next = handler;
    return handler;
  }
  handle(request: Request) {
    request.trace = request.trace ?? []
    request.trace.push('AuthHandler')
    const isTokenValid =
      request?.token && request.token.replace("Bearer ", "") === testToken;
    if (!isTokenValid) {
      throw new Error("Auth Token invalid!");
    } else {
      console.log("Auth token valid!");
    }
    return next(request, this.next);
  }
}

class DataValidationHandler implements Handler {
  next: Handler | null = null;
  setNext(handler: Handler): Handler {
    this.next = handler;
    return handler;
  }
  handle(request: Request) {
    request.trace = request.trace ?? []
    request.trace.push('DataValidationHandler')
    const hasBody = !!request?.body;

    if (!hasBody) {
      throw new Error("Body is missing");
    } else {
      console.log("Body ok!");
    }

    return next(request, this.next);
  }
}

class LoggingHandler implements Handler {
  next: Handler | null = null;
  setNext(handler: Handler): Handler {
    this.next = handler;
    return this;
  }
  handle(request: Request) {
    request.trace = request.trace ?? []
    request.trace.push('LoggingHandler')
    console.log(new Date().toISOString(), " - Request processed");
    return next(request, this.next);
  }
}

const authHandler = new AuthHandler();
const dataValidationHandler = new DataValidationHandler();
const loggingHandler = new LoggingHandler();

const request: Request = {
  token: "Bearer test-token",
  body: {
    settings: {
      theme: "dark",
    },
  },
};
try {
  authHandler.setNext(dataValidationHandler).setNext(loggingHandler);
  console.log("auth", authHandler.handle(request));
  console.log('trace:', request.trace)
} catch (error) {
  console.log(`${error}`);
}
