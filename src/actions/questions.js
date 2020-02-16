import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { userQuestions, userAnswerQuestion } from './users'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_ANSWER_QUESTION = 'ADD_ANSWER_QUESTION'

export function receiveQuestions(questions){
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

function addQuestion(question){
    return{
    type: ADD_QUESTION,
    question
 }
}

export function handleAddQuestion(optionOneText, optionTwoText, author){
    return (dispatch) => {
         const question = { optionOneText: optionOneText,
            optionTwoText : optionTwoText,
            author:author}
         dispatch(showLoading())
        
         return saveQuestion(question)
           .then((question) => {
               dispatch(addQuestion(question))
            dispatch(userQuestions(author, question.id))
           })
           .then(() => dispatch(hideLoading()))
    }
}

function addAnswerQuestion({authedUser, qid, answer}){
    return{
        type: ADD_ANSWER_QUESTION,
        authedUser,
        qid, 
        answer
    }
}

 export function handleAddAnswersQuestions(authedUser, qid, answer){
    return dispatch => {  
        dispatch(showLoading());
       
        return saveQuestionAnswer(
            {authedUser, qid, answer}
        )
        
        .then(() => {
              dispatch(addAnswerQuestion({authedUser,qid, answer}))
              dispatch(userAnswerQuestion({authedUser, qid, answer}))
            })
           
         .then(() => dispatch(hideLoading()))
    }
} 



