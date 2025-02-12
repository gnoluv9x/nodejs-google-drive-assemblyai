const AssemblyAI = require("assemblyai").AssemblyAI
const { uploadFile, deleteFile } = require("./upload")

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLY_API_KEY
})

const audioUrl =
  'https://drive.google.com/uc?id=1EQ6Ln_YRBkHG2R8iUOpSS3mv9h4Zmyhy&export=download'

const run = async () => {
  const transcript = await client.transcripts.transcribe({
    audio_url: audioUrl,
    language_code: "vi"
  })
  console.log(transcript.text)
}

run()

// uploadFile({ shared: true })

// deleteFile("1eldtIAaUT0lojhOblRcF520awIctP8kz")