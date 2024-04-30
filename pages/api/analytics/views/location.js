import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { handle } = req.query;
    const endpoint =
      'https://api.tinybird.co/v0/pipes/analytics_events_pipe_8777.json';

    if (!handle || typeof handle !== 'string') {
      return res.status(404).end();
    }

    const analytics = await axios.get(
      `${endpoint}?token=${process.env.LOCATION_ANALYTICS_TOKEN}&handle=/${handle}`
    );

    return res.status(200).json(analytics.data.data);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
