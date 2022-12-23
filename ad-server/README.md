# Ad server that handles VAST requests
The ad server is a HTTP NodeJS server that is responsible for allocating ads to hosts. It is responsible for choosing a display ad (DA) for a web application based on different information from the host - for example, geolocation.

Upon receiving a VAST request, the server generates an XML in accordance with the [VAST](https://www.iab.com/guidelines/vast/) format. The VAST response contains metadata about the chosen ad, like duration or resource location (where the host should query the ad from). You can see an example XML file in VAST format here //INSERT LINK.

## Prerequisites
Make sure you have NodeJS installed:
```sudo apt install nodejs```

You also need the Node Package Manager (npm): ```sudo apt install npm```

Run ```npm install``` to install the dependencies specified in ```package.json```

## Starting the server
After you have run the commands above, navigate to the working directory of the server and start it by running:

```node server.js```

The server will then start listening for incoming connections on port 8080.