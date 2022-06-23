import React from "react";
import store from "../../store/index";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default class Sidebar extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  bgImage = () => {
    if (store.getState().user.avatar && store.getState().user.avatar.url) {
      return `url(${store.getState().user.avatar.url})`;
    } else {
      return `url(https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg)`;
    }
  };

  render() {
    if (store.getState().user) {
      return (
        <div className="sidebar-wrapper">
          <div className="user">
            <div
              className="avatar"
              style={{ backgroundImage: this.bgImage() }}
            ></div>
            <div className="name">
              {store.getState().user.firstName +
                " " +
                store.getState().user.lastName}
            </div>
          </div>

          <div className="links">
            {/* <NavLink to="/dashboard"><div className="link">Dashboard</div></NavLink> */}
            <NavLink to="/account">
              <div className="link">Akkount</div>
            </NavLink>
            <NavLink to="/my-quizzes">
              <div className="link">Testlarim</div>
            </NavLink>
            <NavLink to="/create-quiz">
              <div className="link">Test yaratish</div>
            </NavLink>
            <NavLink to="/community-quizzes">
              <div className="link">Umumiy Testlar</div>
            </NavLink>
          </div>
        </div>
      );
    } else {
      return <div>Yuklanyapti...</div>;
    }
  }
}
