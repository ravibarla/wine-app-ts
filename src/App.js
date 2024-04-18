//please use your path directory for the wine-data

// import wineData from "/home/ravi/Downloads/ninja/Test-new/yarn-app/wine-app/src/Wine-Data.json";
import wineData from "./Wine-Data.json"
import React, { useState } from "react";
import Table1 from "./components/table1";
import { createTheme, MantineProvider } from "@mantine/core";
import Table2 from "./components/table2";
function App() {
  //group the data according to class:Alcohol
  const groupedData = wineData.reduce((acc, obj) => {
    const key = obj.Alcohol;
    if (!acc[key]) {
      acc[key] = []; // Initialize an empty array for the category if it doesn't exist
    }
    acc[key].push(obj); // Push the object into the array corresponding to its category
    return acc;
  }, []);

  //calculate mean for the Flavanoids
  const calculateMean = (data) => {
    let sum = 0;
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        sum += parseFloat(data[key].Flavanoids);
      }
    }
    let res = sum / Object.keys(data).length;
    return parseFloat(res).toFixed(3);
  };

  //calculate gamma mean
  const gammaMeanArr = [];
  const calculateGammaMean = (data) => {
    data.map((data) => {
      let sum = 0;
      let count = 0;
      data.map((item) => {
        let gamma = (item["Ash"] * item["Hue"]) / item["Magnesium"];
        sum += gamma;
        count++;
      });
      const tmp = parseFloat(sum / count).toFixed(3);
      gammaMeanArr.push(tmp);
    });
  };

  calculateGammaMean(groupedData);

  //calculate Flavanoids Mean
  const calculateMedian = (data) => {
    const sortedData = data
      .map((item) => parseFloat(item.Flavanoids))
      .sort((a, b) => a - b);
    const middle = Math.floor(sortedData.length / 2);
    if (sortedData.length % 2 === 0) {
      let res = (sortedData[middle - 1] + sortedData[middle]) / 2;
      return parseFloat(res).toFixed(3);
    } else {
      let res = sortedData[middle];
      return parseFloat(res).toFixed(3);
    }
  };

  //calculate gamma median
  const gammaMedianStats = [];
  let gammaList = [];

  const calculateGammaMedian = (groupedData) => {
    groupedData.map((data, i) => {
      const arr = data.map((item) => (item.Ash * item.Hue) / item.Magnesium);
      gammaList[i - 1] = arr.sort((a, b) => parseFloat(a) - parseFloat(b));

      const middle = Math.floor(arr.length / 2);
      const median = parseFloat(arr[middle] + arr[middle - 1] / 2).toFixed(3);
      gammaMedianStats.push(median);
    });
  };
  calculateGammaMedian(groupedData);

  //calculate Flavanoids Mode
  const calculateMode = (data) => {
    const counts = {};
    data.forEach((item) => {
      const flavanoids = parseFloat(item.Flavanoids);
      counts[flavanoids] = (counts[flavanoids] || 0) + 1;
    });

    let mode;
    let maxCount = 0;
    for (const flavanoids in counts) {
      if (counts[flavanoids] > maxCount) {
        mode = parseFloat(flavanoids);
        maxCount = counts[flavanoids];
      }
    }

    return parseFloat(mode).toFixed(3);
  };

  //calculate gamma mode
  const gammaModeList = [];
  const calculateGammaMode = () => {
    const tmp = gammaList.map((input, i) => {
      let mode = {};

      // Variable to store the frequency of the current mode
      let maxCount = 0;

      // Array to store the modes
      let modes = [];

      // Iterate through each element of the input array
      input.forEach(function (e) {
        if (mode[e] == null) {
          mode[e] = 1;
        } else {
          mode[e]++;
        }
        if (mode[e] > maxCount) {
          // Update the current mode and its frequency
          modes = [e];
          maxCount = mode[e];
        } else if (mode[e] === maxCount) {
          modes.push(e);
        }
      });
      return parseFloat(modes[0]).toFixed(3);
    });
    gammaModeList.push(tmp);
  };
  calculateGammaMode();

  //storing stats measure for Flavanoids
  const stats = [];
  const keys = Object.keys(groupedData);
  for (let i = 0; i < keys.length; i++) {
    const data = {
      id: `class ${keys[i]}`,
      mean: calculateMean(groupedData[keys[i]]),
      median: calculateMedian(groupedData[keys[i]]),
      mode: calculateMode(groupedData[keys[i]]),
    };
    stats.push(data);
  }

  //storing stats measure for gamma
  const gammaStats = [];
  for (let i = 0; i < keys.length; i++) {
    const data1 = {
      id: `class ${keys[i]}`,
      mean: `${gammaMeanArr[i]}`,
      median: `${gammaMedianStats[i]}`,
      mode: `${gammaModeList[0][i]}`,
    };
    gammaStats.push(data1);
  }
  return (
    <div className="App">
      <MantineProvider>
        {/* table for Flavanoids stats */}
        <Table1 stats={stats} />
        <br />
        {/* table for Gamma stats */}
        <Table2 gammaStats={gammaStats} />
      </MantineProvider>
    </div>
  );
}

export default App;
