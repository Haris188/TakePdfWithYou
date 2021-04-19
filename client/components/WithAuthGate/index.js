import React, { useState, useEffect } from 'react';
import LoadingView from '../LoadingView';
import { element, array, oneOfType } from 'prop-types';
import {useRouter} from 'next/router'
import {getCurrentUser} from '../../api'

const WithAuthGate = (props) => {
  const [auth, setAuth] = useState({ loading: true });
  const { children } = props;
  const Child = children;
  const router = useRouter()

  console.log('AUTH GATE');

  const fetchCurrentUserFromApi = async () => {
    const res = await getCurrentUser();
    if (res) {
      setAuth(res);
    }
  };

  useEffect(() => {
    fetchCurrentUserFromApi();
  }, []);

  if (auth.loading) {
    return LoadingView;
  }

  if (auth.id) {
    return <Child {...props} />;
  }

  router.push('/');
  return <></>;
};

WithAuthGate.propTypes = {
  children: oneOfType(element, array)
};

export default WithAuthGate;