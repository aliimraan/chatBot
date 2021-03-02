const dialogflow = require('dialogflow');
const uuid = require('uuid');
require('dotenv').config()

exports.botText=(req,res)=>{
  async function runSample(projectId = 'triny-assign') {
    const sessionId = uuid.v4();
    const sessionClient = new dialogflow.SessionsClient({
      keyFilename:'C:/Users/imran/Downloads/keys.json'
    });
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
         text: req.body.message,
         languageCode: 'en-US',
        },
      },
    };
   
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    return res.status(200).json({'msg':result})
  }
  runSample()
}


