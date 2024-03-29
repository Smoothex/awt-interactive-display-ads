// 
// This file holds the implementation for a custom library for handling VAST requests and responses 
// for HbbTV App being developed from Lachezar Nikolov, Momchil Petrov and
// Todor Moskov as part of the 'Advanced Web Technologies' Project offered by 
// TU Berlin and FOCUS Institute at Fraunhofer in WiSe22/23.
//

/**
 * Parse the the responded XML object and extract the relevant ad properties.
 * 
 * @param {XMLHttpRequest} xhr 
 * @returns {object} the relevant properties for an add stored in the VAST response
 */
function getResponseObject(xhr) {
  let xmlDoc = xhr.responseXML;   // a document object containing the XML
  let Ad = xmlDoc.getElementsByTagName("Ad")[0];
  let InLine = Ad.getElementsByTagName("InLine")[0];
  let AdTitle = InLine.getElementsByTagName("AdTitle")[0];
  let Description = InLine.getElementsByTagName("Description")[0];
  let Creative = InLine.getElementsByTagName("Creatives")[0].getElementsByTagName("Creative")[0];
  let NonLinear = Creative.getElementsByTagName("NonLinearAds")[0].getElementsByTagName("NonLinear")[0];
  let StaticResource = NonLinear.getElementsByTagName("StaticResource")[0];
  let Duration = NonLinear.getElementsByTagName("Duration")[0];
  let durationList = Duration.textContent.split(":");
  let durationSeconds = Number(durationList[0])*3600 + Number(durationList[1]*60) + Number(durationList[2]);
  
  return {
    title: AdTitle.textContent,
    description: Description.textContent,
    duration: durationSeconds,
    url: StaticResource.textContent  
  }
}


/**
 * Makes a VAST request to a given server and return a Promise 
 * that delivers relevant information from the receiver response on success.
 * 
 * @param {string} url 
 * @returns {Promise}
 */
function makeVASTRequest(url) {
  return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.setRequestHeader("Accept", "application/xml");
      xhr.onload = function () {
        //check the response code and act appropriately
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(getResponseObject(xhr));
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      };
      // send the request first AFTER defining the callback for handling the response
      xhr.send();
  });
  }