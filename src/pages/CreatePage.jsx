import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreatePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuth, error, user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/buy");
  }, [isAuth]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <section className="FormCreate">
      <div className="containerCreate">
        <div className="imgCreate">
          <div className="">
            <h1>Welcome</h1>
            <p>Our page</p>
          </div>
          <div className="CreateLink">
            <p>
              Already have an account{" "}
              <Link className="Link" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="formCreate">
          <h2 className="titleform">Create User</h2>
          {<div className="error">{error}</div>}
          <div className="inputCreate">
            <input
              type="text"
              {...register("UserId", {
                required: {
                  value: true,
                  message: "UserId is Required",
                },
                maxLength: {
                  value: 10,
                  message: "Id Must have at most 10 numbers",
                },
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
          <div className="inputCreate">
            <input
              type="text"
              {...register("Name", {
                required: {
                  value: true,
                  message: "Name is Required",
                },
              })}
              placeholder="Name"
            />
            {errors.Name && <div className="error">{errors.Name.message}</div>}
          </div>

          <div className="inputCreate">
            <input
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is Required",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Entered value does not match email format",
                },
              })}
              placeholder="Email"
            />
            {errors.email && (
              <div className="error">{errors.email.message}</div>
            )}
          </div>

          <div className="inputCreate">
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

          <div className="inputCreate">
            <input
              type="text"
              {...register("phone", {
                required: {
                  value: true,
                  message: "Phone is Required",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Phone can not contain spaces or letters.",
                },
              })}
              placeholder="CellPhone"
            />
            {errors.phone && (
              <div className="error">{errors.phone.message}</div>
            )}
          </div>
          <div className="inputCreate">
            <input
              type="text"
              {...register("location", {
                required: {
                  value: true,
                  message: "Location is Required",
                },
              })}
              placeholder="Localization"
            />
            {errors.location && (
              <div className="error">{errors.location.message}</div>
            )}
          </div>
          <div className="btnsubmit">
            <button className="submitcreate" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreatePage;
