/*

    🌀 Behavioral Pattern 4: State
✅ Purpose:
Allow an object to alter its behavior when its internal state changes, as if the object changed its class.

You avoid massive if/switch statements and instead model state transitions cleanly through polymorphism.

🧩 Real-World Scenario: Traffic Light
You’re building a traffic light system. Each light (red, yellow, green) defines:

What happens when the light is "activated"

What the next state should be

✅ Your Task:
Create a TrafficLightState interface with:

proceed(context: TrafficLightContext): void

getColor(): string

Implement:

RedLight, YellowLight, GreenLight classes

Create a TrafficLightContext class that:

Stores the current state

Has a proceed() method that delegates to the current state

Allows you to log the current color with getColor()

✅ Example Usage:

const light = new TrafficLightContext(new RedLight());
light.getColor(); // Red
light.proceed();  // Now it's green
light.getColor(); // Green

 */
interface TrafficLightState {
  getColor(): void;
  proceed(context: TrafficLightContext): void;
}

class RedLight implements TrafficLightState {
  constructor() {}
  proceed(context: TrafficLightContext): void {
    context.currentState = new GreenLight();
    console.log("Now, it is Green.");
  }
  getColor(): void {
    console.log("Red.");
  }
}

class YellowLight implements TrafficLightState {
  constructor() {}
  proceed(context: TrafficLightContext): void {
    context.currentState = new RedLight();
  }
  getColor(): void {
    console.log("Yellow.");
  }
}

class GreenLight implements TrafficLightState {
  constructor() {}
  proceed(context: TrafficLightContext): void {
    context.currentState = new YellowLight();
  }
  getColor(): void {
    console.log("Green.");
  }
}

class TrafficLightContext {
  constructor(public currentState: TrafficLightState) {}
  proceed() {
    this.currentState.proceed(this);
  }
  getColor(){
    this.currentState.getColor();
  }
}

const light = new TrafficLightContext(new RedLight());
light.getColor(); // Red
light.proceed();  // Now it's green
light.getColor(); // Green
light.proceed();
light.getColor()
