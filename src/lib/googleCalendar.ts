// utils/googleCalendar.ts
import { google, type calendar_v3 } from "googleapis";

export async function listCalendarEvents(
  accessToken: string,
): Promise<calendar_v3.Schema$Event[] | undefined> {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  try {
    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });
    return response.data.items;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching calendar events", error.message);
    } else {
      console.error("Unknown error fetching calendar events", error);
    }
    throw error;
  }
}

// export async function listCalendarEvents(accessToken: string) {
//   const oauth2Client = new google.auth.OAuth2();
//   oauth2Client.setCredentials({ access_token: accessToken });

//   const calendar = google.calendar({ version: "v3", auth: oauth2Client });

//   try {
//     const response = await calendar.events.list({
//       calendarId: "primary",
//       timeMin: new Date().toISOString(),
//       singleEvents: true,
//       orderBy: "startTime",
//     });
//     return response.data.items;
//   } catch (error) {
//     console.error("Error fetching calendar events", error);
//     throw error;
//   }
// }
