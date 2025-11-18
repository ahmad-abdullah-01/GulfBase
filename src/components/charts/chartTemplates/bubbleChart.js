export default (data = []) => ({
  chart: {
    type: 'bubble',
    backgroundColor: 'transparent',
    plotBorderWidth: 1,
    zoomType: 'xy',
  },
  title: { text: 'Bubble Chart' },
  credits: { enabled: false },
  legend: { enabled: false },

  xAxis: {
    gridLineWidth: 1,
    title: { text: null }, // ✅ remove axis title
    labels: { format: '{value}' },
  },
  yAxis: {
    startOnTick: false,
    endOnTick: false,
    title: { text: null }, // ✅ remove axis title
    labels: { format: '{value}' },
  },

  tooltip: {
    useHTML: true,
    formatter: function () {
      const { x, y, z, name } = this.point;
      return `
      <table>
        <tr><th>Name:</th><td>${name || '—'}</td></tr>
        <tr><th>X:</th><td>${x}</td></tr>
        <tr><th>Y:</th><td>${y}</td></tr>
        <tr><th>Z:</th><td>${z}</td></tr>
      </table>
    `;
    },
    followPointer: true,
  },

  plotOptions: {
    bubble: {
      colorByPoint: true,
    },
  },

  series: [
    {
      name: '', // no "Series 1"
      showInLegend: false,
      data: data.map(d => ({
        x: d.x,
        y: d.y,
        z: d.z,
        name: d.name || '', // ✅ ensure name is passed
      })),
      marker: {
        fillOpacity: 0.6,
        lineColor: 'rgba(0,0,0,0.1)',
        lineWidth: 1,
      },
    },
  ],

});
