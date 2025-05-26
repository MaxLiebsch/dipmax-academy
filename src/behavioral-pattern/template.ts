/* 

🧱 Behavioral Pattern 6: Template Method
✅ Purpose:
Define the structure of an algorithm in a base class, 
but let subclasses override specific steps without changing the overall process.

🧩 Real-World Scenario: Data Export Pipeline
You're building a system that exports data in different formats, like:

JSON
CSV
XML

All exports follow the same general process:

Fetch the data

Format the data

Save or output the result

✅ Your Task:
Create an abstract base class DataExporter with a export() method that:

Calls fetchData()

Calls formatData()

Calls saveToDisk()

Implement:

JsonExporter

CsvExporter

Each subclass customizes the formatData() step.

✅ You may want to:
Use dummy data in fetchData()

Simulate saving with a console.log("Saving to disk: ...")


*/

abstract class DataExporter {
  private fetchData(fileName: string) {
     console.log("Fetching data:", fileName);
     return Buffer.from([12, 12, 12])
  }
  private saveToDisk(fileBuffer: Buffer) {
    console.log("Saving to disk: ...", fileBuffer);
  }
  export(fileName: string) {
    const fileBuffer = this.fetchData(fileName);
    const formatted = this.formatData(fileBuffer);
    this.saveToDisk(formatted);
  }
  abstract formatData(fileBuffer: Buffer): Buffer;
}

class JsonExporter extends DataExporter {
    formatData(fileBuffer: Buffer): Buffer {
        console.log("File formatted as JSON", fileBuffer);
        return fileBuffer;
    }
}

class CsvExporter extends DataExporter {
    formatData(fileBuffer: Buffer): Buffer {
        console.log("File formatted as CSv", fileBuffer)
        return fileBuffer;
    }
}

const jsonExporter = new JsonExporter();
jsonExporter.export('fileToJSON.txt')
const csvExporter = new CsvExporter()
csvExporter.export("fileToCSV.txt")