export function getQuestionInfo(question, author) {
    return {
        qid : question.id,
        author_name : author.name,
        author_avatar : author.avatarURL,
        text : question.optionOne.text.substring(0, question.optionOne.text.length/2)
    }
}

export function isUserLoggedIn( userId ) {
    return (userId === null || userId === '') ? false : true
}

export function sortQuestionsByTimestamp(questionIds, questions) {
    return questionIds.sort((a,b) => questions[b].timestamp - questions[a].timestamp)
}

export function isAnsweredByUser(user, qid) {
    return Object.keys(user.answers).includes(qid)
}

export function calculatePercentage(votes, total) {
    const percentage =  (100*votes)/total
    return Math.round( percentage * 10) / 10
}

export function sortUsersByScore(users) {
    const userIds = Object.keys(users)
    return userIds.sort((a, b) => getScore(users[b]) - getScore(users[a]))
}

export function getScore(user) {
    return getQuestions(user) + getAnswers(user)
}

export function getAnswers(user) {
    return Object.keys(user.answers).length
}

export function getQuestions(user) {
    return user.questions.length
}

export function isValidQuestion(qid, questions) {
    return Object.keys(questions).includes(qid)
}