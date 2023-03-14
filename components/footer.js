

function loadFooterComponent( rootPath ){
    //console.log(`${rootPath}/assets/icons/twitter.png`)
    return `
    <div class='container-fluid'>
        <div id='footerBox'>
            <div class='row'>
                <div class='col-3'> 
                    <div class='footer-header'> Talaash </div> <br />
                    <div class='footer-link'> Report Missing </div>
                    <div class='footer-link'> Spotted Report </div> <br />
                    <div class='footer-link'> FAQs </div>
                    <div class='footer-link'> Signout </div>
                </div>    <div class='col-1'></div>
                

                <div class='col-3'> 
                    <div class='footer-header'> Community </div> <br />
                    <div class='footer-link'> Twitter &nbsp  <img src='${rootPath}/assets/icons/twitter.png' class='social-icon'/> </div>
                    <div class='footer-link'> Github   &nbsp  <img src='${rootPath}/assets/icons/github.png' class='social-icon'/> </div> 
                    <div class='footer-link'> LinkedIn   &nbsp  <img src='${rootPath}/assets/icons/linkedin.png' class='social-icon'/> </div>
                    <div class='footer-link'> Youtube   &nbsp  <img src='${rootPath}/assets/icons/youtube.png' class='social-icon'/> </div>
                    <div class='footer-link'> Instagram   &nbsp  <img src='${rootPath}/assets/icons/instagram.png' class='social-icon'/> </div>
                    <div class='footer-link'> Google Mail   &nbsp <img src='${rootPath}/assets/icons/twitter.png' class='social-icon'/> </div>
                </div>   <div class='col-1'></div>
               

                <div class='col-3'> 
                    <div class='footer-header'> Help & Privacy </div> <br />
                    <div class='footer-link'> About us </div>
                    <div class='footer-link'> Terms of Service </div> <br />
                    <div class='footer-link'> Taalash team </div>
                    <div class='footer-link'> Learn More </div>
                </div>
                
            </div> <br /> <br /> <br />
            <div class='row'> 
                <div id='footer-outro'>
                    @2023 &nbsp Taalash.gov.in &nbsp &nbsp All Rights Reserved
                </div> 
            </div>
        </div>
    </div>   
    `;
}


