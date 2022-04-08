import React, { useState } from 'react';
import axios from 'axios';

import './home.css';
import { footballApi } from '../../apiKeys';
import Navbar from '../../components/Navbar/Navbar';
import League from '../../components/League/League';




const Home = () => {

    const [todaysMatches, setTodaysMatches] = useState([]);
    const [competition, setCompetition] = useState({});
    const [leagueTable, setLeagueTable] = useState([]);
   

    // Method for fetching today's matches for subscribed competitions
    const fetchTodaysMatches = async () => {
        const data = await axios.get(footballApi.link + "matches", 
            { headers: { "X-Auth-Token": footballApi.token } });
        console.log(data.data);
        setTodaysMatches(data.data.matches);
    };


    // Method for fetching league info and table - must enter league ID eg. Prem = PL
    const fetchLeagueTable = async (leagueId) => {
        const data = await axios.get(footballApi.link + "competitions/" + leagueId + "/standings", 
            { headers: { "X-Auth-Token": footballApi.token } });
        setCompetition(data.data.competition);
        setLeagueTable(data.data.standings[0].table);
    };


    return (
        <div className='home'>
            <Navbar fetchLeagueTable={fetchLeagueTable} />

            {(leagueTable.length !== 0) && <League competition={competition} leagueTable={leagueTable} />}
        </div>
    );
};



export default Home;