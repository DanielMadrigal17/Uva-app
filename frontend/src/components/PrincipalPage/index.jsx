import React from 'react'
import './PrincipalPage.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import NavBarPrincipal from '../NavBarPrincipal/NavBarPrincipal';
import SideBar from '../SideBar/SideBar';
import fondo from '../../assets/img/fondo.jpeg';
import niños2 from '../../assets/img/niños2.png';
import Loader from '../Loader';
import Footer from '../Footer/Footer';


function PrincipalPage() {



  const navigation = useNavigate();

  function goToFoodExpenses() {
    navigation('/food_expenses');
  }
  function goToInventary() {
    navigation('/inventorie');
  }
  function goToBranchOffices() {
    navigation('/branch_offices');
  }
  function goToListAssistance() {
    navigation('/list_assistance');
  }
  function goToOrders() {
    navigation('/orders');
  }

  return (


    <div>
            
      <img className='fondo' src={fondo} alt='fondo'></img>
      <NavBarPrincipal></NavBarPrincipal>

    <div>
      <header className="header3">
        <div className="text-box">
          <div className="loader">
            <h1 className="heading-primary">Bienvenido/a</h1>
            <span className="heading-primary-sub3">Algo tengo que poner aquí</span>
            <img className='carton' src={niños2} alt="niños" />
          </div>
        </div>
      </header>
    </div>

      <div className="InventarioIcono">
        <div className="details">
          <div className="cardHeader">Inventario</div>
          <div className="cardText">
            Aquí puedes agregar y eliminar los productos recién ingresados o los que ya no necesites.
          </div>
          <div className="Vamos" onClick={()=>goToInventary('/inventorie')}>Vamos</div>

        </div>
        
      </div>
     

      <div class="RegistrosIcono">
        <div class="details">
          <div class="cardHeader">Registros</div>
          <div class="cardText">
            Chequea todos los registros y datos ingresados durante este día.
          </div>
          <div className="Vamos" onClick={()=>goToFoodExpenses('/food_expenses')}>Vamos</div>
        </div>
      </div>

      <div class="SedesIcono">
        <div class="details">
          <div class="cardHeader">Sedes</div>
          <div class="cardText">
            Aquí puedes ver las sedes al rededor como su información de Contacto.
          </div>
          <div className="Vamos" onClick={()=>goToBranchOffices('/branch_offices')}>Vamos</div>
        </div>
      </div>
      
      

      <div class="ListaIcono">
        <div class="details">
          <div class="cardHeader">Asistencia de niños</div>
          <div class="cardText">
            Ingresa y lleva un control de la lista de niños asistidos el día de hoy.
          </div>
          <div className="Vamos" onClick={()=>goToListAssistance('/list_assistance')}>Vamos</div>
        </div>
      </div>
      <div>
        <SideBar></SideBar>
    </div>
    <footer>
    <Footer></Footer>
    </footer>
    <div>
  </div>
</div>
  )
}



export default PrincipalPage