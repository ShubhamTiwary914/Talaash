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
                    <div class='footer-link'> Twitter &nbsp  
                        <a href='https://twitter.com/TALAASHanything' target="_blank">  <img src='${rootPath}/assets/icons/twitter.png' class='social-icon'/> </a> 
                    </div>
                    <div class='footer-link'> Github   &nbsp  
                        <a href='' target="_blank">   <img src='${rootPath}/assets/icons/github.png' class='social-icon'/> </a>
                    </div> 
                    <div class='footer-link'> LinkedIn   &nbsp  
                        <a href='https://www.linkedin.com/in/talaash-team-82b18a26a/' target="_blank">   <img src='${rootPath}/assets/icons/linkedin.png' class='social-icon'/> </a>
                    </div>
                    <div class='footer-link'> Youtube   &nbsp  
                        <a href='https://www.youtube.com/channel/UCmTzYhlZKLOqxhhPmH4FrrQ' target="_blank">   <img src='${rootPath}/assets/icons/youtube.png' class='social-icon'/> </a>
                    </div>
                    <div class='footer-link'> Instagram   &nbsp  
                        <a href='https://www.instagram.com/talaash_findanything/' target="_blank">   <img src='${rootPath}/assets/icons/instagram.png' class='social-icon'/> </a>
                    </div>
                    <div class='footer-link'> Google Mail   &nbsp 
                        <a href='' target="_blank">   <img src='${rootPath}/assets/icons/twitter.png' class='social-icon'/> </a>
                    </div>
                </div>   <div class='col-1'></div>
               

                <div class='col-3'> 
                    <div class='footer-header'> Help & Privacy </div> <br />
                    <div class='footer-link'> About us </div>
                    <div class='footer-link'> Terms of Service </div> <br />
                    <div class='footer-link'> Talaash team </div>
                    <div class='footer-link'> Learn More </div>
                </div>
                
            </div> <br /> <br /> <br />
            <div class='row'> 
                <div id='footer-outro'>
                    @2023 &nbsp Talaash Team &nbsp All Rights Reserved
                </div> 
            </div>
        </div>
    </div>   
    `;
}



