import React , { useState, useEffect } from "react";
import './header.css'
import {useNavigate} from 'react-router-dom';


function Header()
{
  const navigate = useNavigate();


    const [stickyClass, setStickyClass] = useState('relative');

    useEffect(() => {
      window.addEventListener('scroll', stickNavbar);

      return () => {
        window.removeEventListener('scroll', stickNavbar);
      };
    }, []);

    const stickNavbar = () => {
      const header = document.querySelector('header');
      if (window !== undefined) {
        let windowHeight = window.scrollY;
        // windowHeight > 20 ? setStickyClass('fixed top-0 left-0 z-50') : setStickyClass('relative');
        windowHeight > 1 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
      }
    };

    function getLogin()
    {
        navigate('/login');
    }
        // return <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        //   <a href="/" class="d-flex col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        //       <img src="logo.png" className="logo" />
        //   </a>
        //   <div class="col-md-2 text-end">
        //      <button type="button" class="btn btn-primary" onClick={getLogin}>Sign-up</button>
        //   </div>
        // </header>
      // <div class="container is-sticky "></div>

      return <header>
                <div className="row headMain">
                    <div className="col">
                    <img src='logo.png' className="logo" />
                    </div>
                    {/* <div className="col"></div>
                    <div className="col"></div>
                    <div className="col"></div> */}
                    
                    <div className="col text-end">
                    <button type="button" class="btn btn-primary signup" onClick={getLogin}>Sign-up</button>
                    </div>
                </div>
            </header>
      
}

export default Header;