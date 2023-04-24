import './App.css'
import {Route,Routes} from "react-router-dom"
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import ProfilePage from './pages/ProfilePage'
import PlacesPage from './pages/PlacesPage'
import PlacesFormPage from './pages/PlacesFormPage'
import PlacePage from './pages/PlacePage'
import BookingsPage from './pages/BookingsPage'
import BookingPage from './pages/BookingPage'
import FilteredPage from './pages/FilteredPage'
import dotenv from 'dotenv'
// axios.defaults.baseURL = 'https://api-c63z.onrender.com';
axios.defaults.baseURL = 'http://127.0.0.1:4000';

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;



function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage/>} />
          <Route path='/:str' element={<FilteredPage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/account' element={<ProfilePage/>} />
          <Route path='/account/places' element={<PlacesPage/>} />
          <Route path='/account/places/new' element={<PlacesFormPage/>} />
          <Route path='/account/places/:id' element={<PlacesFormPage/>} />
          <Route path='/place/:id' element={<PlacePage/>} />
          <Route path='/account/bookings' element={<BookingsPage/>} />
          <Route path='/account/bookings/:id' element={<BookingPage/>} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
