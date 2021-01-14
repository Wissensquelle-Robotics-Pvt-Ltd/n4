import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  //   const [password, password] = useState()
  useEffect(() => {
    if (user && user.token) {
      toast.warning("You are already logged in ...");
      history.push("/");
    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: "http://localhost:3000/login", // we can use the process.env.VARIABLE_NAME
      // This must be true.
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
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
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? (
        <h4 className="text-danger">Loading ...</h4>
      ) : (
        <h4>Forgot Password</h4>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
          autoFocus
        ></input>
        <br />
        <button className="btn btn-raised" disabled={!email}>
          Forgot Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
