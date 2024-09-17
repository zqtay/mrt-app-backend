const SMRT_API_ROUTE = "https://connect.smrt.wwprojects.com/smrt/api";
const SMRT_API_ROUTE_V3 = "https://connectv3.smrt.wwprojects.com/smrt/api";
const SMRT_JOURNEY_URL = "http://journey.smrt.com.sg/";

export const getArrivalTimes = async (station: string) => {
  const res = await fetch(
    `${SMRT_API_ROUTE_V3}/train_arrival_time_by_id/?station=${station}`,
    {
      headers: {
        "Referer": SMRT_JOURNEY_URL
      }
    }
  );
  return res.json();
};

export const getAllStations = async () => {
  const res = await fetch(
    `${SMRT_API_ROUTE}/stations/`,
    {
      headers: {
        "Referer": SMRT_JOURNEY_URL
      }
    }
  );
  return res.json();
};

export const getStationInfo = async (station: string) => {
  const res = await fetch(
    `${SMRT_API_ROUTE}/station_info/?name=${station}`,
    {
      headers: {
        "Referer": SMRT_JOURNEY_URL
      }
    }
  );
  return res.json();
};