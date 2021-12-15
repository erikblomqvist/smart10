import { compact } from '/utilities/array'
import {
    Wrapper,
    Player, PassButton
} from '/components/scores'
import { Star, Circle, Triangle, Square } from 'styled-icons/feather'

const Scores = ({ players = [], setPlayers, nextPlayer, currentPlayer }) => (
    <Wrapper>
        {players.map(({ name, symbol, score, totalScore, canGuess, isOut }, index) => {
            const Symbol = symbolMap[symbol]

            const className = compact([
                (index === currentPlayer) && 'active',
                !canGuess && 'disabled',
                isOut && 'out'
            ])

            return (
                <Player
                    className={className}
                    key={`${name}:${score}:${index}`}>
                    <Symbol size={16} />
                    <p>{`${name} ${score} (${totalScore})`}</p>
                </Player>
            )
        })}
        <PassButton onClick={() => {
            const updatedPlayers = [
                ...players.slice(0, currentPlayer),
                {
                    ...players[currentPlayer],
                    canGuess: false
                },
                ...players.slice(currentPlayer + 1, players.length)
            ]

            setPlayers(updatedPlayers)

            nextPlayer(updatedPlayers)
        }}>
            Pass
        </PassButton>
    </Wrapper>
)

const symbolMap = {
    star: Star,
    circle: Circle,
    triangle: Triangle,
    square: Square
}

export default Scores
