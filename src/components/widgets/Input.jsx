import styled from "styled-components";

const InputWrapper = styled.input`
  border: none;
  border-radius: 4px;
  height: 50px;
  background: #efefef;
  display: block;
  width: 100%;
  padding: ${(props) => (props.padding ? `0.5rem 0rem` : `0.5rem 5rem`)};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
`;
const Input = (props) => {
  const { name, placeholder, type, onChange } = props;
  return (
    <InputWrapper
      type={type}
      className="form-control mr-3 mb-3"
      placeholder={placeholder}
      id={name}
      onChange={onChange}
      padding={props.padding}
    />
  );
};

export default Input;
