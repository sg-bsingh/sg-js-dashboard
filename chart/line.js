const line_chart = document.getElementById("lineChart");

const line_labels = ['Sep','Oct','Nov','Dec'];
const line_data = {
  labels: line_labels,
  datasets: [
    {
      label: "Test Dataset",
      data: [65, 59, 80, 55],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

const line_config = {
  type: "line",
  data: line_data,
};

lineChartobj = new Chart(line_chart, line_config);
