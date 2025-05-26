/*
🎮 Behavioral Pattern 3: Command
✅ Purpose:
Encapsulate a request/action as an object, allowing it to be:

Stored

Queued

Logged

Undone

Executed later

🧩 Real-World Scenario: Smart Home Remote
You’re building a smart remote that can control various devices:

Lights
Thermostat
Music system

Each device has its own interface, but you want the remote control buttons to be assignable to any action 
(like a command queue).

✅ Your Task
Create a Command interface:

interface Command {
  execute(): void;
}
Implement command classes:

TurnOnLightCommand
SetTemperatureCommand
PlayMusicCommand

Create a SmartRemoteControl that:

Can assign commands to buttons (e.g., setButton(slot: number, command: Command))

Has pressButton(slot) to execute them

🧪 Bonus:
Add undo() support

Queue multiple commands and run them in sequence

*/

interface Command {
  execute(): void;
  undo(): void;
}

class TurnOnLightCommand implements Command {
  undo(): void {
    console.log("Light is off.");
  }
  execute(): void {
    console.log("Light is on.");
  }
}

class SetTemperatureCommand implements Command {
  undo(): void {
    console.log("Temperature is unset.");
  }
  execute(): void {
    console.log("Temperature is set.");
  }
}
class PlayMusicCommand implements Command {
  undo(): void {
    console.log("Music stopped.");
  }
  execute(): void {
    console.log("Music is playing.");
  }
}

class SmartRemoteControl {
  private slots = new Map<
    number,
    { command: Command; last: null | "execute" | "undo" }
  >();

  setButton(slot: number, command: Command) {
    this.slots.set(slot, { command, last: null });
  }

  getSlots() {
    return [...this.slots.entries()];
  }

  pressButton(slot: number) {
    if (this.slots.has(slot)) {
      const currSlot = this.slots.get(slot)!;
      if (!currSlot.last || currSlot.last === "undo") {
        currSlot.command.execute();
        this.slots.set(slot, { ...currSlot, last: "execute" });
      } else if (currSlot.last === "execute") {
        currSlot.command.undo();
        this.slots.set(slot, { ...currSlot, last: "undo" });
      }
    }
  }
}

const remoteControl = new SmartRemoteControl();

remoteControl.setButton(1, new TurnOnLightCommand());
remoteControl.setButton(2, new SetTemperatureCommand());
remoteControl.setButton(3, new PlayMusicCommand());

remoteControl.pressButton(2);
remoteControl.pressButton(1);
remoteControl.pressButton(3);
console.log(`Slots: ${remoteControl.getSlots()}`);
remoteControl.pressButton(3);
remoteControl.pressButton(3);
remoteControl.pressButton(2);