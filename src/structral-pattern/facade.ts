/*

🧱 Structural Pattern 3: Facade
✅ Purpose:
Simplify interaction with a complex system by exposing a unified, high-level interface.

You hide the complexity behind a clean facade, so the client doesn’t need to know how everything works under the hood.

🧩 Task: Video Converter Facade
✅ Scenario:
You have a subsystem for converting videos, and it has a bunch of low-level operations:

FileReader – reads raw video files

CodecManager – detects and loads codecs

WeVideoEncoder – handles the encoding

AudioExtractor – extracts and attaches audio

Your client just wants to call convert(filePath: string): string and get a final .mp4.

✅ Your Task:
Implement the low-level classes with dummy methods:

FileReader.read()

CodecManager.load()

WeVideoEncoder.encode()

AudioExtractor.extract()

Create a VideoConverterFacade class with:

class VideoConverterFacade {
  convert(filePath: string): string;
}
Inside convert(), orchestrate all the subsystems and return "video.mp4".

🎯 Bonus:
Log each subsystem step so you can see how the facade hides complexity.

*/


const waitMocFn = (message: string) => {
    const startTime = Date.now()
    while (Date.now() - startTime < 1000){}
    console.log(message)
}

class WeFileReader {
  constructor() {}
  read(path: string) {
    console.log("Reading File from ", path);
    return Buffer.from("I swear, I'm a video file.");
  }
}

class CodecManager {
  constructor() {}
  load(file: Buffer): Codecs {
    console.log("Detected webm... Loading Codec");
    waitMocFn("Codec loaded.")

    return "webm"
  }
}

type Codecs = "mp4"| "webm" | "mp4"

class WeVideoEncoder {
  encode(file: Buffer, source: Codecs, target: Codecs) {
    console.log("Encoding file....");
    waitMocFn('File encoded')
    return file;
  }
}

class AudioExtractor {
  extract(file: Buffer) {
    console.log("Extract audio...");
    waitMocFn('Audio attached.')
    return file;
  }
}


class VideoConverterFacade {

    convert(filePath: string){
        const fileReader = new WeFileReader()
        const fileBuffer = fileReader.read(filePath);

        const codecManager = new CodecManager()

        const codec = codecManager.load(fileBuffer);

        const videoEncoder = new WeVideoEncoder()

        const encodedFileBuffer = videoEncoder.encode(fileBuffer, codec, "mp4")

        const audioExtractor = new AudioExtractor()

        const finalizedFileBuffer = audioExtractor.extract(encodedFileBuffer);

        return "video.mp4"

    }
}

const videoconverter = new VideoConverterFacade();


console.log(`Result ${videoconverter.convert('./video.webm')}`)
