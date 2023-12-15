import React from 'react';
import './PrincipalPage.css';
import { useNavigate } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
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
      <div className="page-header">
        <div className="container2">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="page-caption">
                <h1 className="page-title">Bienvenido</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-section">
        <div className="container2">
          <div className="card-block bg-white mb30">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="section-title mb-0">
                  <div className="main-container">
                    <div className="heading">
                      <h1 className="heading__title"> Tus Secciones</h1>
                      <p className="heading__credits">Navega por Uva app de manera sencilla</p>
                    </div>
                    <div className="cards">
                      <div className="card card-1">
                        <div className="card__icon"><img width="50" height="50" src="https://img.icons8.com/ios/50/000000/warehouse-1.png" alt="warehouse-1"/></div>
                        <p className="card__exit"></p>
                        <h2 className="card__title">Inventario</h2>
                        <p className="card__apply">
                          <span className="card__link" onClick={goToInventary}>Vamos</span>
                        </p>
                      </div>
                      <div className="card card-2">
                        <div className="card__icon"><img width="50" height="50" src="https://img.icons8.com/ios/50/000000/food-donor.png" alt="food-donor"/></div>
                        <p className="card__exit"></p>
                        <h2 className="card__title">Gastos Semanales</h2>
                        <p className="card__apply">
                          <span className="card__link" onClick={goToFoodExpenses}>Vamos</span>
                        </p>
                      </div>
                      <div className="card card-3">
                        <div className="card__icon"><img width="50" height="50" src="https://img.icons8.com/ios/50/000000/marker--v1.png" alt="marker--v1"/></div>
                        <p className="card__exit"></p>
                        <h2 className="card__title">Locación</h2>
                        <p className="card__apply">
                          <span className="card__link" onClick={goToBranchOffices}>Vamos</span>
                        </p>
                      </div>
                      <div className="card card-4">
                        <div className="card__icon"><img width="50" height="50" src="https://img.icons8.com/ios/50/children--v1.png" alt="children--v1"/></div>
                        <p className="card__exit"></p>
                        <h2 className="card__title">Asistencia de Niños</h2>
                        <p className="card__apply">
                          <span className="card__link" onClick={goToListAssistance}>Vamos</span>
                        </p>
                      </div>
                      <div className="card card-5">
                        <div className="card__icon"><img width="50" height="50" src="https://img.icons8.com/ios/50/order-completed--v2.png" alt="order-completed--v2"/></div>
                        <p className="card__exit"></p>
                        <h2 className="card__title">Pedidos</h2>
                        <p className="card__apply">
                          <span className="card__link" onClick={goToOrders}>Vamos</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <SideBar></SideBar>
        </div>
        <footer>
          <Footer></Footer>
        </footer>
      </div>
    </div>
  );
}

export default PrincipalPage;
