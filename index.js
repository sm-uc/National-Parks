
const apiurl = "https://developer.nps.gov/api/v1/parks";

const apikey ="EKauYWOp9eOiJGeJqeCjnn9HiWTxiSTSVOAn26GF";

let selected_state = [];

codes.data.forEach(element => {
document.getElementById("states").innerHTML +=  `<input type="checkbox" name='${element.Code}' value='${element.Code}'><label for="${element.Code}">${element.State}</label>`
    });
    
function formatParams(params){
    let queryparams = Object.keys(params).map(key => 
        `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        );
     return queryparams.join("&");
}
function getParksInfo(maxResults=10,code){
const params = 
{
    api_key:apikey,
    stateCode:code,
     limit:maxResults
}



const url = apiurl +'?'+formatParams(params);
console.log(url);
  fetch(url)
  .then(resp => {
     if(resp.ok){
         return resp.json();
     }
     throw new Error(resp.statusText);
  })
  .then(resp => {
      resp.data.forEach((item) => {
          document.getElementById("park_info").innerHTML += `<p style="font-weight:bold"> ${item.fullName}</p> 
          <p> ${item.description} </p>
          <a href=${item.url}>Visit Link for more info.</a> 
          <br/>
          `
      })
  })
  .catch(err => alert(`Something went wrong ${err.message}`));
}



function submit_handle()
{
    event.preventDefault();
    document.getElementById("park_info").innerHTML="";
    document.querySelectorAll("input[type='checkbox']:checked").forEach((ele) => selected_state.push(ele.value));
    
    let maxResults = document.querySelector("input[type='text']").value;
    
    getParksInfo(maxResults,selected_state);
    selected_state = [];
}



