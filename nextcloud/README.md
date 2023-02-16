## Nextcloud setup

Start by running a Nextcloud container. Run the following command to pull the most recent version (as of 10.02.2023) of Nextcloud:

```
docker run nextcloud:25.0.3
```

### CORS

[Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) is a security mechanism 
that allows web pages to request resources from a different origin (domain, protocol, or port) than the one that served the web page.
By default, web browsers implement a security feature known as the same-origin policy, which restricts a web page from making requests to a different origin. 
CORS provides a way for a server to relax this restriction, allowing the browser to access resources from a different origin.

The Nextcloud container is configured to use Apache web server, which serves as the interface between the Nextcloud application and 
the outside world (i.e., the HbbTV app or the VAST server). The `.htaccess` file of an Apache web server is a configuration file for making changes on a per-directory 
basis, rather than making global changes to the server configuration. So we will use the `.htaccess` of the container to allow incoming requests to Nextcloud 
from external origins.

For this, navigate to the folder `awt-interactive-display-ads/nextcloud/` from the terminal and run the following command:
```
docker cp .htaccess <CONTAINER_NAME>:/var/www/html/.htaccess
```
where `<CONTAINER_NAME>` is the name of the container we started earlier.
This will copy the `.htaccess` from this repo with its additional settings from the host to the container.

These are the additional settings in the `.htaccess` we provide. They allow different methods from external origins:
```
Header always add Access-Control-Allow-Origin "*"
Header always add Access-Control-Allow-Headers "Authorization, Origin, X-Requested-With, Content-Type, Accept, DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Range, Range, Depth, Destination"
Header always add Access-Control-Allow-Methods "GET, HEAD, POST, PUT, OPTIONS, MOVE, DELETE, COPY, LOCK, UNLOCK, PROPFIND, MKCOL"
Header always add Access-Control-Allow-Credentials "true"
```

Nextcloud can now be accessed from the VAST server and the HbbTV app.

### Storing DAs

After you have created the ads you want to use, upload them as JSON files to the base directory of Nextcloud. In this directory, create the file `DA_Links.md`. 
Inside this file store the link to each JSON file you just uploaded. 

It is important to **follow the naming convention** `<NAME>: <LINK>`

### Troubleshooting
If an ad from the `DA_Links.md` is fetched, but not played in the HbbTV app, make sure that they link to the specific ad in `DA_Links.md` is not saved as a 
clickable link. This will add additional quotation marks to the the link, when it is transported to the HbbTV app. Hence, the HbbTV app will not be able to 
use the link to fetch the allocated ad.
