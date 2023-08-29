import { useNavigate, useParams } from "react-router-dom";
import configuration from "../configuration.json";
import { useEffect, useState, useRef } from "react";
import QuestionsService from "../services/questionService";
import Methods from "../services/methods.enum";
import VirtualKeyboard from "../components/VirtualKeyboard";
import AnswersService from "../services/answerService";

function Play() {
    const { id } = useParams();
    const inputRef = useRef(null);
    const sets = configuration.questionSets;
    const questionService = new QuestionsService();
    const answersService = new AnswersService();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [questions, setQuestions] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(null);
    const [gameInProgress, setGameInProgress] = useState(false);
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [currentAnswer, setCurrentAnswer] = useState(null);

    useEffect(() => {
        if (!game) {
            let g = sets.find((x) => x.id == id)
            setGame(g);
            generateQuestions(g);
        }
    }, [game]);

    useEffect(() => {
      if (questions) {
          console.log(questions);
          setGameInProgress(true);
          setQuestionIndex(0);
      }
  }, [questions]);

  useEffect(() => {
    if (questionIndex != null) {
      if(questionIndex == questions.length){
        handleQuizComplete();
        return;
      }
      setActiveQuestion(questions[questionIndex]);
    }
  }, [questionIndex]);

    function generateQuestions(set){
      let qs = questionService.generateQuestions(set.numberOfQuestions,
        set.includedNumbers,
        set.secondaryNumbers,
        set.operands)
      setQuestions(qs);
    }

    function onInputChange(event){
      console.log(event);
    }

    function getOperator(method){
      if (method == Methods.Multiplication) return "x";
      if (method == Methods.Division) return "÷";
      if (method == Methods.Addition) return "+";
      if (method == Methods.Subtraction) return "-";
    }

    function handleKeyClicked(key){
      if (key == "enter") {
        submitCurrentAnswer();
        return;
      }

      if (key == "back") {
        handleBackButton();
        return;
      }

      if(currentAnswer == null || currentAnswer == 0){
        setCurrentAnswer(String(key));
        return;
      }

      if(currentAnswer.length >=3) return;

      setCurrentAnswer(currentAnswer + String(key));
    }

    function submitCurrentAnswer(){
      const isCorrect = answersService.checkIfCorrect(
        currentAnswer,
        activeQuestion.firstNumber,
        activeQuestion.secondNumber,
        activeQuestion.method
      );

      isCorrect ? handleCorrectAnswer() : handleIncorrectAnswer();
      inputRef.current.focus();
    }

    function handleCorrectAnswer(){
      setCurrentAnswer(0);
      setQuestionIndex(questionIndex + 1);
    }

    function handleIncorrectAnswer(){
      // Do some css stuff
    }

    function handleBackButton(){
      if(currentAnswer == null) return;
      setCurrentAnswer(currentAnswer.slice(0,-1));
    }

    function handleQuizComplete(){
      navigate("/");
    }

    return (
      <>
        <h1 className="text-4xl mb-4" >Play</h1>
        {game && (
            <p>{game.name}</p>
        )}
        {gameInProgress && (
          <div className="play">
            <div className="grid grid-cols-12">
              <div className="col-span-12">
                <p>Question {questionIndex + 1} of {questions.length}</p>
              </div>
              {activeQuestion && (
                <div className="col-span-12">
                  <p>{activeQuestion.firstNumber} {getOperator(activeQuestion.method)} {activeQuestion.secondNumber}</p>
                </div>
              )}
              <div className="col-span-12">
              <input
                  type="tel"
                  disabled
                  ref={inputRef}
                  value={currentAnswer}
                  onChange={onInputChange}
                  maxLength="4"
                  className="inputClass"
                />
              </div>
              <div className="col-span-12">
                <VirtualKeyboard onKeyClicked={handleKeyClicked} />
              </div>
            </div>
          </div>
        )}
      </>
    )
}

export default Play;

