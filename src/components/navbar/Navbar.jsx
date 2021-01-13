import React from "react";
import styled from "styled-components";

const Header = styled.div`
  background: #ffff;
  box-shadow: rgba(30, 32, 75, 0.17) 0px 15px 10px -15px;
  border-bottom: 1px solid #dee2e6;
  min-height: 50px;
`;

export default function Navbar({ user, logout, history }) {
  const { name, image } = user;
  return (
    <Header className="p-4 px-md-4 mb-4">
      <div className="container ">
        <div className="row  align-items-center">
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <div className="logo-area">
              <a href="/">
                <img
                  src={image}
                  alt="user"
                  className="rounded-circle mr-3"
                  width={40}
                />
                <span className="text-dark" style={{ display: "inline" }}>
                  {name}
                </span>
              </a>
            </div>
          </div>
          <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <div style={{ float: "right", cursor: "pointer" }}>
              <span
                className="text-dark"
                onClick={() => {
                  logout();
                  history.push("/");
                }}
              >
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
}
