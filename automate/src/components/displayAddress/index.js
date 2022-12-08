import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './index.css'
import { contractAddress } from "../nft/index1";
import image from './giphy1.gif';
import FailTX from "../faill";

export default function Address(){

const [loading, setLoading] = useState(true)
const [failtx , setFailtx] = useState(false)
const spinner = document.getElementById("spinner");
  if (spinner) {
    const timeout = setTimeout(() => {
      setLoading(false);
      if(!loading && contractAddress == ""){
        setFailtx(true);
        setLoading(false);
        spinner.style.display = "none";
      } 
      else if(contractAddress !== ""){
      spinner.style.display = "none";
      console.log("Stopped..!!!")
      }
    },30000);
  }
 
  const routeChange = () =>{ 
  window.location.reload(); 
  }
  return(
    <> 
    <div id="spinner" className="container2">
       <h1>Deploying Your Contract</h1>
        <img src={image} ></img>
      </div>
    <div>
        {
          (failtx && !loading && contractAddress == "") ? (
            // (failtx && contractAddress == "")&&(
            <FailTX />
            // )
          ) :(
            (!loading && contractAddress!=="") &&(
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
          )
        }
      </div>
  </>
  )
}