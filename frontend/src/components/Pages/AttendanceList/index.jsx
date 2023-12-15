import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import SideBar from '../../SideBar/SideBar';
import Footer from '../../Footer/Footer';
import StudentRegistrationForm from '../../StudentRegistrationForm';

function AttendanceList() {
  const navigation = useNavigate();

  function goToGetStudents() {
    navigation('/get_estudents');
  }

  return (
    <div>
      <div class="page-header5">
        <div class="container">
          <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div class="page-caption">
                <h1 class="page-title5">Lista de Asistencia</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-section">
        <div class="container">
          <div class="card-block bg-white mb30">
            <div class="row">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="section-title mb-0">
                  <div className="Vamos" onClick={() => goToGetStudents('/get_estudents')}>Ver Lista</div>
                  <StudentRegistrationForm></StudentRegistrationForm>
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
  );
}

export default AttendanceList;
