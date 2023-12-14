import React from 'react';
import { useNavigate } from 'react-router-dom'
import './styles.css';
import manitas from '../../../assets/img/manitas.png';
import fondo from '../../../assets/img/fondo.jpeg';
import SideBar from '../../SideBar/SideBar';
import Footer from '../../Footer/Footer';
import StudentRegistrationForm from '../../StudentRegistrationForm';
import GetStudents from '../../Gets/GetStudents';

function AttendanceList() {
  const navigation = useNavigate();

  function goToGetStudents() {
    navigation('/get_estudents');
  }

  return (
    <div>
      <img className='fondo' src={fondo} alt='fondo'></img>


      <header className="header3">
        <div className="text-box">
          <div className="loader">
            <h1 className="heading-primary">Asistencia</h1>
            <span className="heading-primary-sub3">      
            <div className="Vamos" onClick={()=>goToGetStudents('/get_estudents')}>Ver Lista</div>
          </span>
            <img className='manos' src={manitas} alt="manos" />
          </div>
        </div>
      </header>
      <StudentRegistrationForm></StudentRegistrationForm>

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


