const clientId = '126947';
const clientSecret = 'bff8b2ea088158c7c8e118ee8f3cfc32957724f6';
const refreshToken = '7145871b6d26bf3a64e9bcd09dde18a4597bf7b7';

const userId = 108607661; // 👈 Your strava user id, can be found by visiting your strava profile and checking the url
const TOKEN_ENDPOINT = "https://www.strava.com/oauth/token";
const ATHLETES_ENDPOINT = `https://www.strava.com/api/v3/athletes/${userId}`;

const getAccessToken = async () => {
  const body = JSON.stringify({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body,
  });

  return response.json();
};

export const getActivities = async () => {
  const { access_token: accessToken } = await getAccessToken();
  const response = await fetch(
    `${ATHLETES_ENDPOINT}/activities?access_token=${accessToken}`
  );
  const json = await response.json();

  const publicActivities = json.filter(
    (activity: ActivityType) => activity.visibility === "everyone"
  );

  return publicActivities;
};