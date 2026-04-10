export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.github.com/repos/Flowseal/zapret-discord-youtube/releases/latest",
      {
        headers: {
          "User-Agent": "Mozilla/5.0"
        }
      }
    );

    const data = await response.json();

    const asset = data.assets.find(a => a.name.endsWith(".zip"));

    if (!asset) {
      return res.status(404).send("ZIP not found");
    }

    return res.redirect(302, asset.browser_download_url);

  } catch (e) {
    return res.status(500).send("Error: " + e.message);
  }
}