import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import TicketCard from './pages/TicketCard'
import Ticket from './pages/Ticket'
import Booking from './pages/Booking'
import Checkout from './pages/Checkout'
import Footer from './components/Footer'
import Payment from './pages/Payment'
import ImageUploader from './data/ImageUploader'
import Flight from './pages/Flight'
// import Orders from './pages/Orders'
import Profile from './pages/Profile'
import Loading from './components/Loading'
import Login from './pages/Login'
import Testpage from './pages/Testpage'
import Register from './pages/Register'

function App() {
  return (
    <Router>
      <Routes>
        {/* Route สำหรับหน้า login ซึ่งไม่มี Header และ Footer */}
        <Route path='/login' element={<LoginWithoutHeaderFooter />} />
        <Route path='/register' element={<RegisterWithoutHeaderFooter />}/>
        {/* Routes สำหรับหน้าอื่น ๆ ที่มี Header และ Footer */}
        <Route element={<DefaultLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/tickets/all/to/:title' element={<TicketCard />} />
          <Route path='/tickets/:origin/to/:destination' element={<Ticket />} />
          <Route path='/tickets/booking/:id/:origin/:destination' element={<Booking />} />
          <Route path='/tickets/booking/:id/:origin/:destination/checkout' element={<Checkout />} />
          <Route path='/tickets/payment/:id' element={<Payment />} />
          <Route path='/image/upload' element={<ImageUploader />} />
          <Route path='/flight' element={<Flight />} />
          {/* <Route path='/orders' element={<Orders />} /> */}
          <Route path='/profile/order/:type' element={<Profile />} />
          <Route path='/profile/:type' element={<Profile />} />
          <Route path='/*' element={<Loading />} />
          {/* <Route path='/test' elementProfile={<Testpage />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

// Component สำหรับแสดง Header และ Footer
function DefaultLayout() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tickets/all/to/:title' element={<TicketCard />} />
        <Route path='/tickets/:origin/to/:destination' element={<Ticket />} />
        <Route path='/tickets/booking/:id/:origin/:destination' element={<Booking />} />
        <Route path='/tickets/booking/:id/:origin/:destination/checkout' element={<Checkout />} />
        <Route path='/tickets/payment/:id' element={<Payment />} />
        <Route path='/image/upload' element={<ImageUploader />} />
        <Route path='/flight' element={<Flight />} />
        {/* <Route path='/orders' element={<Orders />} /> */}
        <Route path='/profile/order/:type' element={<Profile />} />
        <Route path='/profile/:type' element={<Profile />} />
        <Route path='/*' element={<Loading />} />
        <Route path='/test' element={<Testpage />} />
      </Routes>
      <Footer />
    </div>
  );
}

// Component สำหรับหน้า login ซึ่งไม่มี Header และ Footer
function LoginWithoutHeaderFooter() {
  return <Login />;
}

function RegisterWithoutHeaderFooter(){
  return <Register />;
}

export default App;
