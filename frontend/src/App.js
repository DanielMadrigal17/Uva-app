import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import User from './components/User';
import PrincipalPage from './components/PrincipalPage';
import BranchOffices from './components/Pages/BranchOffices';
import AttendanceList from './components/Pages/AttendanceList';
import FoodOrderForm from '../src/components/Pages/FoodOrderForm';
import GetStudents from './components/Gets/GetStudents';
import Inventory from '../src/components/Pages/Inventorie/Inventory';
import GetInventary from './components/Gets/GetInventary/getInventary';
import Orders from './components/Pages/ordersForm';
import GetOrders from './components/Gets/GetOrders/getOrders';
import FoodExpenseForm from '../src/components/Pages/FoodExpenseForm';
import ExpenseRecordList from './components/Gets/GetFoodExpenses';

const App = () => {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true); // Para manejar la carga inicial
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log('Información del usuario recuperada:', parsedUser);
      setCurrUser(parsedUser);
    }
  }, []); 

  if (loading) {
    return <h1 >Cargando...</h1>; 
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<User currUser={currUser} setCurrUser={setCurrUser} />} />
          <Route
            path="/principal"
            element={token ? <PrincipalPage /> : <Navigate to="/" replace />}
          />
          <Route path="/orders" element={token ? <Orders /> : <Navigate to="/" replace />} />
          <Route path="/branch_offices" element={token ? <BranchOffices /> : <Navigate to="/" replace />} />
          <Route path="/list_assistance" element={token ? <AttendanceList /> : <Navigate to="/" replace />} />
          <Route path="/get_orders" element={token ? <GetOrders /> : <Navigate to="/" replace />} />
          <Route path="/food_order" element={token ? <FoodOrderForm /> : <Navigate to="/" replace />} />
          <Route path="/get_estudents" element={token ? <GetStudents /> : <Navigate to="/" replace />} />
          <Route path="/food_expenses" element={token ? <FoodExpenseForm /> : <Navigate to="/" replace />} />
          <Route path="/get_expenses" element={token ? <ExpenseRecordList /> : <Navigate to="/" replace />} />
          <Route path="/inventorie" element={token ? <Inventory /> : <Navigate to="/" replace />} />
          <Route path="/get_inventorie" element={token ? <GetInventary /> : <Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;