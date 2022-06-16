import React, { useContext } from 'react'
import { TinderContext } from './context/Tinder';
import Navbar from './Components/Navbar';
import CardList from './Components/CardList';
const App = () => {
  const {accounts}= useContext(TinderContext);
  return (
    <>
      <Navbar/>
      <CardList/>
    </>
  )
}

export default App