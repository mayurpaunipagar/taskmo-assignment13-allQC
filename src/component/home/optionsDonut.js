const optionsDonut = {
    series: [ 41, 17, 15],
    colors:["#f8b465","#f44771","#9E64EC"],
    labels:["QC Passed", "QC Redo", "QC Rejected"],
    chart: {
      type: "donut",
    },
    legend: {
        show:true,
      position: "right",
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };
  export {optionsDonut};