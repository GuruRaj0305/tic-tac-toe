export default function GameOver({winner, onRestart}) {
    return <div id = "game-over">
        <h2>GAme Over!</h2>
        {winner && <p>{winner} won!</p>}
        {!winner && <p>It's draw</p>}
        <p><button onClick = {onRestart}>REMATCH!</button></p>
    </div>
}