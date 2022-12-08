import React from "react";
import "./index.css"

export default function FailTX(){
    
    const routeChange = () =>{ 
        window.location.reload(); 
        }
        
    return(
        <div id="my" className="page-heading normal-space">
  <div className="container">
    <div className="row">
      <div className="col-lg-12" >
        <h1>Contract Deployement Failed. Please Try Again </h1>
      </div>
      <div className="btn-next">
        <br/>
           <button id="my" color="primary" className="next"
          onClick={routeChange
          }
            >NEXT
          </button>
       </div>
    </div>
  </div>
</div> 
    )
}