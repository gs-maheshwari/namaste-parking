"use client"

import { useMemo, useCallback, useState } from "react"
import useSWR from "swr"
import type { ParkingSession, ParkingSessionsResponse } from "@/types"
import { endParkingSession, getParkingSessions } from "@/services"
import { VehicleType } from "@/lib"

import { Button, Table, TableFilter } from "../ui"
import { DateTime } from "./DateTime"
import Pagination from "../Pagination"

const Sessions = ({ sessionsData }: { sessionsData: ParkingSessionsResponse }) => {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [endingSessionIds, setEndingSessionIds] = useState<Record<string, boolean>>({})

  const { data, mutate } = useSWR<ParkingSessionsResponse>(
    [filters],
    ([filters]) => getParkingSessions(new URLSearchParams(
      Object.entries(filters)
    ).toString()),
    {
      fallbackData: sessionsData,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  const onEndSession = useCallback(
    async (sessionId: string) => {
      setEndingSessionIds((prev) => ({ ...prev, [sessionId]: true }));
      await endParkingSession(sessionId);
      mutate();
      setEndingSessionIds((prev) => ({ ...prev, [sessionId]: false }));
    },
    [mutate],
  )

  const columns = useMemo(
    () => [
      { key: "parkingSessionId", header: "ID" },
      { key: "parkingSpaceId", header: "Space ID" },
      {
        key: "status",
        header: "Status",
        render: (session: ParkingSession) => (session.isSessionEnded ? "Inactive" : "Active"),
      },
      {
        key: "sessionLengthInHoursMinutes",
        header: "Length",
        render: (session: ParkingSession) => `${convertToHoursMinutes(session.sessionLengthInHoursMinutes || 0)}`,
      },
      {
        key: "sessionStartedAt",
        header: "Start Time",
        render: (session: ParkingSession) => <DateTime isoDate={session.sessionStartedAt} />,
      },
      {
        key: "sessionEndedAt",
        header: "End Time",
        render: (session: ParkingSession) =>
          session.sessionEndedAt ? <DateTime isoDate={session.sessionEndedAt} /> : "N/A",
      },
      { key: "vehicleLicensePlate", header: "License Plate" },
      { key: "vehicleType", header: "Vehicle Type" },
      {
        key: "revenue",
        header: "Revenue",
        render: (session: ParkingSession) =>
          session.sessionEndedAt && session.parkingSpaceId !== 1
            ? `€ ${getRevenue(session.sessionLengthInHoursMinutes || 0, session.vehicleType)}`
            : "N/A",
      },
      {
        key: "actions",
        header: "Actions",
        render: (session: ParkingSession) =>
          !session.isSessionEnded && (
            <Button onClick={() => onEndSession(session.parkingSessionId)} disabled={endingSessionIds[session.parkingSessionId]} variant="primary">
              {endingSessionIds[session.parkingSessionId] ? "Ending..." : "End"}
            </Button>
          ),
      },
    ],
    [onEndSession, endingSessionIds],
  )

  const filterConfig = [
    {
      key: "vehicleType",
      type: "select" as const,
      label: "Vehicle Type",
      options: [
        { value: VehicleType.CAR, label: "CAR" },
        { value: VehicleType.MOTOR, label: "MOTOR" },
      ],
    },
    { key: "sessionStartedAtFrom", type: "date" as const, label: "Start Date" },
    { key: "sessionEndedAtTo", type: "date" as const, label: "End Date" },
    {
      key: "isSessionEnded",
      type: "select" as const,
      label: "Status",
      options: [
        { value: "false", label: "Active" },
        { value: "true", label: "Inactive" },
      ],
    },
  ]

  const onFilterChange = useCallback((newFilters: Record<string, string>) => {
    setFilters(newFilters)
  }, [])

  return (
    <>
      <TableFilter filters={filters} filterConfig={filterConfig} onFilterChange={onFilterChange} />
      {data?.parkingSessions && <Table data={data.parkingSessions} columns={columns} />}
      {data?.parkingSessionsTotalCount || 0 > 0 ? (
        <Pagination
          totalItems={data?.parkingSessionsTotalCount || 0}
          onPageChange={(newOffset, limit) =>
            setFilters((prev) => ({
              ...prev,
              offset: newOffset.toString(),
              limit: limit.toString(),
            }))
          }
        />
      ) : null}
    </>
  )
}

const convertToHoursMinutes = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours}h ${minutes}m`
}

const getRevenue = (totalMinutes: number, vehicleType: VehicleType) => {
  const hours = Math.ceil(totalMinutes / 60)
  const revenue = vehicleType === VehicleType.CAR ? hours * 5 : hours * 3
  return revenue
}

export default Sessions

