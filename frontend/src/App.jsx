/* eslint-disable */

/* eslint-disable import/no-extraneous-dependencies */
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import './static/style.css';
import './static/navbar-fixed-left.css';
import { ToastContainer } from 'react-toastify';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './components/login/login';
import SignUp from './components/signup/signup';
import MainPage from './pages/Main/MainPage';
import AGCloudPage from './pages/AGCloud/AGCloud';

const App = () => {
  const navigate = useNavigate();
  const [authenticate, setAuthenticate] = useState(false);

  // Function to check authentication status
  const checkAuthentication = () => {
    if (Cookies.get('token')) {
      return setAuthenticate(true);
    } else {
      navigate('/login');
    }
  };

  // Use useEffect to run the authentication check when 'authenticate' changes
  useEffect(() => {
    checkAuthentication();
  }, [authenticate]);

  return (
    <>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />

        {/* Render these routes only if authenticated */}
        {authenticate ? (
          <>
            <Route exact path="/" element={<MainPage />} />
            <Route exact path="/AGCloud" element={<AGCloudPage />} />
          </>
        ) : null}
      </Routes>

      {/* ToastContainer for displaying notifications */}
      <ToastContainer position="bottom-center" autoClose={2000} />
    </>
  );
};

export default App;

