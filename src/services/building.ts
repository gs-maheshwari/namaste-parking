"use server";

import { getAccessToken } from "@/lib/utils";
import { ParkingSpace } from "@/types";

import { fetchApi } from "./fetchApi";
import { RevalidateTags } from "@/lib";

export const getParkingSpaces = async (): Promise<ParkingSpace[]> => {
  try {
    const token = await getAccessToken();
    const response = await fetchApi("/parking/spaces/list", {
      next: { tags: [RevalidateTags.SPACES] },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.parkingSpaces as ParkingSpace[];
  } catch (err) {
    console.error(err);
    throw err;
  }
};
