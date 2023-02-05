const http = require("http");
var xmlWriter = require('xml-writer');
const XMLWriter = require("xml-writer/lib/xml-writer");

const server = http.createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (request.method === "GET" && request.url.startsWith("/vast")) {
    console.log("VAST request received")

    // Fetch the currently available display ads
    getDisplayAds('http://127.0.0.1:9000/s/a6ZE9gKcWa3Kk99/download/DA_Links.md')
    .then((response_with_DAs) => {
      let nonEmptyLines = response_with_DAs.split('\n').filter((line) => line.trim() !== '')

      // get a random ad from the currently available ones
      let randomAd = nonEmptyLines[Math.floor(Math.random() * nonEmptyLines.length)];

      // extract info from the chosen ad
      const linkRegex = /(https?:\/\/[^\s]+)/;
      const idRegex = /DA_(.*?):/;
      const AdTitleRegex = /^(\w+):/;
      let DA_link = linkRegex.exec(randomAd)[0];
      let DA_id = idRegex.exec(randomAd)[0];
      let DA_title = AdTitleRegex.exec(randomAd)[0];

      // use the extracted info to generate a VAST response
      const vastResponse = generateVastResponse(DA_title, DA_id, DA_link);
      console.log("VAST response generated")

      response.writeHead(200, { "Content-Type": "application/xml" });
      response.write(vastResponse.toString())
      console.log("VAST response sent")
      return response.end();
    })
    .catch((error) => {
      console.error(error);
  });
  } else {
    // Handle other requests like PUT or POST
  }
});

server.listen(8080);
console.log("Server started listening on port 8080")

/**
 * Sends an asynchronous GET request to NextCloud by querying the text file, which holds the
 * links of the JSON files of the display ads (DAs). The link should look like this:
 * http://127.0.0.1:9000/s/6EWXz6BbsteJGKJ/download/DA_Links.md (currently hardcoded, so should be changed
 * for each NextCloud instance). The response is a string. 
 * 
 * @param {string} url: The URL of the text file holding the links of the ads
 * @returns {Promise}
 */

function getDisplayAds(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (response) => {
      if (response.statusCode === 200) {
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          resolve(data);
        });
      } else {
        reject(new Error(`Request failed with status code: ${response.statusCode}`));
      }
    }).on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * Generates an XML for an ad with the input attributes
 * 
 * @param {string} title: The title of the ad, which the XML tag AdTitle holds
 * @param {string} id: The id of the ad, set as an attribute of the XML tag Ad
 * @param {string} url: The link to the ad, which the XML tag <StaticResource holds
 * @returns {XMLWriter}
 */
function generateVastResponse(title, id, url) {
  
  // Create a new XML writer object
  const vastResponse = new xmlWriter();
  
  // Begin writing the XML document
  vastResponse.startDocument();
  
  // <VAST> tag
  vastResponse.startElement('VAST');
  vastResponse.writeAttribute('version', 4.1);
  
  // <Ad> tag
  vastResponse.startElement('Ad');
  vastResponse.writeAttribute('id', id);
  
  // <InLine> tag
  vastResponse.startElement('InLine');
  
  // <AdSystem> tag
  vastResponse.startElement('AdSystem');
  vastResponse.text('A Node.js HTTP server');
  vastResponse.endElement();
  
  // <AdTitle> tag
  vastResponse.startElement('AdTitle');
  vastResponse.text(title);
  vastResponse.endElement();
  
  // <Impression> tag
  vastResponse.startElement('Description');
  vastResponse.text('A very cool ad');
  vastResponse.endElement();
  
  // <Creatives> tag
  vastResponse.startElement('Creatives');
  
  // <Creative> tag
  vastResponse.startElement('Creative');
  
  // <NonLinearAds> tag
  vastResponse.startElement('NonLinearAds');

  // <NonLinear> tag
  vastResponse.startElement('NonLinear');

  // <StaticResource> tag
  vastResponse.startElement('StaticResource');
  vastResponse.text(url);
  vastResponse.endElement();
  
  // <Duration> tag
  vastResponse.startElement('Duration');
  vastResponse.text('00:00:30');
  vastResponse.endElement();

  // Return an XML string
  return vastResponse;
}
