export default function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="main__header">О&nbsp;проекте</h2>
      <ul className="about-project__highlights">
        <li className="about-project__highlight">
          <h3 className="main__subheader">Дипломный проект включал 5&nbsp;этапов</h3>
          <p className="main__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</p>
        </li>
        <li className="about-project__highlight">
          <h3 className="main__subheader">На&nbsp;выполнение диплома ушло 5&nbsp;недель</h3>
          <p className="main__paragraph">У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className="about-project__gauge">
        <div className="about-project__stage about-project__stage-1">1 неделя</div>
        <div className="about-project__stage about-project__stage-2">4 недели</div>
        <div className="about-project__stage-title">Back-end</div>
        <div className="about-project__stage-title">Front-end</div>
      </div>
    </section>
  );
}
