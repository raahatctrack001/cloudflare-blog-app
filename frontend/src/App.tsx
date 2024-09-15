import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Blog from './pages/Blog';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-up' element={<Signup />}  />
        <Route path='/sign-in' element={<Signin />} />
        <Route path='/blog/:blogId' element={<Blog />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
