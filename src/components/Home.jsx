import React, {useState} from 'react';

import Header from '../components/Header';
import Banner from '../components/Banner';

import Posts from '../components/Posts';
import Footer from '../components/Footer';

function Home(props) {

  const [searchText, setSearchText] = useState('');


  return (
    <div className="homeParentDiv">
      <Header searchText={searchText} setSearchText={setSearchText} />
      <Banner />
      <Posts searchText={searchText} />
      <Footer />
    </div>
  );
}

export default Home;
 