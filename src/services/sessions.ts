"use server";

import { revalidateTag } from "next/cache";
import { RevalidateTags } from "@/lib";
import { EndedSession, ParkingSessionsResponse } from "@/types";

import { fetchApi } from "./fetchApi";
import { getAccessToken } from "@/lib/utils";

export const getParkingSessions = async (
  query?: string
): Promise<ParkingSessionsResponse> => {
  try {
    const token = await getAccessToken();
    const response = await fetchApi(`/parking/sessions/list?${query}`, {
      next: { tags: [RevalidateTags.SESSIONS] },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data as ParkingSessionsResponse;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const endParkingSession = async (id: string): Promise<EndedSession> => {
  try {
    const token = await getAccessToken();
    const response = await fetchApi("/parking/session/end", {
      method: "POST",
      body: JSON.stringify({ parkingSession: { id } }),
      headers: { Authorization: `Bearer ${token}` },
    });
    revalidateTag(RevalidateTags.SESSIONS);

    return response.data.endedSession as EndedSession;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
