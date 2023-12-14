import React from 'react';
import "./styles.css";
import SideBar from '../../SideBar/SideBar';
import fondo from '../../../assets/img/fondo.jpeg';
import map from '../../../assets/img/map.png';
import Footer from '../../Footer/Footer';

function BranchOffices() {
  return (
    <div>
      <img className='fondo' src={fondo} alt='fondo'></img>
      <header className="header3">
        <div className="text-box">
          <div className="loader2">
            <h1 className="heading-primary2">LOCACIÓN</h1>
            <span className="heading-primary-sub4">Algo tengo que poner aquí</span>
            <img className='map' src={map} alt="mapa" />
          </div>
        </div>
      </header>

      <div>
        <article className="cardMap">
          <div className="temporary_text">
            <iframe 
              title="Mi iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.4736797685646!2d-84.75265102670187!3d9.977674373422058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0316642cb4799%3A0xcd6dd2419f6925ac!2sDirecci%C3%B3n%20Regional%20de%20CEN-CINAI%20Pacifico%20Central!5e0!3m2!1ses-419!2scr!4v1701362933719!5m2!1ses-419!2scr" 
              width="450" 
              height="300" 
              style={{ border: 'none' }} 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="card_content">
            <span className="card_title">Dirección Regional de CEN-CINAI Pacifico Central</span>
            <span className="card_subtitle">Mira los detalles</span>
            <p className="card_description">
              Teléfono: 2663-0598 / 2660-0973 ext. 103-105 <br />
              Correo electrónico:  ying.cheng@cen-cinai.go.cr <br />
              Dirección: PuntarenasPuntarenas, El Roble, Cinco Estrellas, Edificio Alfa y Omega, contiguo al edificio de Aduanas del Ministerio de Hacienda.
              Oficina Local Puntarenas
            </p>
          </div>
        </article>
      </div>

      <div>
  
{/* src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d27684.032872282358!2d-84.75265925389061!3d9.974834743988628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x8fa0316642cb4799%3A0xcd6dd2419f6925ac!2sDirecci%C3%B3n%20Regional%20de%20CEN-CINAI%20Pacifico%20Central%2C%20X6HX%2B3X7%2C%2017%2C%20Provincia%20de%20Puntarenas%2C%20Chacarita!3m2!1d9.9778468!2d-84.75002339999999!5e0!3m2!1ses-419!2scr!4v1701288399891!5m2!1ses-419!2scr" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" */}


<article className="cardMap2">
    <div className="temporary_text2">
    <iframe 
                title="Mi iframe"
                // src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d125743.1636925419!2d-84.83247800482232!3d9.977658988577282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x8fa0316642cb4799%3A0xcd6dd2419f6925ac!2sX6HX%2B3X7%2C%2017%2C%20Provincia%20de%20Puntarenas%2C%20Chacarita!3m2!1d9.9778468!2d-84.75002339999999!5e0!3m2!1ses-419!2scr!4v1701272078436!5m2!1ses-419!2scr"
                // width="500px"
                src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d1006081.9880428726!2d-85.30411506243914!3d9.933310635211921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x8f9f9b56ad08c759%3A0xa9fdabdcb2c65aef!2sXV6Q%2BC48%20CEN%20CINAI%20Jicaral%2C%20Ruta%20Nacional%20Primaria%2021%2C%20Provincia%20de%20Puntarenas%2C%20Jicaral!3m2!1d9.9610355!2d-85.11215849999999!5e0!3m2!1ses-419!2scr!4v1701310929675!5m2!1ses-419!2scr" width="450" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                
                // height="290px" 
                style={{ border: 'none' }} 
            />
    </div>
<div className="card_content2">
    <span className="card_title2">Oficina Local del CEN-CINAI Jicaral</span>
        <span className="card_subtitle2">Mira los detalles</span>
        <p className="card_description2">Teléfono: 2650-0101 <br />
Correo electrónico: grethel.perez@cen-cinai.go.cr <br />
Dirección: Área Rectora de Jicaral, contiguo a la sede Cruz Roja, Puntarenas. </p>
    
</div>
</article>

</div>





<div>
  
{/* src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d27684.032872282358!2d-84.75265925389061!3d9.974834743988628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x8fa0316642cb4799%3A0xcd6dd2419f6925ac!2sDirecci%C3%B3n%20Regional%20de%20CEN-CINAI%20Pacifico%20Central%2C%20X6HX%2B3X7%2C%2017%2C%20Provincia%20de%20Puntarenas%2C%20Chacarita!3m2!1d9.9778468!2d-84.75002339999999!5e0!3m2!1ses-419!2scr!4v1701288399891!5m2!1ses-419!2scr" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" */}


<article className="cardMap3">
    <div className="temporary_text3">
    <iframe 
                title="Mi iframe"
                // src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d125743.1636925419!2d-84.83247800482232!3d9.977658988577282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x8fa0316642cb4799%3A0xcd6dd2419f6925ac!2sX6HX%2B3X7%2C%2017%2C%20Provincia%20de%20Puntarenas%2C%20Chacarita!3m2!1d9.9778468!2d-84.75002339999999!5e0!3m2!1ses-419!2scr!4v1701272078436!5m2!1ses-419!2scr"
                // width="500px"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d686.8046080150251!2d-84.83826848162593!3d9.976054926361916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa02ec045c182b5%3A0x8cb6d8c491edca6d!2sCinai%20de%20Puntarenas!5e0!3m2!1ses-419!2scr!4v1701361345023!5m2!1ses-419!2scr" width="450" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"

                
                // height="290px" 
                style={{ border: 'none' }} 
            />
    </div>
<div className="card_content3">
    <span className="card_title3">CEN-CINAI de Puntarenas</span>
        <span className="card_subtitle3">Código de establecimiento: 6010107</span>
        <p className="card_description3">Ubicación: / Puntarenas / Puntarenas / Puntarenas <br />
Tipo: CINAI ( 2 ) <br />
Teléfono: 26612891 <br />
Dirección: Frente a Cabinas Midey Puntarenas centro <br />
Oficina Local: Puntarenas ( 701 ) <br />
Región: Pacífico Central ( 7 ) </p>
    
</div>
</article>
 
</div>




<div>
  


<article className="cardMap4">
    <div className="temporary_text4">
    <iframe 
                title="Mi iframe"
                // src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d125743.1636925419!2d-84.83247800482232!3d9.977658988577282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x8fa0316642cb4799%3A0xcd6dd2419f6925ac!2sX6HX%2B3X7%2C%2017%2C%20Provincia%20de%20Puntarenas%2C%20Chacarita!3m2!1d9.9778468!2d-84.75002339999999!5e0!3m2!1ses-419!2scr!4v1701272078436!5m2!1ses-419!2scr"
                // width="500px"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18245.432996369203!2d-84.76978721674267!3d9.975954860984698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0314681250819%3A0x797745bbad79a649!2sCEN-CINAI%20Fray%20Casiano!5e0!3m2!1ses-419!2scr!4v1701362235237!5m2!1ses-419!2scr" width="450" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"

                
                // height="290px" 
                style={{ border: 'none' }} 
            />
    </div>
<div className="card_content4">
    <span className="card_title4">CEN-CINAI de Fray Casiano</span>
        <span className="card_subtitle4">Código de establecimiento: 6011208</span>
        <p className="card_description4">Ubicación: / Puntarenas / Puntarenas / Chacarita <br />
Tipo: CEN ( 1 ) <br />
Teléfono: 26631630 <br />
Dirección: Costado este de la Guardia de Asistencia Rural de Fray Casiano <br />
Oficina Local: Puntarenas ( 701 ) <br />
Región: Pacífico Central ( 7 ) </p>
    
</div>
</article>
 
</div>
      <div>
        <SideBar></SideBar>
      </div>

      <footer>
        <Footer></Footer>
      </footer>
    </div>
  )
}

export default BranchOffices;
