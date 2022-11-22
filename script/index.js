let displayCount = 0;
let main = async (apiUrl) => {

    //show loading element in body
    let body = document.getElementsByTagName('body');
    //loading elemeent
    let loadingElem = document.getElementById('loadingElem');
    
    if(body[0]){
        body[0].innerHTML = "<h5 class='background: red; text-center animated bounce fade' id='loadingElem'>Loading</h5>";
    
    }

    
    let url = apiUrl ? apiUrl : 'https://swapi.dev/api/people';
    let res = await fetch(url);
    let resJsonParsed = await res.json();
    
    if(loadingElem){
        loadingElem.style.display = "none";
    
    }
    
    return buildResultHTML(resJsonParsed);
}
    


function buildResultHTML(fetched) {
    
    //let fetch = getApiResults();
    let stars = fetched.results;
    let next = fetched.next;
    let count = Number(fetched.count);
    let previous = fetched.previous;
    let pageNumber = 0;
    if(previous != null){
        pageNumber = Number(previous.substr(-1,1));
    
    }

    let totalViewed = (pageNumber * 10) + stars.length;
    let img = 'images/star.jpg'; // General image for the stars

    
    //use map to return an array of html blocks for each element of the stars array
    starsHTMLArray = stars.map((star, index) => {
        let html_str = `
        <div class="col-sm-3 py-4 text-center">
            <div class="img-fluid rounded-circle">
            <object data="images/${star.name.replace(' ' , '_')}.jpg" type="image/jpg" style="width: 120px; height: 100px;" class="rounded-circle">
                <img src="${img}" class="rounded-circle"   style="width: 120px; height: 100px;"  alt="${star.name}" />
                </object>
            </div>
            <h4 class="btn bg-transparent text-light" data-toggle="collapse" data-target="#star_detail_div${index}">${star.name}</h4>
            <div class="collapse text-light" id="star_detail_div${index}">
                <h6>${star.name}</h6>
                <h6>Height | ${star.height}</h6>
                <h6>Gender | ${star.gender}</h6>
            </div>
        </div>`;
        return html_str;
    });

    //convert the star array of html-strings to full string 
    let htmlString = starsHTMLArray.join("");

    // build up the full html; inserting html_string in a continer div
    let fullHTML = `<div class="container">
    <div class="row bg-dark">
        <h3 class="text-center my-5 text-light"><img src='../images/star_wars.png' class="img-fluid rounded-circle mx-5" width="70" > Check Out Your StarWarriors <small class="font-weight-bold" >
        <span id='counter'>${ totalViewed }</span> Of ${count} <button type="button" class="btn btn-light mx-3" onclick="main('${next}');">More</button><button type="button" class="btn btn-light" onclick="main('${ previous ? previous : 'https://swapi.dev/api/people'}');">Back</button></small>   </h3>${htmlString} 
        </div>
        </div>`;
    
    //add html string to body
    let body = document.getElementsByTagName('body');
    body[0].innerHTML = fullHTML;
       
     
}

window.addEventListener('load', main('https://swapi.dev/api/people'));

//module.exports = { main }
