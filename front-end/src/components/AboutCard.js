import React from 'react';
import ana from '../images/ana.png';
import anderson from '../images/anderson.png';
import andressa from '../images/andressa.png';
import bianca from '../images/bianca.png';
import luan from '../images/luan.png';

function AboutCard() {
  return (
    <div className="about-container">
      <figure>
        <img className="creator-img" src={ luan } alt="Luan Filipe" />
        <figcaption>
          <h1>Luan Filipe</h1>
          <a className="creator-link" href="https://www.w3schools.com">Linkedin</a>
          <a className="creator-link" href="https://www.w3schools.com">GitHub</a>
        </figcaption>
      </figure>

      <figure>
        <img className="creator-img" src={ bianca } alt="Luan Filipe" />
        <figcaption>
          <h1>Bianca Oura</h1>
          <a className="creator-link" href="http://linkedin.com/in/biancaoura">Linkedin</a>
          <a className="creator-link" href="https://github.com/biancaoura">GitHub</a>
        </figcaption>
      </figure>

      <figure>
        <img className="creator-img" src={ anderson } alt="Luan Filipe" />
        <figcaption>
          <h1>Aderson Silva</h1>
          <a className="creator-link" href="https://www.linkedin.com/in/ap-silva">Linkedin</a>
          <a className="creator-link" href="https://github.com/Andersonp-Silva25">GitHub</a>
        </figcaption>
      </figure>

      <figure>
        <img className="creator-img" src={ andressa } alt="Luan Filipe" />
        <figcaption>
          <h1>Andressa Ribeiro</h1>
          <a className="creator-link" href="https://www.linkedin.com/in/andressaribeiroo">Linkedin</a>
          <a className="creator-link" href="https://github.com/andressaribeiroo">GitHub</a>
        </figcaption>
      </figure>

      <figure>
        <img className="creator-img" src={ ana } alt="Luan Filipe" />
        <figcaption>
          <h1>Ana Beatriz</h1>
          <a className="creator-link" href="https://www.w3schools.com">Linkedin</a>
          <a className="creator-link" href="https://www.w3schools.com">GitHub</a>
        </figcaption>
      </figure>

    </div>
  );
}

export default AboutCard;
