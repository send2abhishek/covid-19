import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let changableUrl = url;
  if (country) {
    changableUrl = `${url}/countries/${country}`;
  }
  try {
    const { data } = await axios.get(changableUrl);

    const modifiedData = {
      confirmed: data.confirmed,
      deaths: data.deaths,
      recovered: data.recovered,
      lastUpdate: data.lastUpdate,
    };
    return modifiedData;
  } catch (error) {
    console.log("error is", error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    console.log("data daily from axios", data);

    const modifiedData = data.map((datilyData) => ({
      confirmed: datilyData.confirmed.total,
      deaths: datilyData.deaths.total,
      date: datilyData.reportDate,
    }));

    return modifiedData;
  } catch (error) {}
};

export const countries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    return countries.map((data) => data.name);
  } catch (error) {}
};
