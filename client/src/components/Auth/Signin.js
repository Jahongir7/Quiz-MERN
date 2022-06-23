/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./SignIn.css";

export default class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  render() {
    return (
      <section>
        <div className="box">
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>

          <div className="container">
            <div className="form1">
              <h2>Platformaga kirish</h2>
              <form action="">
                <div className="inputBx">
                  <input
                    type="text"
                    required="required"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </div>
                <div className="inputBx password">
                  <input
                    id="password-input"
                    type="password"
                    name="password"
                    required="required"
                    placeholder="Parol"
                    value={this.state.password}
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                </div>
                <label className="remember">
                  <input type="checkbox" />
                  Esda saqlash
                </label>
                <div
                  className="btn"
                  style={{
                    background: "#23a6d5",
                    border: "none",
                    textAlign: "center",
                    fontSize: "18px",
                    color: "#fff",
                    borderRadius: "8px",
                  }}
                  onClick={() =>
                    this.props.signIn(this.state.email, this.state.password)
                  }
                >
                  Kirish
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
