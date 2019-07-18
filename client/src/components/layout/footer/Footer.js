import React, { Component } from "react";
import styled from "styled-components";
class Footer extends Component {
  render() {
    //Styles
    const Footer = styled.section`
      background-color: #212529;
      height: 50px;
    `;

    const Span = styled.span`
      color: white;
      font-size: 0.7rem;
    `;

    return (
      <div>
        <Footer>
          <div className="mx-auto ">
            <a href="https://pngtree.com/">
              <Span>Graphics from pngtree.com</Span>
            </a>
          </div>
        </Footer>
      </div>
    );
  }
}
export default Footer;
