import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  margin: 30px auto;
  padding: 2rem 1rem;
  min-width: 10rem;
  max-width: 75vw;
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 768px) {
    max-width: 50vw;
  }
  @media screen and (min-width: 1200px) {
    width: 25vw;
    padding: 1rem;
  }
  @media screen and (min-width: 1400px) {
    width: 20vw;
  }
`;

const Icon = styled.img`
  width: 15rem;
  @media screen and (min-width: 1200px) {
    width: 17rem;
  }
`;

const Title = styled.h2`
  margin: 30px 0;
  width: 100%;
  font-size: 1.5rem;
  margin-top: 1rem;

  @media screen and (min-width: 1200px) {
    margin-top: 2rem;
  }
`;

const Description = styled.p`
  margin: 0;
  line-height: 1.4;
  font-size: 1rem;

  @media screen and (min-width: 1200px) {
    line-height: 1.6;
    height: 5rem;
  }
`;

type CardProps = {
  src?: string;
  title?: string;
  text?: string;
  className?: string;
};

function Card(props: CardProps) {
  const { src, title, text, className } = props;
  return (
    <Wrapper className={className}>
      <Icon src={src} />
      <Title>{title}</Title>
      <Description>{text}</Description>
    </Wrapper>
  );
}

export default Card;
