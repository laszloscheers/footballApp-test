import React from 'react';
import Team from '../Team/Team';



const League = ({ competition, leagueTable }) => {


    
    return (
        <div className='league'>
            <div className="info">
                <h3>{competition.name}</h3>
                <h2>{competition.area.name}</h2>
            </div>
            
            <div className="clubs">
                <h3>List of Clubs:</h3>
                {leagueTable.map((team, index) => <Team team={team} key={index} />)}
            </div>
        </div>
    );
};



export default League;