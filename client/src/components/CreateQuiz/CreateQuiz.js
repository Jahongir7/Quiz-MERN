import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./CreateQuiz.css";
import Dialog from "../Dialog/Dialog";
import axios from "axios";
import Toast from "../Toast/Toast";

export default class CreateQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        "Matematika",
        "Fizika",
        "Informatika",
        "Sport",
        "Tarix",
        "Boshqa",
      ],
      categoryVal: "Matematika",
      mustBeSignedIn: false,
      questions: [],
      name: "",
      addQuestion: false,
      questionName: "",
      answers: [],
      correctAnswer: "",
      showToast: false,
      imgUrl: "",
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("JWT_PAYLOAD")) {
      this.props.history.push("/");
    }
  }

  selectPrivate = (e) => {
    if (e.target.checked === true) {
      this.setState({
        mustBeSignedIn: e.target.checked,
      });
    } else {
      this.setState({ mustBeSignedIn: false });
    }
  };

  addAnswer = () => {
    this.setState({
      answers: this.state.answers.concat(""),
    });
  };

  updateAnswer = (e, i) => {
    let newArr = Object.assign([], this.state.answers);
    newArr[i] = e.target.value;
    this.setState({
      answers: newArr,
    });
  };

  saveQuestion = () => {
    let question = {
      answers: this.state.answers,
      correctAnswer: this.state.correctAnswer,
      questionName: this.state.questionName,
    };
    this.setState({
      questions: this.state.questions.concat(question),
      addQuestion: false,
      questionName: "",
      answers: [],
      correctAnswer: "",
    });
  };

  removeQuestion = (question) => {
    this.setState({
      questions: this.state.questions.filter(
        (ques) => ques.questionName !== question.questionName
      ),
    });
  };

  saveQuiz = () => {
    let quiz = {
      mustBeSignedIn: this.state.mustBeSignedIn,
      name: this.state.name,
      questions: this.state.questions,
      category: this.state.categoryVal,
      imgUrl: this.state.imgUrl,
    };
    axios
      .post("/api/quizzes/create", {
        quiz,
        createdBy: localStorage.getItem("_ID"),
      })
      .then((res) => {
        if (res.data.success) {
          this.setState({
            questions: [],
            answers: [],
            categoryVal: "Matemarika",
            showToast: true,
          });
          setTimeout(() => {
            this.setState({ showToast: false });
          }, 3000);
        }
      })
      .catch((er) => {
        console.error(er);
      });
  };

  render() {
    return (
      <div className="create-quiz-wrapper">
        <Toast model={this.state.showToast} message="Quiz Created" />
        <div>
          <Sidebar />
        </div>

        <div className="main">
          <div className="header">Test Yaratish</div>
          <div className="form card">
            <input
              className="input"
              onChange={(e) => this.setState({ name: e.target.value })}
              value={this.state.name}
              placeholder="Test nomi"
            />
            <br></br>
            <input
              className="input"
              onChange={(e) => this.setState({ imgUrl: e.target.value })}
              value={this.state.imgUrl}
              placeholder="Rasm manzilini kiriting"
            />
            <br></br>
            <select
              value={this.state.categoryVal}
              onChange={(e) => this.setState({ categoryVal: e.target.value })}
              className="input select"
              placeholder="Kategoriya"
            >
              {this.state.categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="checkbox">
              <span>Testni ishlash uchun ro'yhatdan o'tishi kerakmi ?</span>
              <input
                checked={this.state.mustBeSignedIn}
                onChange={this.selectPrivate}
                type="checkbox"
                placeholder="Testni ishlash uchun ro'yhatdan o'tishi kerakmi ?"
              />
            </div>

            {this.state.questions.map((ques, idx) => (
              <div className="question" key={idx}>
                <div>{ques.questionName}</div>
                <div>To'g'ri javob: {ques.correctAnswer}</div>
                <div>Javoblar soni: {ques.answers.length}</div>
                <span
                  className="btn delete"
                  onClick={() => this.removeQuestion(ques)}
                >
                  O'chirish
                </span>
              </div>
            ))}

            <div className="questions">
              <div
                className="add-question"
                onClick={() => this.setState({ addQuestion: true })}
              >
                Savol Qo'shish
              </div>
            </div>

            <span onClick={() => this.saveQuiz()} className="btn save-quiz">
              Saqlash
            </span>

            <Dialog model={this.state.addQuestion}>
              <div className="new-question-form">
                <input
                  className="input"
                  placeholder="Question"
                  value={this.state.questionName}
                  onChange={(e) =>
                    this.setState({ questionName: e.target.value })
                  }
                />
                <div>Javoblar</div>
                {this.state.answers.map((ans, idx) => (
                  <div className="answer-form" key={idx}>
                    <input
                      type="radio"
                      value={this.state.ans}
                      onChange={(e) => this.setState({ correctAnswer: ans })}
                      name="answer"
                    />{" "}
                    <input
                      className="input"
                      type="text"
                      placeholder="Javob"
                      value={this.state.answers[idx]}
                      onChange={(e) => this.updateAnswer(e, idx)}
                    />
                  </div>
                ))}
                <div className="add-answer" onClick={this.addAnswer}>
                  Javob qo'shish
                </div>
                <div className="btn-wrapper">
                  <div
                    className="btn"
                    onClick={() => this.setState({ addQuestion: false })}
                  >
                    Bekor qilish
                  </div>
                  <div className="btn" onClick={this.saveQuestion}>
                    Saqlash
                  </div>
                </div>
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    );
  }
}
