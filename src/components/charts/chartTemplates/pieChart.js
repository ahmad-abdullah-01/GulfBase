export default (data = []) => ({
  chart: { type: 'pie', backgroundColor: 'transparent' },
  title: { text: '' },

  tooltip: {
    backgroundColor: '#222',
    style: { color: '#fff' },
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
  },

  plotOptions: {
    pie: {
      size: '70%',
      allowPointSelect: true,
      cursor: 'pointer',
      colorByPoint: true,
      dataLabels: {
        enabled: true,
        distance: 15,
        format: '{point.percentage:.1f} %',
        style: { color: '#fff', textOutline: 'none', fontSize: '11px' },
      },
      showInLegend: true,
    },
  },

  legend: {
    enabled: true,
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'bottom',
    itemStyle: { color: '#fff', fontWeight: '500', fontSize: '14px' },
    itemHoverStyle: { color: '#FFBB28', cursor: 'pointer' },
    symbolRadius: 6,
    symbolHeight: 22,
    symbolWidth: 22,
  },

  series: [
    {
      name: 'Share',
      data,
    },
  ],
});