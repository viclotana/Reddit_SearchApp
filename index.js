import reddit from './redditapi';
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// form event listener
searchForm.addEventListener('submit', e => {
    // get search term
    const searchTerm = searchInput.value;
    // console.log(searchTerm);
    // get sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    //console.log(sortBy);
    //get limit
    const searchLimit = document.getElementById('limit').value;
    //console.log(searchLimit);

    // check input
    if(searchTerm === ''){
        // show message
        showMessage('Please add a search term',
        'alert-danger');
    }

    //clear input
    searchInput.value = '';

    // search reddit
    reddit.search(searchTerm, searchLimit, sortBy).then(results => {
        //console.log(results);
        let output = '<div class="card-columns">';
        // loop through posts
        results.forEach(post => {  
            // check for image
            const image = post.preview ? post.preview.images[0].source.url
            :'https://vignette.wikia.nocookie.net/roosterteeth/images/1/10/Reddit.png/revision/latest?cb=20171218051745';
            
            output+= `
            <div class="card">
            <img class="card-img-top" src="${image}/60px18/" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${truncateText(post.selftext, 90)}</p>
              <a href="${post.url}" target= "_blank" class="btn btn-primary">Read More</a>
              <hr>
              <span class = "badge badge-secondary"> 
              Subreddit:${post.subreddit}</span>
              <span class = "badge badge-dark"> 
              Score:${post.score}</span>
            </div>
          </div>
          `;
        });
        output += '</div>';
        document.getElementById('results').innerHTML = output;
    });


    e.preventDefault();
});

// show message
function showMessage(message, className){
    // create a div
    const div = document.createElement('div');
    // add class to the div
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    // get parent
    const searchContainer = document.getElementById('search-container');
    // get search
    const search = document.getElementById('search');

    // insert message
    searchContainer.insertBefore(div,search);
    // timeout alert
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

// truncate text
function truncateText(text, limit){
    const shortened = text.indexOf('', limit);
    if(shortened == -1) return text;
    return text.substring(0,shortened);
}