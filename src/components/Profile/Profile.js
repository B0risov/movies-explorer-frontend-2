import {useContext, useEffect} from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {useForm} from 'react-hook-form';
const {isEmail} = require('validator');

export default function Profile({handleUpdateUser, handleSignout}) {
  const currentUser = useContext(CurrentUserContext);
  const { register, formState: {errors, isValid, isDirty}, setValue, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      name: currentUser.name,
      email: currentUser.email,
    }
  });

  useEffect(() => {
    setValue("name", currentUser.name);
    setValue("email", currentUser.email);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const onSubmit = (newUserInfo) => {
    handleUpdateUser(newUserInfo);
  }

  return (
    <div className="profile__align">
      <main className="profile">
        <form className="profile__form" action="/" method="post" onSubmit={handleSubmit(onSubmit)}>
          <div className="profile__head">
            <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          </div>
          <div className="profile__data">
            <fieldset className="profile__fieldset">
              <label className="profile__label"><div>Имя</div>
                <input className={`profile__field ${ errors?.name && 'profile__field_type_error' }`} type="text" id="name-input" name="name" 
                {...register("name", {
                  required: "Поле обязательно к заполнению",
                })} />
              </label>
              <div className="profile__error">{ errors?.name && errors?.name?.message }</div>
              <label className="profile__label">Почта
                <input className={`profile__field ${ errors?.email && 'profile__field_type_error' }`} type="text" id="email-input" name="email" placeholder="pochta@yandex.ru"
                {...register("email", {
                  required: "Поле обязательно к заполнению",
                  validate: {
                    isEmail: (value) =>
                      isEmail(value) || "Некорректный email-адрес",
                  },
                })} />
              </label>
              <span className="profile__error">{ errors?.email && errors?.email?.message }</span>
            </fieldset>
          </div>
          <div className="profile__actions">
            <button className={`profile__btn ${ (!isValid || !isDirty) && 'profile__btn_disabled'}`} type="submit">Редактировать</button>
            <button className="profile__btn profile__btn_type_hot" onClick={handleSignout} type="button">Выйти из аккаунта</button>
          </div>
        </form>
      </main>
    </div>
  );
}
