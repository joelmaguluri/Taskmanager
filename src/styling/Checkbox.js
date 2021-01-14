import styled from "styled-components";
import { lightgray,white,black,green,gray } from "./colorCode";


export const Checkbox=styled.input`
  position: relative;
  width: 1.5em;
  height: 1.5em;
  color: ${black};
  border: 1px solid ${gray};
  border-radius: 4px;
  appearance: none;
  outline: 0;
  cursor: pointer;
  transition: background 175ms cubic-bezier(0.1, 0.1, 0.25, 1);
  &::before {
    position: absolute;
    content: '';
    display: block;
    top: 2px;
    left: 7px;
    width: 8px;
    height: 14px;
    border-style: solid;
    border-color: ${white};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    opacity: 0;
  }
  &:checked {
    color: ${white};
    border-color: ${green};
    background: ${green};
    &::before {
      opacity: 1;
    }
    ~ label::before {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    }
  }
}`;

export const Label=styled.label`
label {
  position: relative;
  cursor: pointer;
  font-size: 1.5em;
  font-weight: 600;
  padding: 0 0.25em 0;
  user-select: none;
  &::before {
    position: absolute;
    content: attr(data-content);
    color: ${lightgray};
    clip-path: polygon(0 0, 0 0, 0% 100%, 0 100%);
    text-decoration: line-through;
    text-decoration-thickness: 3px;
    text-decoration-color: ${black};
    transition: clip-path 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
}`