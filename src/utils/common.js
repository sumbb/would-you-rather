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