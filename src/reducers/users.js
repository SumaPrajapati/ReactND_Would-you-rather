import { RECEIVE_USERS, USER_QUESTIONS, USER_ANSWER_QUESTION } from '../actions/users'

export default function users (state = {}, action){
    switch (action.type){
        case RECEIVE_USERS :
            return{
                ...state,
                ...action.users
            }

            case USER_QUESTIONS:
                const {author, qid} = action
                return{
                    ...state,
                    [author]: {...state[author],
                        questions:[...state[author].questions, qid]
                        } 
                   }    
            
            case USER_ANSWER_QUESTION:
                const {authedUser, answer} = action
                return{
                ...state,
                    [authedUser]: {
                        ...state[authedUser],
                    answers:{
                        ...state[authedUser].answers,
                        [action.qid]: answer
                    }
                }
                }    
        default : 
            return state   
    }
}
