const { default: axios } = require('axios');
const express = require('express');
const routes = express.Router();


const GOOGLE_SAFE_BROWSING_API = process.env.GOOGLE_API;

const GOOGLE_API = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${GOOGLE_SAFE_BROWSING_API}`
routes.get("/" , (req , res) =>{

  console.log("Routes Is working");
  
})

routes.post('/check-url', async(req ,res) =>{

  const {url} = req.body;

  if(!url){
    
    return  res.status(400).json("This Is not Url");
  }

  try {
 
      // Google Safe Browsing request body
      const requestBody = {
          client: {
             clientId: "phising-checker", clientVersion: "1.0" 
            },
          threatInfo: {
              threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
              platformTypes: ["ANY_PLATFORM"],
              threatEntryTypes: ["URL"],
              threatEntries: [
                { url: url 
                }
              ],
          },
      };

      const response = await axios.post(GOOGLE_API,requestBody);

      if(response.data.matches){
        return res.status(400).json({isPhising: true, message: '⚠️ This URL is unsafe!'});
      }
      else{
        return res.status(200).json({ isPhishing: false, message: "✅ This URL is safe." });
      }

  } catch (error) { 
   res.status(500).json({ message:error.message });
  }


})
module.exports = routes;