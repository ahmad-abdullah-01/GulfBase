import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const ChartView = ({ config, style }) => {
  const safeConfig = JSON.stringify(config);

  const chartHTML = useMemo(() => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://code.highcharts.com/highcharts.js"></script>
        <script src="https://code.highcharts.com/highcharts-more.js"></script>
        <script src="https://code.highcharts.com/modules/accessibility.js"></script>
        <style>
          html, body, #container {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            background: transparent;
          }

          .highcharts-tooltip-box {
            stroke: url(#tooltipGradient);
            stroke-width: 2px;
          }
        </style>
      </head>
      <body>
        <div id="container"></div>
        <script>
document.addEventListener("DOMContentLoaded", function() {
  const gradientColors = [
    { radialGradient: { cx: 0.5, cy: 0.5, r: 0.8 },
      stops: [[0, '#00ffff'], [1, '#8000ff']] },
    { radialGradient: { cx: 0.5, cy: 0.5, r: 0.8 },
      stops: [[0, '#ff9900'], [1, '#ff00cc']] },
    { radialGradient: { cx: 0.5, cy: 0.5, r: 0.8 },
      stops: [[0, '#6a00ff'], [1, '#00fff0']] },
    { radialGradient: { cx: 0.5, cy: 0.5, r: 0.8 },
      stops: [[0, '#ff00ff'], [1, '#00ffe0']] },
    { radialGradient: { cx: 0.5, cy: 0.5, r: 0.8 },
      stops: [[0, '#ffae00'], [1, '#d000ff']] }
  ];

  Highcharts.setOptions({
    chart: { backgroundColor: 'transparent' },
    colors: gradientColors
  });

  const chartConfig = ${safeConfig};

  if (chartConfig.series && Array.isArray(chartConfig.series)) {
    chartConfig.series = chartConfig.series.map(s => {
      if (['pie', 'bar', 'column'].includes(s.type)) {
        return { ...s, colorByPoint: true };
      }
      return s;
    });
  }

  chartConfig.tooltip = {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: 'transparent',
    style: { color: '#000', fontSize: '14px' },
    useHTML: false,
    formatter: function () {
      return '<b>' + this.key + '</b>: ' + Highcharts.numberFormat(this.y);
    }
  };

  chartConfig.title = chartConfig.title || {};
  chartConfig.title.style = { color: '#EEE', fontWeight: '500' };
  chartConfig.legend = { itemStyle: { color: '#AAA' } };

  chartConfig.xAxis = {
    ...(chartConfig.xAxis || {}),
    title: { text: null },
    labels: {
      ...(chartConfig.xAxis?.labels || {}),
      style: { color: '#AAA' },
    },
  };

  chartConfig.yAxis = {
  ...(chartConfig.yAxis || {}),
  title: { text: null }, // ✅ remove "Values"
  labels: {
    ...(chartConfig.yAxis?.labels || {}),
    enabled: true,
    style: { color: '#AAA' },
  },
  gridLineWidth: chartConfig.yAxis?.gridLineWidth ?? 1,
  gridLineColor: chartConfig.yAxis?.gridLineColor ?? '#444',
  lineWidth: chartConfig.yAxis?.lineWidth ?? 0,
};


  const chart = Highcharts.chart('container', chartConfig);

  const renderer = chart.renderer;
  const defs = renderer.createElement('defs').add();
  const gradient = renderer.createElement('linearGradient')
    .attr({ id: 'tooltipGradient', x1: 0, y1: 0, x2: 1, y2: 1 })
    .add(defs);

  gradient.createElement('stop').attr({ offset: 0, 'stop-color': '#00ffff' }).add();
  gradient.createElement('stop').attr({ offset: 1, 'stop-color': '#ff00ff' }).add();

  function applyTooltipGradient() {
    const tooltipBox = chart.tooltip && chart.tooltip.label && chart.tooltip.label.element;
    if (tooltipBox && tooltipBox.tagName === 'path') {
      tooltipBox.setAttribute('stroke', 'url(#tooltipGradient)');
      tooltipBox.setAttribute('stroke-width', '2');
    }
  }

  Highcharts.addEvent(chart.tooltip, 'refresh', applyTooltipGradient);
  Highcharts.addEvent(chart.tooltip, 'update', applyTooltipGradient);
});
</script>
      </body>
    </html>
  `, [safeConfig]);

  return (
    <View style={[styles.container, style]}>
      <WebView
        originWhitelist={['*']}
        source={{ html: chartHTML }}
        javaScriptEnabled
        domStorageEnabled
        scrollEnabled={false}
        automaticallyAdjustContentInsets={false}
        startInLoadingState
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    marginVertical: 10,
  },
  webview: { flex: 1, backgroundColor: 'transparent' },
});

export default React.memo(ChartView);
