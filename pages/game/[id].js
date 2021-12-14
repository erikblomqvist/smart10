import { useState, useEffect } from 'react'
import { ref, update, onValue } from 'firebase/database'
import database from '/firebase.config'
import Head from 'next/head'
import smart10 from '/smart10.json'
import {
    Wrapper,
    CorrectAnswer, CorrectAnswerInner, CorrectAnswerContent, CorrectAnswerButtons, CorrectButton, WrongButton,
    Board,
    Container,
    Question, Answers, Answer, Alternative, Plupp
} from './s'
import Scores from './scores'
import { Check, X } from 'styled-icons/feather'

const Game = ({ id }) => {
    const [questions, setQuestions] = useState(smart10)
    const [currentQuestion, setCurrentQuestion] = useState(null)
    const [correctAnswer, setCorrectAnswer] = useState(null)
    const [takenWrongAnswers, setTakenWrongAnswers] = useState([])
    const [takenCorrectAnswers, setTakenCorrectAnswers] = useState([])

    const [playerTurn, setPlayerTurn] = useState(0)
    const [currentPlayer, setCurrentPlayer] = useState(0)
    const [players, setPlayers] = useState([])

    const randomQuestion = () => {
        if(!questions) {
            return null
        }

        const newQuestionIndex = Math.floor(Math.random() * questions.length)

        console.log(newQuestionIndex)
        console.log(questions[newQuestionIndex])

        setQuestions(previousQuestions => previousQuestions.filter((_, index) => index !== newQuestionIndex))

        return questions[newQuestionIndex]
    }

    const nextQuestion = () => {
        setTakenWrongAnswers([])
        setTakenCorrectAnswers([])
        setCurrentQuestion(randomQuestion())

        setPlayers(prevPlayers => {
            return prevPlayers.map(({ isOut, score, totalScore, ...rest }) => ({
                ...rest,
                totalScore: !isOut ? totalScore + score : totalScore,
                score: 0,
                canGuess: true,
                isOut: false
            }))
        })

        if(playerTurn >= players.length - 1) {
            setPlayerTurn(0)
            setCurrentPlayer(0)
        } else {
            setCurrentPlayer(playerTurn + 1)
            setPlayerTurn(prevPlayer => prevPlayer + 1)
        }
    }

    const nextPlayer = updatedPlayers => {
        let possibleGuessers = updatedPlayers.filter(({ canGuess }) => !!canGuess).length
        let currentGuesserIndex = currentPlayer

        while(!!possibleGuessers) {
            if(currentGuesserIndex >= players.length - 1) {
                currentGuesserIndex = 0
            } else {
                currentGuesserIndex++
            }

            if(!!players[currentGuesserIndex].canGuess) {
                setCurrentPlayer(currentGuesserIndex)

                break
            }
        }

        if(!possibleGuessers) {
            nextQuestion()
        }
    }

    useEffect(() => {
        const gameRef = ref(database, `games/${id}`)

        onValue(gameRef, (snapshot) => {
            const data = snapshot.val()

            const {
                players,
                currentQuestion,
                currentPlayer,
                playerTurn
            } = data

            if(players) {
                setPlayers(players)
            }

            if(currentQuestion) {
                setQuestions(previousQuestions => previousQuestions.filter(({ question }) => question !== currentQuestion.question))

                // setCurrentQuestion(questions[21])
                setCurrentQuestion(currentQuestion)
            }

            if(playerTurn) {
                setPlayerTurn(playerTurn)
            }

            if(currentPlayer) {
                setCurrentPlayer(currentPlayer)
            }
        })

    }, [id])

    useEffect(() => {
        const gameRef = ref(database, `games/${id}`)

        const data = {
            currentPlayer,
            players,
            playerTurn,
            currentQuestion
        }

        console.log(data)

        if(!!players?.length && !!currentQuestion) {
            console.log('uppdaterar')
            update(gameRef, data)
        }
    }, [currentPlayer, players, playerTurn, currentQuestion])

    useEffect(() => {
        if(takenWrongAnswers.length + takenCorrectAnswers.length === 10) {
            nextQuestion()
        }
    }, [takenWrongAnswers, takenCorrectAnswers])

    if(!currentQuestion) {
        return null
    }

    return (
        <div>
            <Head>
                <title>Smart10 - Spel</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Wrapper>
                <CorrectAnswer
                    className={!!correctAnswer ? 'show' : 'hide'}
                    show={!!correctAnswer}>
                    <CorrectAnswerInner>
                        <CorrectAnswerContent>
                            <h2>{correctAnswer?.alternative}</h2>
                            {(currentQuestion.type === 'color') && (
                                <h1>
                                    {correctAnswer?.answer?.map(color => (
                                        <span
                                            key={color}
                                            className={color}
                                            style={{ color }}>
                                            {colorToNameMap[color]}
                                        </span>
                                    ))}
                                </h1>
                            )}
                            {(currentQuestion.type !== 'color') && (
                                <h1>{correctAnswer?.answer}</h1>
                            )}
                            <CorrectAnswerButtons>
                                <CorrectButton onClick={() => {
                                    if(!takenCorrectAnswers.includes(correctAnswer.index)) {
                                       setTakenCorrectAnswers([
                                           ...takenCorrectAnswers,
                                           correctAnswer.index
                                       ])
                                    }

                                    setTakenWrongAnswers(takenWrongAnswers.filter(wrongIndex => correctAnswer.index !== wrongIndex))

                                    setCorrectAnswer(null)

                                    const updatedPlayers = [
                                        ...players.slice(0, currentPlayer),
                                        {
                                            ...players[currentPlayer],
                                            score: players[currentPlayer].score + 1
                                        },
                                        ...players.slice(currentPlayer + 1, players.length)
                                    ]

                                    setPlayers(updatedPlayers)

                                    nextPlayer(updatedPlayers)
                                }}>
                                    <Check size={40} />
                                </CorrectButton>
                                <WrongButton onClick={() => {
                                    if(!takenWrongAnswers.includes(correctAnswer.index)) {
                                        setTakenWrongAnswers([
                                            ...takenWrongAnswers,
                                            correctAnswer.index
                                        ])
                                    }

                                    setTakenCorrectAnswers(takenCorrectAnswers.filter(correctIndex => correctAnswer.index !== correctIndex))

                                    setCorrectAnswer(null)

                                    const updatedPlayers = [
                                        ...players.slice(0, currentPlayer),
                                        {
                                            ...players[currentPlayer],
                                            score: 0,
                                            canGuess: false,
                                            isOut: true
                                        },
                                        ...players.slice(currentPlayer + 1, players.length)
                                    ]

                                    setPlayers(updatedPlayers)

                                    nextPlayer(updatedPlayers)
                                }}>
                                    <X size={40} />
                                </WrongButton>
                            </CorrectAnswerButtons>
                        </CorrectAnswerContent>
                    </CorrectAnswerInner>
                </CorrectAnswer>
                <Board>
                    <Container>
                        <Question>{currentQuestion.question}</Question>
                        <Answers>
                            {currentQuestion.answers.map(({ answer, alternative, alternativeUrl }, index) => (
                                <Answer key={`game:${answer}:${alternative ?? alternativeUrl}`}>
                                    {alternative && (
                                        <Alternative>{alternative}</Alternative>
                                    )}
                                    {alternativeUrl && (
                                        <Alternative>
                                            <img src={alternativeUrl} />
                                        </Alternative>
                                    )}
                                    <Plupp
                                        {...((!!takenCorrectAnswers.includes(index) || !!takenWrongAnswers.includes(index)) ? {
                                            className: takenCorrectAnswers.includes(index) ? 'correct' : 'wrong',
                                            disabled: true
                                        } : null)}
                                        onClick={() => {
                                            setCorrectAnswer({
                                                alternative,
                                                answer,
                                                index
                                            })
                                        }}>
                                        {(!!takenCorrectAnswers.includes(index) && (
                                            <Check size={32} />
                                        ))}
                                        {(!!takenWrongAnswers.includes(index) && (
                                            <X size={32} />
                                        ))}
                                    </Plupp>
                                </Answer>
                            ))}
                        </Answers>
                    </Container>
                </Board>
                <Scores
                    players={players}
                    setPlayers={setPlayers}
                    currentPlayer={currentPlayer}
                    nextPlayer={nextPlayer} />
            </Wrapper>
        </div>
    )
}

const colorToNameMap = {
    black: 'svart',
    blue: 'blå',
    green: 'grön',
    orange: 'orange',
    purple: 'lila',
    red: 'röd',
    yellow: 'gul',
    white: 'vit'
}

const typeToColorMap = {
    regular: '#066ae5',
    rank: '#ae36d0',
    boolean: '#b36900',
    color: '#e2cb04',
    number: 'green',
    period: 'purple'
}

export const getServerSideProps = async ({ query }) => {
    return {
        props: {
            id: query.id
        }
    }
}

export default Game
