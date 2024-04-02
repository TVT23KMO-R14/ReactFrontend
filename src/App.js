import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Sidebar from './components/MainSidebar'
import Footer from './components/Footer'
import Content from './components/Content'
import Carousel from './components/ImgCarousel'
import Top100Movies from './filters/Top100Movies'

function App() {
  return (
    <div className='viewport'>
      <div className='container'>
        <Header />
        <div className='main'>
          <Sidebar />
          <Routes>
            <Route path='/' element={
              <div className='content'>
              <Carousel />
              <Content />
            </div>
            } />
            <Route path="/other" element={
              <div className='content'>
                <Top100Movies />
              </div>
            } />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
