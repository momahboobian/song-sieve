export default async function handler(req: any, res: any) {
  // if (req.method !== "POST") {
  //   return res.status(405).end();
  // }

  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  console.log("Refresh Token (before fetch):", refresh_token);
  console.log("Client ID (before fetch):", client_id);
  console.log("Client Secret (before fetch):", client_secret);

  if (!refresh_token || !client_id || !client_secret) {
    console.error("Missing environment variables for token refresh.");
    return res.status(500).json({ error: "Missing environment variables" });
  }

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${client_id}:${client_secret}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Spotify API error during token refresh:", errorData); // Enhanced logging
      return res.status(response.status).json({ error: errorData });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error refreshing token:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
