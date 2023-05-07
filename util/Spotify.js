const clientId="9c4652c46bd6487aa4a63b0cb56c3b12";
const redirectUri="http://localhost:3000";

let accessToken;


const Spotify={
    getAccessToken(){
        if (accessToken){
            return accessToken;
        }
        //check for an access token match
        const accessTokenMatch= 
        window.location.href.match(/access_token=([^&]*)/);
        //the above expression captures all teh characters in tthe access token
        const expiresInMatch=window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch){
            accessToken=accessTokenMatch[1];
            const expiresIn=Number(expiresInMatch)[1];
            /*This clears the parameters, allowing us to grab
            a new access token when it expires*/
            window.setTimeout(()=>accessToken=" ", expiresIn * 1000);
            window.history.pushState('Access token', null, '/');
            return accessToken;
        }
        else {
            const accessUrl=`https://accounts.spotify.com/authorize?client_id=
            CLIENT_ID${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=
            REDIRECT_URI=${redirectUri}`;
            window.location=accessUrl;
        }


    }
}

export default Spotify;
