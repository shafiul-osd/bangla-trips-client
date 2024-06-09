import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { FaGoogle } from "react-icons/fa6";
import loginImg from "../../assets/login.avif";
import { Divider } from "@mui/material";
import { Link, useLocation, useNavigate,} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import Auth from "../../firebase.config";

const SignIN = () => {

  const { googleLogin, signInWithEmailPassword } = useContext(AuthContext);
  const locationn = useLocation();
  const state = locationn.state;
  const navigate = useNavigate();

  const { axiosSecure } = useAxios();
  const user = useAuth();

  const handleGoogleLogin = () => {
    googleLogin()
      .then(res => {
        Swal.fire({
          icon: "success",
          title: "Success!!",
          text: "Logged In",
        });

        const userInfo = {
          email: Auth.currentUser.email,
          name: Auth.currentUser.displayName,
          photoURL: Auth.currentUser.photoURL,
          role: "tourist",
        };

        axiosSecure.post(`/user`, userInfo);

        navigate(state ? state : "/")
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
      });
  };

  const handleSignIn = event => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    signInWithEmailPassword(email, password)
      .then(res => {
        Swal.fire({
          icon: "success",
          title: "Success!!",
          text: "Logged In",
        });
        navigate(state ? state : "/")
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message,
        });
      });
  };
  return (
    <div className="flex justify-center items-center h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center">
        <div className=" hidden md:block">
          <img src={loginImg} alt="" />
        </div>
        <div className="">
          <Card color="transparent" shadow={false}>
            <form
              onSubmit={handleSignIn}
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            >
              <div className="text-center my-10">
                <Typography variant="h4" color="blue-gray">
                  Sign In
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  Nice to meet you! Enter your details to register.
                </Typography>
              </div>
              <div className="mb-1 flex flex-col gap-6">
                <Input type="email" label="Email" name="email" required/>
                <Input type="password" label="Password" name="password" required/>
              </div>
              <Checkbox
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal"
                  >
                    I agree the
                    <a
                      href="#"
                      className="font-medium transition-colors hover:text-gray-900"
                    >
                      &nbsp;Terms and Conditions
                    </a>
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
              />
              <Button type="submit" className="mt-6" fullWidth>
                Sign In
              </Button>
              <div className="my-5">
                <Divider>OR</Divider>
              </div>
              <div className="text-center">
                <IconButton
                  onClick={handleGoogleLogin}
                  className="text-2xl rounded bg-[#ea4335] hover:shadow-[#ea4335]/20 focus:shadow-[#ea4335]/20 active:shadow-[#ea4335]/10"
                >
                  <FaGoogle />
                </IconButton>
              </div>

              <Typography color="gray" className="mt-4 text-center font-normal">
                Already have an account?{" "}
                <Link to="/sign-up" className="font-medium text-gray-900">
                  Sign Up
                </Link>
              </Typography>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignIN;
