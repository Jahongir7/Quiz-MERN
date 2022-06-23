import React from "react";

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    };
  }

  render() {
    return (
      <div className="sign-in-wrapper">
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
                <h2>Ro'yhatdan o'tish</h2>
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
                  <div className="inputBx">
                    <input
                      type="text"
                      required="required"
                      placeholder="Ismingiz"
                      value={this.state.firstName}
                      onChange={(e) =>
                        this.setState({ firstName: e.target.value })
                      }
                    />
                  </div>
                  <div className="inputBx">
                    <input
                      type="text"
                      required="required"
                      placeholder="Familiyangiz"
                      value={this.state.lastName}
                      onChange={(e) =>
                        this.setState({ lastName: e.target.value })
                      }
                    />
                  </div>
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
                    onClick={() => this.props.signUp({ ...this.state })}
                  >
                    Ro'yhatdan o'tish
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
