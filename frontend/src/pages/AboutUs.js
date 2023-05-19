import React, { useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import './aboutus.css'; // Importa el archivo CSS correspondiente

function AboutUs() {
  useEffect(() => {
    const mySwiper = new Swiper('#home-slider .swiper-container', {
      direction: 'vertical',
      loop: true,
      pagination: '#home-slider .swiper-pagination',
      grabCursor: true,
      speed: 1000,
      paginationClickable: true,
      parallax: true,
      autoplay: false,
      effect: 'slide'
    });
  }, []);

  return (
    <div className="page-wrap">
      <div id="home-slider">
        <div className="swiper-container">
          <div className="swiper-wrapper">
            <div className="swiper-slide swiper-slide-one">
              <div
                className="swiper-image"
                data-swiper-parallax-y="-20%"
              >
                <div className="swiper-image-inner swiper-image-left swiper-image-one">
                  <h1 className="aboutusH1">
                    <span className="emphasis">Misión</span>. <br />
                  </h1>
                </div>
                
              </div>
              <div className="swiper-image" data-swiper-parallax-y="35%">
                <div className="swiper-image-inner swiper-image-right swiper-image-two">
                  <p className="paragraph">
                    Nuestra misión en FitCook es inspirar y guiar a las personas hacia una vida saludable y equilibrada, brindando herramientas y conocimientos que les permitan alcanzar su mejor versión física y mental. Nos comprometemos a ofrecer soluciones prácticas y personalizadas en nutrición y ejercicio, fomentando hábitos duraderos y promoviendo un bienestar integral.
                  </p>
                </div>
              </div>
            </div>
            <div className="swiper-slide swiper-slide-two">
              <div
                className="swiper-image"
                data-swiper-parallax-y="-20%"
              >
                <div className="swiper-image-inner swiper-image-left swiper-image-three">
                  <h1 className="aboutusH1">
                    <span className="emphasis">Visión</span>. <br />
                  </h1>
                </div>
              </div>
              <div className="swiper-image" data-swiper-parallax-y="35%">
                <div className="swiper-image-inner swiper-image-right swiper-image-four">
                  <p className="paragraph">
                    Como empresa, aspiramos a convertirnos en un referente global en el ámbito de la salud y el fitness, siendo reconocidos por nuestra excelencia en el desarrollo de programas innovadores y eficaces. Buscamos ser líderes en la transformación de vidas, ayudando a las personas a adoptar un estilo de vida saludable y alcanzar un equilibrio sostenible en todas las áreas de su bienestar.
                  </p>
                </div>
              </div>
            </div>
            <div className="swiper-slide swiper-slide-three">
              <div
                className="swiper-image"
                data-swiper-parallax-y="-20%"
              >
                <div className="swiper-image-inner swiper-image-left swiper-image-five">
                  <h1 className="aboutusH1">
                    <span className="emphasis">Valores</span>. <br />
                  </h1>
                </div>
              </div>
              <div className="swiper-image" data-swiper-parallax-y="35%">
                <div className="swiper-image-inner swiper-image-right swiper-image-six">
                    <div className="two-column-container">
                        <div className="column">
                            <p className="paragraph">1. Salud y bienestar: Promovemos la importancia de cuidar la salud y el bienestar en todas sus dimensiones, y nos comprometemos a proporcionar soluciones que apoyen un estilo de vida saludable a largo plazo.</p>
                            <p className="paragraph">2. Calidad y excelencia: Buscamos la excelencia en todo lo que hacemos, desde la selección de ingredientes frescos y nutritivos hasta la entrega de servicios y programas de alta calidad. Nos esforzamos por superar las expectativas de nuestros clientes en cada interacción.</p>
                        </div>    
                        <div className="column">
                            <p className="paragraph">3. Personalización y enfoque individual: Reconocemos que cada persona es única, por lo que adaptamos nuestros programas y servicios a las necesidades individuales de cada cliente. Valoramos el enfoque personalizado y la atención cercana a cada persona que confía en nosotros.</p>
                            <p className="paragraph">4. Empoderamiento y motivación: Queremos empoderar a las personas para que tomen el control de su salud y bienestar, brindándoles las herramientas, el conocimiento y la motivación necesarios para alcanzar sus objetivos. Nos esforzamos por ser un apoyo constante en su viaje hacia un estilo de vida saludable y satisfactorio.</p>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
