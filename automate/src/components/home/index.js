import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './index.css'
import CreateItem from "../nft/index1";
export default function Welcome(){
const [visible, setVisible] = useState(false)
const [btn, setbtn] = useState(true)
let navigate = useNavigate(); 
  const routeChange = () =>{ 
    // navigate('/nft');
    {setVisible(true)}
    // {setbtn(false)}
    const element = document.getElementById('my');
    element.remove();
  }
  return(
    <> 
  <div id="my" className="page-heading normal-space">
  <div className="container">
    <div className="row">
      <div className="col-lg-12" >
        {/* <h6></h6> */}
        <h1>Generate NFT</h1>
        <h4>Connect metamask and make sure you are on one of these networks [1, 5, 11155111, 97, 80001, 137, 56].</h4>
      </div>
      <div>
        <br/>
           <button id="my" color="primary" className="next"
          onClick={routeChange
          }
            >NEXT
          </button>
          {/* <div>
            {visible && <CreateItem />}
          </div> */}
       </div>
    </div>
  </div>
</div>
            <div>
            {visible && <CreateItem />}
          </div>
  </>
  )
}