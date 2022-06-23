import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import "./MyQuizzes.css";

export default class MyQuizzes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizzes: [],
    };
  }

  componentDidMount() {
    axios
      .get("/api/quizzes/my-quizzes/" + localStorage.getItem("_ID"))
      .then((res) => {
        this.setState({
          quizzes: res.data,
        });
      });
  }

  takeQuiz = (quizId) => {
    this.props.history.push("/view-quiz?id=" + quizId);
  };

  render() {
    return (
      <div className="my-quizzes-wrapper">
        <div>
          <Sidebar />
        </div>
        <div className="body">
          <div className="header-top">Testlarim</div>
          <div className="quizzes-wrapper">
            {this.state.quizzes.map((quiz, idx) => (
              <div key={idx} className="quiz-card card">
                <img
                  src={
                    quiz.imgUrl ||
                    "https://images.unsplash.com/photo-1518770660439-4636190af475?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaG5vbG9neXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
                  }
                  alt=""
                />
                <div className="quiz-name">{quiz.name}</div>
                <div className="category">{quiz.category}</div>
                <div className="questions">{quiz.questions.length} Savol</div>
                <div
                  className="take-quiz btn"
                  onClick={() => this.takeQuiz(quiz._id)}
                >
                  Boshlash
                </div>

                <div className="top-section">
                  <div className="views">
                    {quiz.views}{" "}
                    <img
                      src="https://www.pngkit.com/png/full/525-5251817_security-governance-privacy-eye-icon-font-awesome.png"
                      alt=""
                    />{" "}
                  </div>
                  <div className="likes">
                    {quiz.likes}{" "}
                    <img
                      alt=""
                      src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
