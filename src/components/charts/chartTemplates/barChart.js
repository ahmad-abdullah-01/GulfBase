export default (categories = [], values = []) => ({
  chart: { type: 'column', backgroundColor: 'transparent' },
  title: { text: '' },
  credits: { enabled: false },

  xAxis: {
    categories,
    labels: { style: { color: '#fff' } },
    lineColor: 'transparent',
    tickColor: 'transparent',
    title: { text: null },
  },

  yAxis: {
    visible: true,
    title: { text: null },
    labels: {
      enabled: true,
      style: { color: '#fff' },
    },
    gridLineWidth: 1,
    gridLineColor: '#444',
    lineWidth: 0,
  },

  tooltip: {
    headerFormat: '<span style="font-size:13px">{point.name}</span><table>',
    pointFormat:
      '<tr><td style="padding:0">Value: </td>' +
      '<td style="padding:0"><b>{point.y}</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true,
  },

  plotOptions: {
    column: {
      colorByPoint: true,
      borderWidth: 1,
      borderRadius: 4,
      pointPadding: 0.1,
      groupPadding: 0.05,
    },
  },

  legend: { enabled: false },

  series: [
    {
      name: '',
      showInLegend: false,
      data: values.map((v, i) => ({
        name: categories[i] || `Item ${i + 1}`,
        y: v,
        x: i,
      })),
    },
  ],
});
