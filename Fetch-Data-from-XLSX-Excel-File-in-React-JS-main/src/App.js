import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import CircularProgress from "@mui/material/CircularProgress";
import Chart from "react-apexcharts";
import "./App.css";

const directions = [
  "Prishtinë (Ambasada Amerikane)-Mitrovicë",
  "Prishtinë (Te Ismeti)-Mitrovicë",
  "Prishtinë-Fushë Kosovë",
  "Prishtinë-Gjergj Balsha",
  "Mitrovicë-Lekë Matranga",
  "Prishtinë-Obiliq (Mitrovicë)",
  "Prishtinë-Obiliq",
  "Prishtinë (Bast Trade)-Mitrovicë",
  "Prishtinë (Mitrovicë)-Obiliq",
  "Prishtinë-Autostrada Ibrahim Rugova",
  "Prishtinë (Gazimestan)-Mitrovicë",
  "Prishtinë (Millosheve)-Mitrovicë",
  "Obiliq-Podujeve",
  "Podujevë-Obiliq-2",
  "Prishtinë-Obliliq(Tyrbe)",
  "Kosova C-Obiliq",
  "QKUK-Qender",
  "Prishtinë-Graqanice",
  "Prishtinë-Gjilan",
  "EULEX-Qender",
  "A.A.Kelmendi-Rrethrrotullim (Rruga B)-2",
  "Gazmend Zajmi-Rrethrrotullim (Bregu i diellit)",
  "Tahir Zajmi (Kalabria)-M9",
  "Dardania-Bill Clinton",
  "Tirana (LAKRISHTE)-Bill Clinton",
  "Robert Dol (PEJTON)-Bill Clinton",
  "Ilaz Kodra-Bill Clinton",
  "28 Nëntori-Dëshmorët e kombit",
  "Imzot Nikprela-Dëshmorët e Kombit",
  "Fehmi Lladrovci-Rrethrrotullim (QKUK)",
  "Muharrem Fejza-Rrethrrotullim (QKUK)",
  "Muharrem Fejza-QKUK",
  "Rruga B-Rrethrrotullim (Muharrem Fejza)",
  "Rrethrrotullim (Muharrem Fejza)-QKUK",
  "Rruga B-Bregu i diellit",
  "Enver Maloku (AKTASH)-Rruga B-2",
  "Shfmu Iliria-Rrethrrotullim (Rruga B)",
  "Matiqan-Lagje e Spitalit",
  "Muharrem Fejza-Lagja e Spitalit",
  "Matiqan-Bregu i diellit",
  "Velania-Matiqan",
  "Shfmu Mitrush Kuteli-Xhamia e Matit",
  "Zllatar-Matiqan",
  "Prishtina-Bardhosh",
  "Podujeva-Prishtina (Vellezerit Fazliu)",
  "Qender-Podujevë",
  "Ilir Konushevci-Agim Ramadani",
  "Ilir Konushevci-Agim Ramadani-2",
  "PTK-Rrethrrotullim (Flamuri)",
  "Rrethrrotullim (Flamuri)-Fehmi Lladrovci",
  "Rrethrrotullim (Flamuri)-American Hospital",
  "Aloka Hospital-Çaglavica",
  "Prishtina-Ferizaj",
  "Hotel Victory-Stacioni i Autobuseve",
  "Katedralja Nënë Tereza-Bill Clinton",
  "Rrethrrotullim (Stacioni i Autobuseve)-Qender (Prishtinë)",
  "Prishtina (M9)-Fushë Kosovë",
  "Rruga Nënë Tereza-Fushë Kosovë",
  "Rruga Nënë Tereza-Rrethrrotullim (Fushë Kosovë)",
  "Rrethrrotullim (Fushë Kosovë)-Stacioni i Trenit (Fushë Kosovë)",
  "Rruga Nënë Tereza-Rruga e Pejës",
  "Fushë Kosovë-Vragoli",
  "Miradi e Eperme-M9",
  "Fushë Kosovë-Uglarë",
  "Fontana-Agim Ramadani",
  "Rrethrrotullim (QKUK)-Barnatore",
  "Prelluzhe-Plemetin",
  "Dogana-Rrethrrotullim (Stacioni i Autobuseve)",
  "Rrethrrotullim (Rruga Tirana)-Hekurudha",
  "Stacioni i Trenit (Prishtinë)-Rrethrrotullim (Rruga Tirana)",
  "Rr. E Zagrebit-Xhamia e Llapit",
  "Rrethrrotullim (Rr. Ahmet Krasniqi)-Komuna e re",
  "Rrethrrotullim (Rr. Ahmet Krasniqi)-Komuna e Re-2",
  "Rrethrrotullim (Komuna e Re)-Komuna e Re",
  "Komuna e Re-Rrethrrotullim (Te Ismeti)",
  "UCK-Tirana",
  "L Prizrenit-Agim Ramadani",
  "Rr. Zagrebit-Xhami e Llapit",
  "Agim Ramadani-Ibrahim Lutfiu",
  "Xhamia e Llapit-Llukar",
  "Gjimnazi-Haxhi Zeka",
  "Prishtinë-Llukar",
  "Qytet-Germi",
  "Shefqet Shkupi-M2",
  "Shefqet Shkupi-M2-2",
  "Rrethrrotullim (Hotel Garden)-Stacioni i Autobuseve",
  "Fak Bujqesise-Rrethrrotullim (Hotel Garden)",
  "Shefqet Shkupi-Rrethrrotullim (Hotel Garden)",
];
const cities = [
  "Prishtinë (Ambasada Amerikane)",
  "Mitrovicë",
  "Lekë Matranga",
  "Prishtinë (Te Ismeti)",
  "Prishtinë",
  "Fushë Kosovë",
  "Gjergj Balsha",
  "Obiliq (Mitrovicë)",
  "Obiliq",
  "Prishtinë (Bast Trade)",
  "Prishtinë (Mitrovicë)",
  "Autostrada Ibrahim Rugova",
  "Prishtinë (Gazimestan)",
  "Prishtinë (Millosheve)",
  "Obiliq-Podujeve",
  "Podujeve",
  "Obiliq-2",
  "Obliliq(Tyrbe)",
  "Kosova C-Obiliq",
  "Kosova C",
  "QKUK-Qender",
  "QKUK",
  "Qender",
  "EULEX-Qender",
  "Graqanice",
  "Gjilan",
  "EULEX",
  "A.A.Kelmendi",
  "Rrethrrotullim (Rruga B)",
  "Gazmend Zajmi",
  "Rrethrrotullim (Bregu i diellit)",
  "Tahir Zajmi (Kalabria)",
  "M9",
  "Dardania",
  "Bill Clinton",
  "Tirana (LAKRISHTE)",
  "Bill Clinton",
  "Robert Dol (PEJTON)",
  "Bill Clinton",
  "Ilaz Kodra",
  "28 Nëntori",
  "Dëshmorët e kombit",
  "Imzot Nikprela",
  "Fehmi Lladrovci",
  "Rrethrrotullim (QKUK)",
  "Muharrem Fejza",
  "Rruga B",
  "Rrethrrotullim (Muharrem Fejza)",
  "Bregu i diellit",
  "Enver Maloku (AKTASH)",
  "Shfmu Iliria",
  "Matiqan",
  "Lagje e Spitalit",
  "Velania",
  "Shfmu Mitrush Kuteli",
  "Xhamia e Matit",
  "Zllatar",
  "Bardhosh",
  "Podujeva",
  "Prishtina (Vellezerit Fazliu)",
  "Ilir Konushevci",
  "Agim Ramadani",
  "Ilir Konushefci",
  "PTK",
  "Rrethrrotullim (Flamuri)",
  "American Hospital",
  "Çaglavica",
  "Aloka Hospital",
  "Prishtina (Lagjia Marigona)",
  "Ferizaj",
  "Hotel Victory",
  "Stacioni i Autobuseve",
  "Katedralja Nënë Tereza",
  "Podujevë",
  "Qender (Prishtinë)",
  "Prishtina (M9)",
  "Rruga Nënë Tereza",
  "Fushë Kosovë",
  "Rrethrrotullim (Fushë Kosovë)",
  "Stacioni i Trenit (Fushë Kosovë)",
  "Rruga e Pejës",
  "Vragoli",
  "Miradi e Eperme",
  "Uglarë",
  "Fontana",
  "Barnatore",
  "Prelluzhe",
  "Plemetin",
  "Dogana",
  "Rrethrrotullim (Stacioni i Autobuseve)",
  "Rrethrrotullim (Rruga Tirana)",
  "Hekurudha",
  "Stacioni i Trenit (Prishtinë)",
  "Rr. E Zagrebit",
  "Xhamia e Llapit",
  "Rrethrrotullim (Rr. Ahmet Krasniqi)",
  "Komuna e re",
  "Komuna e Re",
  "Rrethrrotullim (Komuna e Re)",
  "Rrethrrotullim (Te Ismeti)",
  "UCK",
  "Tirana",
  "Komuna e Vjeter",
  "L Prizrenit",
  "Xhami e Llapit",
  "Rr. Zagrebit",
  "Rrethi",
  "Ibrahim Lutfiu",
  "Llukar",
  "Gjimnazi",
  "Haxhi Zeka",
  "Qytet",
  "Germi",
  "Shefqet  Shkupi",
  "M2",
  "Rrethrrotullim (Hotel Garden)",
  "Stacioni i Autobuseve",
  "Fak Bujqesise",
];
const carTypes = [
  "car_a1",
  "lgv_a2",
  "hgv_a3",
  "articulity trucs_a4",
  "bus_a5",
  "tractor_a6",
  "bicycle_a7",
];

