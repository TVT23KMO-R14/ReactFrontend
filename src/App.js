import './App.css';
import Header from './components/Header'
import Sidebar from './components/MainSidebar'
import Footer from './components/Footer'
import Content from './components/Content'
import Carousel from './components/ImgCarousel'

function App() {
  return (
    <div className='viewport'>
      <div className='container'>
        <Header />
        <div className='main'>
          <Sidebar />
          <div className='content'>
            <Carousel />
            <Content />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
