import { _getUsers, _getQuestions } from '../utils/_DATA'
import { receiveUsers } from './users';
import { receiveQuestions } from './questions';
import { setLoggedUser } from './loggedUser';
import { showLoading, hideLoading } from 'react-redux-loading';

const TEMP_LOGGED_USER = 'johndoe'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        return Promise.all([_getUsers(), _getQuestions()]).then((values) => {
            dispatch(receiveUsers(values[0]))
            dispatch(receiveQuestions(values[1]))
            dispatch(setLoggedUser(TEMP_LOGGED_USER))
            dispatch(hideLoading())
        });
    }

}
