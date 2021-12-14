import { useState, useEffect, useRef } from 'react'
// import { database } from '../firebase.config'
import { ref, push, child, update } from 'firebase/database'
import database from '/firebase.config'
// import { collection, getDocs, addDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Head from 'next/head'
import logo from '../public/logo.png'
import {
    Background,
    Logo,
    Select, Players, Player,
    SubmitButton
} from './s'
import smart10 from '/smart10.json'
import { Star, Circle, Triangle, Square } from 'styled-icons/feather'

const Home = () => {
    // const [questions, setQuestions] = useState(smart10)
    let inputRefs = useRef([useRef(), useRef(), useRef(), useRef()])

    const [playerCount, setPlayerCount] = useState(4)
    const [playerNames, setPlayerNames] = useState({
        0: {
            name: '',
            symbol: 'star'
        },
        1: {
            name: '',
            symbol: 'circle'
        },
        2: {
            name: '',
            symbol: 'triangle'
        },
        3: {
            name: '',
            symbol: 'square'
        }
    })

    const router = useRouter()
    // const questionsCollectionRef = collection(database, 'questions')

    // useEffect(() => {
    //   const getQuestions = async () => {
    //     const data = await getDocs(questionsCollectionRef)

    //     setQuestions(data.docs.map(doc => ({
    //       ...doc.data(),
    //       id: doc.id
    //     })))
    //   }

    //   getQuestions()
    // }, [questionsCollectionRef])

    // const addQuestions = async () => {
    //   console.log('Start')

    //   const promises = smart10.map(async question => {
    //     const newQuestion = await addDoc(questionsCollectionRef, question)
    //     return newQuestion
    //   })

    //   const newQuestions = await Promise.all(promises)
    //   console.log(newQuestions)
    //   console.log('End')
    // }

    const startGame = e => {
        e.preventDefault()

        const gameData = {
            players: Object.values(playerNames)
                .filter(({ name }) => !!name)
                .map(({ name, symbol }) => ({
                    name,
                    symbol,
                    score: 0,
                    totalScore: 0,
                    canGuess: true,
                    isOut: false,

                })),
            playerTurn: 0,
            currentPlayer: 0,
            currentQuestion: smart10[Math.floor(Math.random() * smart10.length)]
        }

        const newGameKey = push(child(ref(database), 'games')).key

        const updates = {}
        updates[`/games/${newGameKey}`] = gameData

        update(ref(database), updates)

        router.push(`/game/${newGameKey}`)
    }

    return (
        <div>
            <Head>
                <title>Smart10</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Background>
                <Logo>
                    <Image
                        src={logo}
                        alt="Smart10" />
                </Logo>
                <form onSubmit={startGame}>
                    <Players>
                        {Array.from(Array(playerCount).keys()).map((player, index) => {
                            const Symbol = indexToSymbolMap[player]

                            return (
                                <Player key={player}>
                                    <div onClick={() => inputRefs.current[index]?.current?.focus()}>
                                        <Symbol size={16} />
                                    </div>
                                    <input
                                        ref={inputRefs.current[index]}
                                        type="text"
                                        onChange={({ target: { value }}) => setPlayerNames({
                                            ...playerNames,
                                            [player]: {
                                                ...playerNames[index],
                                                name: value
                                            }
                                        })} />
                                </Player>
                            )
                        })}
                        <SubmitButton
                            type="submit"
                            disabled={Object.values(playerNames).filter(({ name }) => !!name)?.length < 2}>
                            Starta
                        </SubmitButton>
                    </Players>
                </form>
            </Background>
        </div>
    )
}

export const indexToSymbolMap = {
    0: Star,
    1: Circle,
    2: Triangle,
    3: Square
}

export default Home