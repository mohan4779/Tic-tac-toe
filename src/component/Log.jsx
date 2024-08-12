export default function Log({turns}){
    return (
        <ol id="log">
        {turns.map((turn) => (
        <li key = {`${turn.squre.row}${turn.squre.col}`}>
            {turn.player} selected {turn.squre.row},{turn.squre.col}
        </li>
       ))}
    </ol>
    );
}