$(document).ready(function(){

const licence_key=''

const url1=`http://apis.mapmyindia.com/advancedmaps/v1/${licence_key}/geo_code?addr=saket`

const url2-`https://atlas.mapmyindia.com/api/places/search/json?query=mmi000`


  fetch(url1)
  .then(res=>res.json())
  .then(res=>{
    console.log(res);
  })
  .catch(e=>{
    console.log(e);
  })

  fetch(url2)
  .then(res=>res.json())
  .then(res=>{
    console.log(res);
  })
  .catch(e=>{
    console.log(e);
  })

})
