export const checkTokenTime = async (): Promise<boolean> => {
  const storedTime = localStorage.getItem("token_timestamp");
  if (storedTime) {
    const currentTime = Date.now();
    const elapsedTime = currentTime - parseInt(storedTime, 10);
    const tokenExpiresIn = 3600 * 1000;

    if (elapsedTime > tokenExpiresIn) {
      try {
        const response = await fetch("/api/refresh-token", { method: "POST" });
        if (!response.ok) {
          throw new Error("Failed to refresh token");
        }
        const data = await response.json();
        const accessToken = data.access_token;
        const newTime = Date.now();
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("token_timestamp", newTime.toString());
        return true; // Token refreshed successfully
      } catch (error) {
        console.error("Error refreshing token:", error);
        return false; // Token refresh failed
      }
    } else {
      return true; // Token is still valid
    }
  } else {
    try {
      const response = await fetch("/api/refresh-token", { method: "POST" });
      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }
      const data = await response.json();
      const accessToken = data.access_token;
      const newTime = Date.now();
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("token_timestamp", newTime.toString());
      return true; // Token refreshed successfully
    } catch (error) {
      console.error("Error refreshing token:", error);
      return false; // Token refresh failed
    }
  }
};
