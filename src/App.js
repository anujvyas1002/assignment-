import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { About } from './pages/About';
import { Navbar } from './components/Navbar';
import { CompanyTable } from './pages/Home/CompanyTable';
import  {SaveData}  from './pages/View/SaveData';

function App() {
    return (
        <div className="App">
                <BrowserRouter>
                    <Navbar/>
                    <Routes>
                        <Route exact path="*" element={<CompanyTable/>}></Route>
                        <Route exact path="/home" element={<CompanyTable/>}></Route>
                        <Route exact path="/view" element={<SaveData />}></Route>
                        <Route exact path="/about" element={<About />}></Route>
                    </Routes>
                </BrowserRouter>
        </div>
    );
}

export default App;
