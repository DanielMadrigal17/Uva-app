import { useState } from 'react';
import './App.css';
import User from './components/User'
import Files from './components/Pages/Files';
import PrincipalPage from './components/PrincipalPage';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import BranchOffices from './components/Pages/BranchOffices';
import AttendanceList from './components/Pages/AttendanceList';
import FoodOrderForm from './components/FoodOrderForm';
import GetStudents from './components/Gets/GetStudents';
import Inventory from './components/Inventorie/Inventory';
import GetInventary from './components/Gets/GetInventary/getInventary';
import Orders from './components/ordersForm';
import GetOrders from './components/Gets/GetOrders/getOrders';
import FoodExpenseForm from './components/FoodExpenseForm';
import ExpenseRecordList from './components/Gets/GetFoodExpenses'


const App =()=>{

  const [currUser, setCurrUser] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element:  <User currUser={currUser} setCurrUser={setCurrUser} />
      ,
    },
    {
      path: "/files",
      element: <Files></Files> ,
    },
    {
      path: "/principal",
      element: <PrincipalPage></PrincipalPage> ,
    },
    {
      path: "/orders",
      element: <Orders></Orders> ,
    },
    {
      path: "/branch_offices",
      element: <BranchOffices></BranchOffices>,
    },
    {
      path: "/list_assistance",
      element: <AttendanceList></AttendanceList>,
    },

    {
      path: "/orders",
      element: <Orders></Orders>,
    },
    {
      path: "/get_orders",
      element: <GetOrders></GetOrders>,
    },

    {
      path: "/food_order",
      element: <FoodOrderForm></FoodOrderForm>,
    },

    {
      path: "/get_estudents",
      element: <GetStudents></GetStudents>,
    },

    {
      path: "/food_expenses",
      element: <FoodExpenseForm></FoodExpenseForm>,
    },

    {
      path: "/get_expenses",
      element: <ExpenseRecordList ></ExpenseRecordList>,
    },

    {
      path: "/inventorie",
      element: <Inventory ></Inventory>,
    },
    {
      path: "/get_inventorie",
      element: <GetInventary ></GetInventary>,
    },
    

  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;

