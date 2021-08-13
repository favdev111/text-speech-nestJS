const textToSpeech = require('@google-cloud/text-to-speech');

export class ApiService {
  static synthesizeTextFile = async (textFile, outputFile) => {
		try {
			// [START tts_synthesize_text_file]
			const fs = require('fs');
			const util = require('util');
	
			const client = new textToSpeech.TextToSpeechClient();
	
			/**
			 * TODO(developer): Uncomment the following lines before running the sample.
			 */
			// const textFile = 'Local path to text file, eg. input.txt';
			// const outputFile = 'Local path to save audio file to, e.g. output.mp3';
	
			const request = {
				// input: { text: fs.readFileSync(textFile) },
				input: { text: 'this is the test' },
				voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
				audioConfig: { audioEncoding: 'MP3' },
			};
	
			const [response] = await client.synthesizeSpeech(request);
			const writeFile = util.promisify(fs.writeFile);
			await writeFile(outputFile, response.audioContent, 'binary');
			console.log(`Audio content written to file: ${outputFile}`);
			// [END tts_synthesize_text_file]
		} catch (e){
			console.log('service error: ', e);
		}
  }
}
