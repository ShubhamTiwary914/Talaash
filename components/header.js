/* 
    Header.js Holds the header component that can be reused across the webpages on the site
        1. Loads the header component on the initiated page
        2. Loads the styles to be dynamically added to the header Component
    Date Created: March 6 
*/




function loadHeaderComponent( imagePath ){
    return `
        <div class='container-fluid'> 
        
            <div class='row' id='headerMain'>
                <div class='col-2'>
                   <img src=${imagePath} id='mainLogo'/>  
                   <div class='row' id='headerTitle'> TALAASH   </div>
                </div>    
                
                <div class='col-6' id='headerNavBar'> 
                    <br /> <br /> 
                    <span class='col-2 navLink' id='home-link'> Home </span>
                    <span class='col-2 navLink' id='profile-link'> Profile  </span>
                    <span class='col-2 navLink' id='reports-link'> Reports  </span>
                    <span class='col-2 navLink' id='chats-link'> Inbox  </span>
                    <span class='col-2 navLink' id='tracker-link'> Tracker  </span>
                </div>

                <div class='col-4'>
                    <br />  <br />
                    <div class='row'>
                        <div class='col-8'>  <input class='form-control' placeholder="Search..." id="input-search"/>  </div>
                        <div class='col-4'>  <button class='btn btn-primary' id='search-btn'> Search </button>   </div>
                    </div>
                </div>
            </div>
                     
        </div>
    `;
}


function loadHeaderStyles(currentPage){
    //show current page user is on
    let currentLinkID = `#${currentPage}-link`;
    $(currentLinkID).css({ 'font-weight': "bold" });
}

let pagesLinks = { //links of pages from the root directory's perspective
    'home': 'index.html',
    'profile': 'pages/profile.html',
    'reports': 'pages/feed.html',
    'chats': 'pages/chat.html',
    'tracker': 'pages/tracker.html'
};

//link to root directory from the html file where the component is present in currently
function moveTo_headerLink( rootPath, targetPage){  
    let targetPath = `${rootPath}${pagesLinks[targetPage]}`;
    window.location.href = targetPath;
}