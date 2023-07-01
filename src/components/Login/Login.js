import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import logo from '../../images/header-logo.svg';
const {isEmail} = require('validator');

export default function Login({handleLogin}) {
  const { register, formState: {errors, isValid}, handleSubmit, reset } = useForm({mode: "onChange"});

  const onSubmit = ({email, password}) => {
    handleLogin(email, password);
    reset();
  }
  
  return (
    <div className="dialog__align">
      <main className="dialog">
        <form className="dialog__form" action="/" method="post" onSubmit={handleSubmit(onSubmit)}>
          <div className="dialog__head">
            <Link to="/" className="dialog__logo-link"><img className="dialog__logo" src={logo} alt="Movies Explorer" /></Link>
            <h1 className="dialog__title">Рады видеть!</h1>
          </div>
          <div className="dialog__data">
            <fieldset className="dialog__fieldset">
              <label className="dialog__label">Email
                <input className={`dialog__field ${ errors?.email && 'dialog__field_type_error' }`} type="text" id="email-input" name="email" placeholder="pochta@yandex.ru|"
                {...register("email", {
                  required: "Поле обязательно к заполнению",
                  validate: {
                    isEmail: (value) =>
                      isEmail(value) || "Некорректный email-адрес",
                  },
                })} />
                <span className="dialog__error">{ errors?.email && errors?.email?.message }</span>
              </label>
              <label className="dialog__label">Пароль
                <input className={`dialog__field ${ errors?.password && 'dialog__field_type_error' }`} type="password" id="password-input" name="password" placeholder="Пароль"
                {...register("password", {
                  required: "Поле обязательно к заполнению",
                })} />
                <span className="dialog__error">{ errors?.password && errors?.password?.message }</span>
              </label>
            </fieldset>
          </div>
          <div className="dialog__actions">
            <button className={`dialog__submit-btn ${ !isValid && 'dialog__submit-btn_disabled' }`} type="submit">Войти</button>
            <p className="dialog__paragraph">Ещё не зарегистрированы? <Link to="/signup" className="dialog__link">Регистрация</Link></p>
          </div>
        </form>
      </main>
    </div>
  );
}
