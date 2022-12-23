const http = require("http");
var xmlWriter = require('xml-writer');

ads = [1, 2, 3, 4, 5]

const server = http.createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (request.method === "GET" && request.url.startsWith("/vast")) {
    console.log("VAST request received")

    const vastResponse = generateVastResponse();
    console.log("VAST response generated")

    response.writeHead(200, { "Content-Type": "application/xml" });
    response.write(vastResponse.toString())
    console.log("VAST response sent")
  } else {
    // Handle other requests like PUT or POST
  }
  return response.end();
});

server.listen(8080);
console.log("Server started listening on port 8080")

function generateVastResponse() {
  const randomAd = ads[Math.floor(Math.random() * ads.length)];
  
  // Create a new XML writer object
  const vastResponse = new xmlWriter();
  
  // Begin writing the XML document
  vastResponse.startDocument();
  
  // <VAST> tag
  vastResponse.startElement('VAST');
  vastResponse.writeAttribute('version', 4.1);
  
  // <Ad> tag
  vastResponse.startElement('Ad');
  vastResponse.writeAttribute('id', randomAd);
  
  // <InLine> tag
  vastResponse.startElement('InLine');
  
  // <AdSystem> tag
  vastResponse.startElement('AdSystem');
  vastResponse.text('A NodeJS HTTP server');
  vastResponse.endElement();
  
  // <AdTitle> tag
  vastResponse.startElement('AdTitle');
  vastResponse.text('The title of the Ad');
  vastResponse.endElement();
  
  // <Impression> tag
  vastResponse.startElement('Description');
  vastResponse.text('A description of the ad itself');
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
  vastResponse.text('Link to where the DA is hosted');
  vastResponse.endElement();
  
  // <Duration> tag
  vastResponse.startElement('Duration');
  vastResponse.text('00:00:30');
  vastResponse.endElement();

  // Return an XML string
  return vastResponse;
}
