import main from "../assets/images/myster2.png";
import styled from "styled-components";
//import { Logo } from "../components";
import { Link } from "react-router-dom";
import "../index.css";
import {MDBBtn, MDBContainer, MDBFooter, MDBIcon} from "mdb-react-ui-kit";
import React from "react";
import Footer from "../components/footer";
const Landing = () => {
  return (
    <Wrapper>
      {/*<nav>
        <Logo />
      </nav>*/}
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            <span> Découvrez </span>votre<span> lune </span> noire
          </h1>
          <p>
            Vous avez peut-être entendu parler de la Lune Noire et de son influence sur notre vie, mais savez-vous réellement de quoi il s'agit ?
          </p>

          <Link to="/calculator" className="btn btn-hero">
            Découvrir !
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" style={{width:"60%"}} />
      </div>
      <Footer/>
    </Wrapper>
  );
};
export const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 800;
    
    font-family: quintessential;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Landing;
