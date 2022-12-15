const http = require("http");
var xmlWriter = require('xml-writer');

ads = [1, 2, 3, 4, 5]

const server = http.createServer((request, response) => {
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
  
  // <Ad> tag
  vastResponse.startElement('Ad');
  vastResponse.writeAttribute('id', randomAd);
  
  // <InLine> tag
  vastResponse.startElement('InLine');
  
  // <AdSystem> tag
  vastResponse.startElement('AdSystem');
  vastResponse.text('Test');
  vastResponse.endElement();
  
  // <AdTitle> tag
  vastResponse.startElement('AdTitle');
  vastResponse.text('PAK GURBA');
  vastResponse.endElement();
  
  // <Impression> tag
  vastResponse.startElement('Description');
  vastResponse.text('SHTE MI GLEDASH PAK GURBA');
  vastResponse.endElement();
  
  // <Creatives> tag
  vastResponse.startElement('Creatives');
  
  // <Creative> tag
  vastResponse.startElement('Creative');
  
  // <Linear> tag
  vastResponse.startElement('NonLinear');
  
  // <Duration> tag
  vastResponse.startElement('Duration');
  vastResponse.text('00:00:30');
  vastResponse.endElement();
  
  // <MediaFiles> tag
  vastResponse.startElement('MediaFiles');
  
  // <MediaFile> tag
  vastResponse.startElement('MediaFile');
  vastResponse.writeAttribute('type', 'video/mp4')
  vastResponse.writeAttribute('width', '1280')
  vastResponse.writeAttribute('height', '720')
  vastResponse.text('https://youtu.be/QNUUgo1ewEw')
  vastResponse.endElement();

  // Return an XML string
  return vastResponse;
}
