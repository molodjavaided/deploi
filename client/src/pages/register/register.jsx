import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button, Input, Logo } from "../../components";
import { authActions } from "../../store/actions/auth-actions";
import { registerUser } from "../../store/actions/auth-async";

const registerFormSchema = yup.object().shape({
  login: yup
    .string()
    .required("Заполните логин")
    .matches(/^\S*$/, "Неверный логин. Недопускаются пробелы")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Неверный логин. Допускаются только буквы и цифры"
    )
    .min(3, "Неверный логин. Минимум 3 символа")
    .max(15, "Неверный логин. Максимум 15 символов"),
  password: yup
    .string()
    .required("Заполните пароль")
    .matches(
      /[a-z]/,
      "Неверный пароль. Должна быть хотя бы одна строчная буква"
    )
    .matches(
      /[A-Z]/,
      "Неверный пароль. Должна быть хотя бы одна заглавная буква"
    )
    .matches(/\d/, "Неверный пароль. Должна быть хотя бы одна цифра")
    .min(8, "Неверный пароль. Минимум 8 символов")
    .max(30, "Неверный пароль. Максимум 30 символов"),

  passwordConfirmation: yup
    .string()
    .required("Подтвердите пароль")
    .oneOf([yup.ref("password")], "Пароли должны совпадать"),
});

const RegisterContainer = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isLoading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
      passwordConfirmation: "",
    },
    resolver: yupResolver(registerFormSchema),
  });

  const onSubmit = async ({ login, password }) => {
    try {
      await dispatch(registerUser(login, password));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const formError =
    errors?.login?.message ||
    errors?.password?.message ||
    errors?.passwordConfirmation?.message;

  const errorMessage = formError || error;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <Logo />
      <Input
        type="text"
        placeholder="Логин..."
        {...register("login", {
          onChange: () => dispatch(authActions.clearError()),
        })}
      />
      <Input
        type="password"
        placeholder="Пароль..."
        {...register("password", {
          onChange: () => dispatch(authActions.clearError()),
        })}
      />
      <Input
        type="password"
        placeholder="Повторите пароль..."
        {...register("passwordConfirmation", {
          onChange: () => dispatch(authActions.clearError()),
        })}
      />
      <Button type="submit" disabled={!!formError || isLoading}>
        {isLoading ? "Идет регистрация" : "Регистрация"}
      </Button>
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      <Link to="/login">Войти</Link>
    </form>
  );
};

export const Register = styled(RegisterContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;
  max-width: 400px;
  margin-top: 50px;
  padding: 30px;
  border-radius: 10px;
  transition: all 0.3s;
  box-sizing: border-box;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

  .errorMessage {
    color: red;
    font-size: 0.9rem;
    letter-spacing: 0.05rem;
    text-align: center;
    margin-top: 10px;
  }

  /* Адаптивность логотипа в форме */
  ${Logo} {
    width: 120px !important;
    height: 120px !important;
    margin-bottom: 20px;

    @media (max-width: 480px) {
      width: 100px !important;
      height: 100px !important;
    }
  }

  /* Мобильные стили */
  @media (max-width: 768px) {
    margin-top: 30px;
    padding: 20px;
    max-width: 350px;
  }

  @media (max-width: 480px) {
    margin-top: 20px;
    padding: 15px;
    max-width: 300px;
    gap: 12px;
  }
`;
