import { _getUsers, _getQuestions } from '../utils/_DATA'
import { receiveUsers } from './users';
import { receiveQuestions } from './questions';
import { setLoggedUser } from './loggedUser';


export function handleInitialData() {
    return (dispatch) => {
        return Promise.all([_getUsers(), _getQuestions()]).then((values) => {
            dispatch(receiveUsers(values[0]))
            dispatch(receiveQuestions(values[1]))
            dispatch(setLoggedUser(null))
        });
    }

}
