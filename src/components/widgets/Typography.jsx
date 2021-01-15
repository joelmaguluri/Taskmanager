import styled from "styled-components";

export const CardTitle = styled.h1`
  font-family: "Karla", serif;
  font-size: 30px;
  font-weight: medium;
  color: #6a7a8c;
`;

export const CardListItem = styled.h4`
  font-family: "Karla", serif;
  font-size: 20px;
  color: rgb(178, 178, 178);
`;
export const UnorderedList = styled.ul`
  list-style: none;
  ul li::before {
    content: "\2022";
    color: rgb(178, 178, 178);
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
`;
