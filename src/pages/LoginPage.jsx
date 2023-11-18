import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import loginImage from "../assets/12291262_Wavy_Tech-30_Single-11.svg";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { signin, error, isAuth, user } = useAuth();

  useEffect(() => {
    let rol = "";
    if (user != null) {
      rol = user.rol;
    }
    console.log(rol);

    if (isAuth) {
      if (rol === "usuario") {
        navigate("/buy");
      } else if (rol === "admin") {
        navigate("/products");
      }
    }
  }, [isAuth]);

  const onSubmit = handleSubmit(async (values) => {
    signin(values);
  });
  return (
    <section className="FormSingin">
      <div className="ContainerLogin">
        <form onSubmit={onSubmit} className="formLogin">
          <h2 className="titleform">Login</h2>
          {<div className="error">{error}</div>}
          <div className="inputlogin">
            <input
              type="text"
              {...register("UserId", {
                required: {
                  value: true,
                  message: "UserId is Required",
                },
                maxLength: 10,
                pattern: {
                  value: /^[0-9]+$/,
                  message: "UserId can not contain spaces or letters.",
                },
              })}
              placeholder="Identification"
            />
            {errors.UserId && (
              <div className="error">{errors.UserId.message}</div>
            )}
          </div>
          <div className="inputlogin">
            <input
              type="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "password is Required",
                },
                minLength: { value: 6, message: "Min length is 6" },
              })}
              placeholder="Password"
            />
            {errors.password && (
              <div className="error">{errors.password.message}</div>
            )}
          </div>

          <div className="btnsubmit">
            <button className="submitlogin" type="submit">
              Sign in
            </button>
          </div>
        </form>
        <div className="imglogin">
          <div className="">
            <h1>Welcome to </h1>
            <p>Our page</p>
          </div>
          <div className="CreateLink">
            <p>
              Don't have an account{" "}
              <Link className="Link" to="/create">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
