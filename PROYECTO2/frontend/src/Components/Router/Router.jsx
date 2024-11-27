import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Login';
import Admin from '../Admin';
import Usuario from '../Usuario';
import CreatePost from '../CreatePost';
import EditarUsuario from '../EditarUsuario';
import RegistroUsuario from '../RegistroUsario';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
               
                <Route path='/' element={<Navigate to="/login" />} />
                <Route path='/login' element={<Login/>} />
                <Route path='/admin' element={<Admin/>} />
                <Route path='/user' element={<Usuario/>} />
                <Route path='/createPost' element={<CreatePost/>} />
                <Route path='/EditarUsuario' element={<EditarUsuario/>} />
                <Route path='/RegistroUsuario' element={<RegistroUsuario/>} />

            </Routes>
        </BrowserRouter>
    );
}

export default Router;