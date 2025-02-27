import React, { useEffect } from 'react';
import NavBar from './NavBar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import axios from 'axios';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, [userData, dispatch, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* NavBar at the top */}
      <NavBar />

      {/* Main content area (flex-grow to take remaining space) */}
      <main className="flex-grow p-4"> {/* Add padding for spacing */}
        <Outlet /> {/* This renders the nested routes */}
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Body;