const quarters = Array.from({ length: 48 }, (_, index) => {
  const startHour = 6;
  const hour = startHour + Math.floor(index / 4);
  const minute = (index % 4) * 15;

  const formattedTime = `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;

  return `${index + 1} (${formattedTime})`;
});

const SelectCity = ({ name, value, onChange }) => (
  <select name={name} value={value} onChange={onChange}>
    <option value="">Select Destination</option>
    {cities.map((city, index) => (
      <option key={index} value={city}>
        {city}
      </option>
    ))}
  </select>
);
const SelectDirection = ({ name, value, onChange }) => (
  <select name={name} value={value} onChange={onChange}>
    <option value="">Select Destination</option>
    {directions.map((city, index) => (
      <option key={index} value={city}>
        {city}
      </option>
    ))}
  </select>
);
const SelectQuarter = ({ name, value, onChange }) => (
  <select name={name} value={value} onChange={onChange}>
    <option value="">Select Quarter</option>
    {quarters.map((city, index) => (
      <option key={index} value={city}>
        {city}
      </option>
    ))}
  </select>
);

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [greenLightClicked, setGreenLightClicked] = useState(false);
  const [selectedCar, setSelectedCar] = useState("car_a1");
  const handleChange = (event) => {
    setSelectedCar(event.target.value);
  };

  const [quarterChartData, setQuarterChartData] = useState({
    categories: [],
    series: [],
  });
  const [carTypeChartData, setCarTypeChartData] = useState({
    categories: [],
    series: [],
  });
  const [filters, setFilters] = useState({
    start_destination: "",
    end_destination: "",
    quarter_of_day: "",
    Main_Direction: "",
  });

  useEffect(() => {
    if (data.length > 0) {
      const filteredData = data.filter((row) => {
        const isStartDestinationMatch =
          filters.start_destination === "" ||
          row.start_destination.startsWith(filters.start_destination);

        const isEndDestinationMatch =
          filters.end_destination === "" ||
          row.end_destination.startsWith(filters.end_destination);

        const isMainDirection =
          filters.Main_Direction === "" ||
          row.Main_Direction.startsWith(filters.Main_Direction);

        const isQuarterOfDayMatch =
          filters.quarter_of_day === "" ||
          row.quarter_of_day === parseInt(filters.quarter_of_day, 10);

        const isCarTypeMatch = row[selectedCar] > 0;

        return (
          isStartDestinationMatch &&
          isEndDestinationMatch &&
          isQuarterOfDayMatch &&
          isMainDirection &&
          isCarTypeMatch
        );
      });

      const quarterCounts = filteredData.reduce((acc, row) => {
        const key = row.quarter_of_day;
        acc[key] = (acc[key] || 0) + row[selectedCar];
        return acc;
      }, {});

      const quarterCategories = Object.keys(quarterCounts);
      const quarterSeries = quarterCategories.map(
        (category) => quarterCounts[category]
      );

      setQuarterChartData({
        categories: quarterCategories,
        series: [
          {
            name: `Number of ${selectedCar}`,
            data: quarterSeries,
          },
        ],
      });
      const carTypeCounts = carTypes.map((carType) =>
        filteredData.reduce((acc, row) => acc + (row[carType] || 0), 0)
      );

      setCarTypeChartData({
        categories: carTypes,
        series: [
          {
            name: "Number of Cars",
            data: carTypeCounts,
          },
        ],
      });
    }
  }, [data, filters, selectedCar]);

  const colors = ["#A52A2A", "#FFF8DC", "#FFB6C1", "#FFFF00"];

  const quarterChartOptions = {
    chart: {
      height: 450,
      type: "bar",
    },
    dataLabels: {
      enabled: false,
    },
    colors: colors,
    xaxis: {
      type: "category",
      categories: quarters.map((quarter, index) => {
        const formattedTime = quarter.split(" ")[1]; 
        return `${formattedTime}`;
      }) ,
      title: {
        text: "Quarters",
      },
    },
    yaxis: {
      title: {
        text: `Number of ${selectedCar}`,
      },
    },
    title: {
      text: "Visualization of changing vehicle counts or types for each quarter",
    },
    grid: {
      padding: {
        right: 20,
      },
    },
  };

  const carTypeChartOptions = {
    chart: {
      height: 450,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: "rgb(34,193,195)",

    xaxis: {
      type: "category",
      categories: carTypeChartData.categories,
      title: {
        text: "Vehicle",
      },
    },
    yaxis: {
      title: {
        text: "Total vehicle",
      },
    },
    title: {
      text: "Visualisation of all vehicle types at a specific location for a given quarter ",
    },
    grid: {
      padding: {
        right: 20,
      },
    },
  };
  const handleRedLightClick = () => {
    window.location.reload();
  };

  const convertFractionToTime = (fraction) => {
    const hours = Math.floor(fraction * 24);
    const minutes = Math.round((fraction * 24 - hours) * 60);

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  };
  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.onloadstart = () => {
      setLoading(true);
    };
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      setData(parsedData);
      setLoading(false);
      setGreenLightClicked(true);
    };
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredData = data.filter((row) => {
    const isStartDestinationMatch =
      filters.start_destination === "" ||
      row.start_destination.startsWith(filters.start_destination);

    const isEndDestinationMatch =
      filters.end_destination === "" ||
      row.end_destination.startsWith(filters.end_destination);
    const isQuarterOfDayMatch =
      filters.quarter_of_day === "" ||
      row.quarter_of_day === parseInt(filters.quarter_of_day, 10);
    const isMainDirection =
      filters.Main_Direction === "" ||
      row.Main_Direction.startsWith(filters.Main_Direction);
    const isCarTypeMatch = row[selectedCar] > 0;

    return (
      isStartDestinationMatch &&
      isEndDestinationMatch &&
      isQuarterOfDayMatch &&
      isMainDirection &&
      isCarTypeMatch
    );
  });

  const handleYellowLightClick = () => {
    const chartContainer = document.getElementById("chartContainer");

    if (chartContainer) {
      window.scrollTo({
        top: chartContainer.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="App">
      <div className="traffic-light-file-input">
        <div className="light red" onClick={handleRedLightClick}>
          <span className="tooltiptext">Remove chosen file</span>
        </div>
        <div className="light yellow" onClick={handleYellowLightClick}>
          <span className="tooltiptext" onClick={handleYellowLightClick}>
            See aggregated data
          </span>
        </div>
        <label className="light green">
          <input
            type="file"
            accept=".xlsx, .xls"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <label htmlFor="fileInput" className="file-label">
            <span className="tooltiptext">Upload File</span>
          </label>
        </label>
      </div>
      {!greenLightClicked ? (
        <p className="marquee">
          <span>
            To start using this platform, click the green light of traffic
            light&nbsp;
          </span>
        </p>
      ) : null}

      <div className="brown"></div>
      <div className="filter-data">
        {data.length > 0 && (
          <div className="filter-data-display">
            <div className="">
              <label className="filter-option">
                Destination:{" "}
                <SelectDirection
                  name="Main_Direction"
                  value={filters.Main_Direction}
                  onChange={handleFilterChange}
                />
              </label>
            </div>
            <div className="filters-part1">
              {" "}
              <label className="filter-option">
                Start Destination:
                <SelectCity
                  name="start_destination"
                  value={filters.start_destination}
                  onChange={handleFilterChange}
                />
              </label>
              <label className="filter-option">
                End Destination:
                <SelectCity
                  name="end_destination"
                  value={filters.end_destination}
                  onChange={handleFilterChange}
                />
              </label>
            </div>
            <div className="filters-part1">
              {" "}
              <label className="filter-option">
                Quarter:{" "}
                <SelectQuarter
                  name="quarter_of_day"
                  value={filters.quarter_of_day}
                  onChange={handleFilterChange}
                />
              </label>
              <label className="filter-option">
                Cars:{" "}
                <select
                  className="filter-option"
                  id="carTypeDropdown"
                  onChange={handleChange}
                  value={selectedCar}
                >
                  <option value="">Select Cars</option>
                  {carTypes.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        )}
      </div>

      {loading && <CircularProgress color="success" style={{ height: 100 }} />}

      {data.length > 0 && (
        <div className="traffic-display">
          {filteredData.length > 0 && (
            <div className="traffic-display">
              <div className="traffic-table-container">
                <table className="traffic-table">
                  <thead>
                    <tr>
                      {Object.keys(filteredData[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {filteredData.map((row, index) => (
                      <tr key={index}>
                        {Object.entries(row).map(([key, value]) => (
                          <td key={key}>
                            {key === "start_quarter" || key === "end_quarter"
                              ? convertFractionToTime(value)
                              : value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div id="chartContainer">
            {filteredData.length > 0 && (
              <Chart
                options={quarterChartOptions}
                series={quarterChartData.series}
                type="bar"
                height={300}
                style={{ padding: 20 }}
              />
            )}
          </div>
          <div id="carTypeChartContainer">
            {filteredData.length > 0 &&
              carTypeChartData.categories.length > 0 && (
                <Chart
                  options={carTypeChartOptions}
                  series={carTypeChartData.series}
                  type="bar"
                  height={300}
                  style={{ padding: 20 }}
                />
              )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
