import React, { useContext } from 'react';
import Header from '../components/Header';
import AboutCard from '../components/AboutCard';
import DeliveryAppContext from '../context/DeliveryAppContext';

function About() {
  const { user } = useContext(DeliveryAppContext);

  return (
    <>
      {user.role && <Header /> }
      <main>
        <AboutCard />
      </main>
    </>
  );
}

export default About;
