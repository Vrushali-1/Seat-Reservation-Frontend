import React from 'react';
import './Header.css';
import styled from 'styled-components';
import seats from '../images/seats.jpg';


const HeaderComponent = (props) => {
  return(
    <MainContainer>
    </MainContainer>  
  );
};

export default HeaderComponent;

const MainContainer=styled.header` 
background:url(${seats}) no-repeat center/cover;
height:20rem;
margin-top:-2.6rem;
`;