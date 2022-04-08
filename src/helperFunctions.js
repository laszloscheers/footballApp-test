
// Takes the name of a league and returns the search ID
export const findLeagueId = leagueName => {

    switch (leagueName.toLowerCase()) {
        case "premier league":
            return "PL";
        case "bundesliga":
            return "BL1";
        case "ligue 1":
            return "FL1";
        case "serie a":
            return "SA";
        case "la liga":
            return "PD";
        case "the championship":
            return "ELC";
        default:
            alert("League not found");
            return "PL";
    };
};