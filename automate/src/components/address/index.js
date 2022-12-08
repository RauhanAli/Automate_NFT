import React from "react";
import Address from "../displayAddress";
import { contractAddress } from "../nft/index1";
import "./index.css"

export default function NFTAddress(){
    const routeChange = () =>{ 
        window.location.reload(); 
        }
    return(
        <div id="my" className="page-heading normal-space">
  <div className="container">
    <div className="row">
      <div className="col-lg-12" >
        <h1>Your Contract Deployed Address </h1>
        <h5>{contractAddress}</h5>
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