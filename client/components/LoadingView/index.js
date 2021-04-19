
import React from 'react';
import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';

const Container = styled.div`
  height:100%;
  justify-content:center;
  align-items: center;
`;

const LoadingView = () => (
  <Container>
    <CircularProgress />
  </Container>
);

export default LoadingView;