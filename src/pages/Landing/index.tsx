import React from 'react';
import styled from 'styled-components';
import TopSection from './topSection';
import AboutSection from './aboutSection';
import ContactSection from './contactSection';
import FooterSection from './footerSection';

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #151515;
  font-family: Arial, Helvetica, sans-serif;
`;

function Landing() {
  return (
    <PageContainer>
      <TopSection />
      <AboutSection />
      {/* <ContactSection /> */}
      {/* <FooterSection /> */}
    </PageContainer>
  );
}

export default Landing;
