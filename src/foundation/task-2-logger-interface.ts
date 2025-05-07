import fs from 'fs';

/*

🧩 Task 2: Interface-Based Logger
Goal: Practice interfaces and dependency injection.

Define a Logger interface.

Implement ConsoleLogger and FileLogger (stub).

Write a Service class that uses any Logger.


*/

interface Logger {
    name: string;
    log(message:string): void;
}


class ConsoleLogger implements Logger {

    constructor(
        public readonly name: string
    ){}

    log(message: string){
        console.log(`${new Date().toISOString()}: ${message}`)
    }
}
class FilebasedLogger implements Logger {
    public config
    constructor(public readonly name: string,config: {path: string}){
        this.config = config
    }

    log(message: string){
        const messageWithTimestamp = `${new Date().toISOString()}: ${message}\n`
        fs.appendFileSync(this.config.path, messageWithTimestamp)
    }
}


class Service {
    constructor(private readonly logger: Logger){

    }

    execute(){
        this.logger.log('Service started.')
        setTimeout(()=> {

            this.logger.log("service ended.")
        },1500)
    }
}

const consoleLogger = new ConsoleLogger('console')
const filebaseLogger = new FilebasedLogger('file',{path: "./src/foundation/log.log"})

const s1 = new Service(consoleLogger)
const s2 = new Service(filebaseLogger)

s1.execute()
s2.execute()



