import React from "react";
import { BsTwitter,BsTelegram ,BsFillEnvelopeFill,BsFillTelephoneFill,BsPinMap} from 'react-icons/bs';
import {FaHandshake} from 'react-icons/fa';

function Footer()
{
        return (
            <div class="container">
                <hr></hr>
  <footer class="py-5">
    <div class="row">

      <div class="col">
        <h5>Connects with us <FaHandshake></FaHandshake></h5>
        <div className="row">

          <div className="col-md-5 paddingleft">
            
          <BsFillEnvelopeFill></BsFillEnvelopeFill> pickyourslot@gmail.com<br></br>
          <BsFillTelephoneFill></BsFillTelephoneFill> 08025245555<br></br>
          <BsPinMap></BsPinMap>#2,pi tech park ,5th floor, Bengaluru 560075
          
          </div>
          {/* <div className="col-md-10">
          pickyourslot@gmail.com <br></br>
          08025245555
          <br></br>
          #2,pi tech park ,5th floor, Bengaluru 560075
          </div> */}
        </div>
        <span>
        
        </span>
        
        
        
      </div>
      {/* <div class="col-2"></div>
      <div class="col-2"></div>

      <div class="col-4 offset-1">
        
      </div> */}
    </div>

    <div class="d-flex justify-content-between py-4 my-4 border-top">
      <p>&copy; 2022 Company, Inc. All rights reserved.</p>
      <div>
      <BsTwitter></BsTwitter>
      <BsTelegram></BsTelegram>
   
      </div>
     
    </div>
  </footer>
</div>
        )
}

export default Footer;