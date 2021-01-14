import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, LoginOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Login.css";

function Login({ history }) {
  const email = "piyushchauhan555@gmail.com";
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  //   const [password, password] = useState()
  useEffect(() => {
    if (user && user.token) {
      toast.warning("You are already logged in ...");
      // history.push("/"); // you can push it anywhere where we want
    }
  }, [user]);

  const submitLoginForm = async (e) => {
    e.preventDefault();
    // console.log(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      setLoading(true);
      // toast.success(`Loading`);
      const { user } = result;
      // console.log(user);
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      toast.success(`Logged In Successfully ${email}`);
      // history.push("/");
    } catch (e) {
      console.log(e.message);
      toast.error(e.message);
      setLoading(false);
    }
  };

  const loginForm = () => (
    <form>
      <input
        type="email"
        className="form-control"
        value={email}
        disabled
        autoFocus
      />
      <br />

      <input
        type="password"
        className="form-control"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />
      <br />

      <Button
        onClick={submitLoginForm}
        type="primary"
        shape="round"
        size="middle"
        block
        className="mb-3 inline"
        disabled={!password}
        icon={<MailOutlined />}
      >
        Login with Email
      </Button>
    </form>
  );
  const sendMail = async (e) => {
    // e.preventDefault();
    setLoading(true);
    const config = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: "http://admin.n4number.com/", // we can use the process.env.VARIABLE_NAME
      // This must be true.
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setLoading(false);
        toast.success("Check You email for Password Reset");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err.message);
      });
  };
  return (
    <div className="conatiner p-5 login">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          {loading ? (
            <h4 className="danger">Loading ...</h4>
          ) : (
            <>
              <h4 className="p-2">Login</h4>
            </>
          )}

          {loginForm()}

          <b className="float-right text-danger" style={{cursor:"pointer"}} onClick={sendMail}>
            Forgot Password ?
          </b>
        </div>
      </div>
    </div>
  );
}

export default Login;
