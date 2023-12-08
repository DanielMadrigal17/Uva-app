import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Files from '../Pages/Files/index'
const PageRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' component={Files}></Route>
                {/* <Route path="/files" component={Files} />
                <Route path='/principal' component={PrincipalPage}></Route> */}
            </Routes>
        </Router>
    );
};

export default PageRoutes;


{/* <BrowserRouter>
    <Routes>
        <Route path="/" element={<Files />}>
            <Route index element={<PrincipalPage />} />
        </Route>
    </Routes>
</BrowserRouter> */}