import { getSession } from "next-auth/react";

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { accessToken } = session;

  try {
    const calendarResponse = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!calendarResponse.ok) {
      return res
        .status(calendarResponse.status)
        .json({ error: "Failed to fetch events" });
    }

    const events = await calendarResponse.json();
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching events" });
  }
};
