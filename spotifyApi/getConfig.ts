export const getConfig = (accessToken: string) => ({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
