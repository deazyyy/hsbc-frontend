import React, { ElementType } from 'react';
import styled from 'styled-components';
import { themeColor } from '../../../theme';

const ButtonWrapper = styled.button`
  padding: 0.6rem 0;
  width: 11rem;
  border-radius: 8px;
  background-color: ${themeColor.primary};
  color: black;
  font-size: 1rem;
  transition: all 220ms ease-in-out;
  cursor: pointer;
  outline: none;
  border: none;

  &:active {
    background-color: white;
  }

  @media screen and (min-width: 700px) {
    width: 18rem;
    font-size: 1.5rem;
    padding: 0.7rem;
  }

  @media screen and (orientation: landscape) {
    padding: 0.7rem 0;
    font-size: 1rem;
  }

  @media screen and (min-width: 1200px) {
    width: 10rem;
    padding: 0.5rem 0rem;
  }
`;

type ButtonProps = {
  children?: any;
};

function Button(props: ButtonProps) {
  const { children } = props;
  return <ButtonWrapper>{children}</ButtonWrapper>;
}

export default Button;
