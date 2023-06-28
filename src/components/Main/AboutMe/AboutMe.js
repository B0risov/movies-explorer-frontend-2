import portrait from '../../../images/student.jpg';

export default function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="main__header">Студент</h2>
      <div className="about-me__bio">
        <img className="about-me__portrait" src={portrait} alt="Портрет" />
        <div className="about-me__text">
          <h3 className="about-me__title">Матвей</h3>
          <p className="about-me__description">Фронтенд-разработчик, 21 год</p>
          <p className="about-me__paragraph">Я родился в Санкт-Петебурге. Учился на Инженера в Политехническом универститете, но быстро понял, что это не та специальлность, которой я хотел бы заниматься. Решил попробовать себя в программировании, и чтобы получить академичность и четкую программу взял курсы Яндекс Практикума. Уже успел найти стажировку в одной компании, пока что всё супер!</p>
          <ul className="about-me__links">
            <li className="about-me__link">Facebook</li>
            <li className="about-me__link">Github</li>
          </ul>
        </div>
      </div>
    </section>
  );
}