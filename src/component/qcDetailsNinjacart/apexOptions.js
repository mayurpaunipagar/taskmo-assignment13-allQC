const apexOptions = {
  series: [0],
  colors:["limegreen"],
  chart: {
    height: 350,
    type: "radialBar",
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: "60%",
      },
    },
  },
  labels: ["QC score"],
};

export { apexOptions };
