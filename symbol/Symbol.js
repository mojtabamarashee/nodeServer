//inscode = '318005355896147';

function GetWatchList() {
  watchList = JSON.parse(localStorage.getItem('watchList'));
  if (!watchList) {
    watchList = [0];
  }

  iterateList = JSON.parse(localStorage.getItem('iterateList'));
  if (iterateList) {
    iterateListIndex = JSON.parse(localStorage.getItem('iterateListIndex'));
  }
  console.log('iterateList = ', iterateList);
}

GetWatchList();
let drawHistFirstFlag = 0;

function DrawHist(dataa, id, timeFormat) {
  var margin = {top: 20, right: 50, bottom: 90, left: 80},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  if (!drawHistFirstFlag) {
    svg = d3
      .select(id)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    drawHistFirstFlag = 1;

    // Add the valueline path.
    svg
      .append('path')
      .attr('class', 'line')
      .style('stroke-width', 5);

    // Add the X Axis
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .attr('class', 'x axis')
      .style('font', '25px times');

    // Add the Y Axis
    svg
      .append('g')
      .attr('class', 'y axis')
      .style('font', '25px times');

    svg.append('rect').attr('class', 'rect');
  }

  var x = d3.scaleTime().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  var valueline = d3
    .line()
    .x(function(d) {
      return x(d.date);
    })
    .y(function(d) {
      return y(d.pl);
    });

  let data = [];
  for (i = 0; i < dataa.length; i++) {
    data[i] = dataa[i];
  }
  x.domain(
    d3.extent(data, function(d) {
      return d.date;
    }),
  );
  let minn = d3.min(data, function(d) {
    return d.pl;
  });
  let maxx = d3.max(data, function(d) {
    return d.pl;
  });

  y.domain([minn - (maxx - minn) * 0.1, maxx]);

  // Add the valueline path.
  svg
    .select('.line')
    .data([data])
    .attr('d', valueline);

  // Add the X Axis
  svg
    .select('.x.axis')
    .call(
      d3
        .axisBottom(x)
        .ticks(10)
        .tickFormat(d =>
          new Date(d)
            .toLocaleTimeString('fa-IR', {
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
            })
            .replace('،‏ ۰:۰۰:۰۰', ''),
        ),
    )
    .selectAll('text')
    .attr('y', 0)
    .attr('x', 9)
    .attr('dy', '.35em')
    .attr('transform', 'rotate(65)')
    .style('text-anchor', 'start');

  // Add the Y Axis

  const yMin = d3.min(data, d => {
    return Math.min(d['pl']);
  });
  const yMax = d3.max(data, d => {
    return Math.max(d['pl']);
  });
  console.log('yMax = ', yMax);

  svg
    .select('.y.axis')
    //.style('font', '25px times')
    .call(
      d3
        .axisLeft(y)
        .ticks(5)
        .tickFormat(d => {
          if (yMax >= 100000) {
            return Math.round((d / 1000) * 10) / 10 + 'k';
          } else {
            return d;
          }
        }),
    );

  //vol data
  const volData = data;
  const yMinVolume = d3.min(volData, d => {
    return Math.min(d['vol']);
  });
  const yMaxVolume = d3.max(volData, d => {
    return Math.max(d['vol']);
  });

  const yVolumeScale = d3
    .scaleLinear()
    .domain([yMinVolume, yMaxVolume])
    .range([height, 0]);

  var bars = svg
    .selectAll('.bar')
    .remove()
    .exit();
  svg
    .selectAll()
    .data(volData)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => {
      return x(d['date']);
    })
    .attr('y', d => {
      return yVolumeScale(d['vol']);
    })
    .attr('fill', (d, i) => {
      if (i === 0) {
        return '#03a678';
      } else {
        return volData[i - 1].pl > d.pl ? '#c0392b' : '#03a678';
      }
    })
    .attr('width', 1)
    .attr('height', d => {
      return height - yVolumeScale(d['vol']);
    });
}

function Draw(dataa, id, timeFormat, tmin, tmax) {
  let data = [];
  for (i = 0; i < dataa.length; i++) {
    data[i] = dataa[i];
  }
  var margin = {top: 20, right: 50, bottom: 30, left: 80},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  //var parseTime = d3.timeParse(timeFormat);

  var x = d3.scaleTime().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  var valueline = d3
    .line()
    .x(function(d) {
      return x(d.date);
    })
    .y(function(d) {
      return y(d.pl);
    });

  var svg = d3
    .select(id)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  x.domain(
    d3.extent(data, function(d) {
      return d.date;
    }),
  );
  y.domain([
    Math.min(
      d3.min(data, function(d) {
        return d.pl;
      }),
      tmed - 0.1 * tmed,
    ),
    Math.max(
      d3.max(data, function(d) {
        return d.pl;
      }),
      tmed + 0.1 * tmed,
    ),
  ]);

  // Add the valueline path.
  svg
    .append('path')
    .data([data])
    .attr('class', 'line')
    .attr('d', valueline);

  svg
    .append('line')
    .style('stroke', 'red')
    .style('stroke-width', 10)
    .attr('x1', x(data[0].date))
    .attr('y1', y(tmin)) //start of the line
    .attr('x2', x(data[data.length - 1].date))
    .attr('y2', y(tmin));

  svg
    .append('line')
    .style('stroke', 'green')
    .style('stroke-width', 10)
    .attr('x1', x(data[0].date))
    .attr('y1', y(tmax)) //start of the line
    .attr('x2', x(data[data.length - 1].date))
    .attr('y2', y(tmax));

  // Add the X Axis
  svg
    .append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .style('font', '30px times')
    .call(
      d3
        .axisBottom(x)
        .ticks(5)
        .tickFormat(d =>
          new Date(d).toLocaleTimeString('fa-IR', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        ),
    );

  // Add the Y Axis
  svg
    .append('g')
    .style('font', '25px times')
    .call(d3.axisLeft(y).ticks(5));
}

function DrawMoneyFlow(dataa, id) {
  let data = [];
  for (i = 0; i < dataa.length; i++) {
    data[i] = dataa[i];
  }
  var margin = {top: 20, right: 50, bottom: 30, left: 80},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var svg = d3
    .select(id)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  //vol data
  const volData = data.reverse();

  const yMinVolume = d3.min(volData, d => {
    return d[9] - d[11];
  });
  const yMaxVolume = d3.max(volData, d => {
    return d[9] - d[11];
  });

  const yVolumeScale = d3
    .scaleLinear()
    .domain([yMinVolume, yMaxVolume])
    .range([height, 0]);

  var x = d3.scaleTime().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  x.domain(
    d3.extent(data, function(d) {
      return d[0];
    }),
  );

  y.domain([
    d3.min(data, function(d) {
      return d[9] - d[11];
    }),
    d3.max(data, function(d) {
      return d[9] - d[11];
    }),
  ]);
  // Add the X Axis
  svg
    .append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .style('font', '25px times')
    .call(
      d3
        .axisBottom(x)
        .ticks(5)
        .tickFormat(d =>
          new Date(d)
            .toLocaleTimeString('fa-IR', {
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
            })
            .replace('،‏ ۰:۰۰:۰۰', ''),
        ),
    );

  // Add the Y Axis
  svg
    .append('g')
    .style('font', '25px times')
    .call(
      d3
        .axisLeft(y)
        .ticks(5)

        .tickFormat(d => Math.round((d / 1e9) * 10) / 10 + 'B'),
    );

  svg
    .selectAll()
    .data(volData)
    .enter()
    .append('rect')
    .attr('x', d => {
      return x(d[0]);
    })
    .attr('y', d => {
      if (d[9] - d[11] < 0) return yVolumeScale(0);
      else return yVolumeScale(d[9] - d[11]);
    })
    .attr('fill', (d, i) => {
      return d[9] - d[11] > 0 ? '#03a678' : '#c0392b';
    })
    .attr('width', 10)
    .attr('height', d => {
      if (d[9] - d[11] < 0) return yVolumeScale(d[9] - d[11]) - yVolumeScale(0);
      else
        return (
          height -
          yVolumeScale(d[9] - d[11]) -
          (yVolumeScale(yMinVolume) - yVolumeScale(0))
        );
    });

  svg
    .append('line')
    .style('stroke', 'black')
    .style('stroke-width', 5)
    .attr('x1', x(volData[0][0]))
    .attr('y1', yVolumeScale(0)) //start of the line
    .attr('x2', x(volData[volData.length - 1][0]))
    .attr('y2', yVolumeScale(0));
}

let hist;
let adjusted = 1;
let log = 0;
let interval = 360;

$(document).ready(function() {
  axios.get('http://filterbourse.ir/hist/' + inscode).then(response => {
    name = response.data.name;
    fullName = response.data.fullName;
    csName = response.data.csName;

    hist = response.data.hist;
    date = response.data.date;
    pl = response.data.pl;
    pc = response.data.pc;

    Buy_CountI = Number(response.data.Buy_CountI);
    Buy_I_Volume = Number(response.data.Buy_I_Volume);
    Buy_CountN = Number(response.data.Buy_CountN);
    Buy_N_Volume = Number(response.data.Buy_N_Volume);

    Sell_CountI = Number(response.data.Sell_CountI);
    Sell_I_Volume = Number(response.data.Sell_I_Volume);
    Sell_CountN = Number(response.data.Sell_CountN);
    Sell_N_Volume = Number(response.data.Sell_N_Volume);

    if (hist) len = response.data.hist.length;

    histNotAdj = response.data.histNotAdj;

    tmed = Number(response.data.tmed);
    tmin = Number(response.data.tmin);
    tmax = Number(response.data.tmax);

    pe = response.data.pe;
    sectorPE = response.data.sectorPE;

    pc = response.data.pc;
    pcp = Math.round(((pc - tmed) / tmed) * 100 * 100) / 100;

    pl = response.data.pl;
    plp = Math.round(((pl - tmed) / tmed) * 100 * 100) / 100;

    tvol = response.data.tvol;
    tvolp = response.data.QTotTran5JAvg;

    $('#title').text(name + '-' + pc);
    $('#name').text(name);
    $('#full-name').text('(' + fullName + ')');
    $('#cs-name').text(csName);

    $('#pc')
      .text(pc)
      .css('color', pc > tmed ? 'green' : 'red');
    $('#pcp')
      .text('(' + pcp + ')')
      .css('color', pcp > 0 ? 'green' : 'red');

    $('#pl')
      .text(pl)
      .css('color', pl > tmed ? 'green' : 'red');

    $('#plp')
      .text('(' + plp + ')')
      .css('color', plp > 0 ? 'green' : 'red');

    $('#tvol')
      .text(numeral(tvol))
      .css('color', pl > tmed ? 'black' : 'black');
    $('#Mtvol')
      .text(Math.round((tvol / tvolp) * 10) / 10)
      .css('color', Number(tvol) > Number(tvolp) ? 'green' : 'red');

    //$('#pe').text(pe);
    //$('#sec-pe').text(sectorPE);

    $('#sell-hoghughi-num').text(NumWithCommas(Sell_CountN));
    $('#sell-hoghughi-vol').text(NumWithCommas(Sell_N_Volume));

    $('#buy-hoghughi-num').text(NumWithCommas(Buy_CountN));
    $('#buy-hoghughi-vol').text(NumWithCommas(Buy_N_Volume));

    $('#sell-hoghughi-width').css(
      'width',
      (Sell_N_Volume / (Sell_N_Volume + Sell_I_Volume)) * 100 + '%',
    );
    $('#buy-hoghughi-width').css(
      'width',
      (Buy_N_Volume / (Buy_N_Volume + Buy_I_Volume)) * 100 + '%',
    );

    $('#sell-haghighi-num').text(NumWithCommas(Sell_CountI));
    $('#sell-haghighi-vol').text(NumWithCommas(Sell_I_Volume));

    $('#buy-haghighi-num').text(NumWithCommas(Buy_CountI));
    $('#buy-haghighi-vol').text(NumWithCommas(Buy_I_Volume));

    $('#sell-haghighi-width').css(
      'width',
      (Sell_I_Volume / (Sell_I_Volume + Sell_N_Volume)) * 100 + '%',
    );
    $('#buy-haghighi-width').css(
      'width',
      (Buy_I_Volume / (Buy_I_Volume + Buy_N_Volume)) * 100 + '%',
    );

    if (hist) {
      interval = 360;
      PlotHist();
    }

    intraDayPrice = response.data.intraDayPrice;
    if (intraDayPrice) {
      len = response.data.intraDayPrice.length;
      temp = JSON.parse(JSON.stringify(intraDayPrice));
      // temp = temp.slice(len - interval, len);

      var parseTime = d3.timeParse('%H:%M');
      temp.forEach(function(d) {
        d.date = parseTime(d.date);
        //d.pl = d.pl;
      });
      Draw(temp, '#one-day', '%H:%M', tmin, tmax);
    }

    temp = JSON.parse(JSON.stringify(response.data.ctHist));

    let dd = temp[temp.length - 1][0].toString();
    let date1 = new Date(
      dd.slice(0, 4) + '-' + dd.slice(4, 6) + '-' + dd.slice(6, 8),
    )
      .toLocaleDateString('fa-IR')
      .replace(/\//g, '');

    date1 = fixNumbers(date1.slice(2, 8));
    let date2 = date.replace(/\//g, '');
    if (date1 != date2) {
      (dateSplitted = date.split('/')),
        (jD = JalaliDate.jalaliToGregorian(
          '13' + dateSplitted[0],
          dateSplitted[1],
          dateSplitted[2],
        )),
        (jResult = jD[0] + jD[1] + jD[2]);

      let g = [
        jResult,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        Buy_I_Volume * pc,
        0,
        Sell_I_Volume * pc,
      ];
      temp.unshift(g);
    }

    var parseTime = d3.timeParse('%Y-%m-%d');
    temp.forEach(function(d, i) {
      temp[i][0] = parseTime(
        d[0].toString().slice(0, 4) +
          '-' +
          d[0].toString().slice(4, 6) +
          '-' +
          d[0].toString().slice(6, 8),
      );
    });
    console.log('temp = ', temp);
    DrawMoneyFlow(temp, '#money-flow');
  });
});

axios.get('http://filterbourse.ir/api/names').then(response => {
  availableTags = response.data.map(v => (v ? v : 0));
  $('#tags').autocomplete({
    source: availableTags,
    select: function(event, ui) {
      if (ui.item) {
        $('#tags').val(ui.item.value);
        window.location.href = 'http://filterbourse.ir/' + ui.item.value;
      }
    },
  });

  $('a').css('font-size', '30px');
});

function numeral(tvol) {
  if (tvol > 1e6) {
    return Math.round((tvol / 1e6) * 10) / 10 + 'M';
  } else if (tvol > 1000) {
    return Math.round((tvol / 1e3) * 10) / 10 + 'K';
  }
}

function PlotReal() {}

function PlotHist() {
  let temp;

  len = hist.length;
  temp = JSON.parse(JSON.stringify(hist));

  if (interval == 'all') {
    interval = len;
  }
  temp = temp.slice(len - interval, len);

  let dd = temp[temp.length - 1];
  let date1 = new Date(
    dd.date.slice(0, 4) + '-' + dd.date.slice(4, 6) + '-' + dd.date.slice(6, 8),
  )
    .toLocaleDateString('fa-IR')
    .replace(/\//g, '');

  date1 = fixNumbers(date1.slice(2, 8));
  console.log('date = ', date);
  let date2 = date.replace(/\//g, '');
  if (date1 != date2) {
    (dateSplitted = date.split('/')),
      (jD = JalaliDate.jalaliToGregorian(
        '13' + dateSplitted[0],
        dateSplitted[1],
        dateSplitted[2],
      )),
      (jResult = jD[0] + jD[1] + jD[2]);
    console.log(jResult);

    let g = {
      date: jResult,
      vol: Number(tvol),
      pl: Number(pl),
    };
    console.log('g = ', g);
    temp.push(g);
  }

  console.log('date1 = ', date1);
  console.log('date2 = ', date2);

  var parseTime = d3.timeParse('%Y-%m-%d');
  temp.forEach((d, i) => {
    d.date = parseTime(
      d.date.slice(0, 4) + '-' + d.date.slice(4, 6) + '-' + d.date.slice(6, 8),
    );
    if (adjusted == 0) {
      if (log == 0) d.pl = histNotAdj[i + len - interval];
      else d.pl = Math.log2(histNotAdj[i + len - interval]);
    } else {
      if (log == 0) d.pl = d.pl;
      else d.pl = Math.log2(d.pl);
    }
  });

  console.log('temp = ', temp);
  DrawHist(temp, '#hist', '%Y-%m-%d');
}

$(document).ready(function() {
  if (watchList.includes(inscode)) {
    $('#watch-list').toggleClass('fa-eye fa-eye-slash');
  }

  $('#next-list').click(() => {
    iterateListIndex++;
    if (iterateListIndex == iterateList.length) {
      $('#next-list').css('color', 'grey');
      iterateListIndex = iterateList.length - 1;
    } else {
      localStorage.setItem(
        'iterateListIndex',
        JSON.stringify(iterateListIndex),
      );
      window.location.href =
        'http://filterbourse.ir/' + iterateList[iterateListIndex];
    }
  });

  $('#prev-list').click(() => {
    iterateListIndex--;
    console.log('iterateListIndex = ', iterateListIndex);
    if (iterateListIndex == -1) {
      $('#prev-list').css('color', 'grey');
      iterateListIndex = 0;
      console.log('iterateListIndex = ', iterateListIndex);
    } else {
      localStorage.setItem(
        'iterateListIndex',
        JSON.stringify(iterateListIndex),
      );
      window.location.href =
        'http://filterbourse.ir/' + iterateList[iterateListIndex];
    }
  });

  $('#watch-list').click(() => {
    console.log('watchList = ', watchList);
    if (watchList.includes(inscode)) {
      var index = watchList.indexOf(inscode);
      watchList.splice(index, 1);
      if (!watchList) {
        watchList = [];
      }
    } else {
      watchList.push(inscode);
    }

    localStorage.setItem('watchList', JSON.stringify(watchList));
    console.log('watchList = ', watchList);
    $('#watch-list').toggleClass('fa-eye fa-eye-slash');
  });


  $('#7d').click(function() {
    interval = 7;
    PlotHist();
  });

  $('#1M').click(function() {
    interval = 30;
    PlotHist();
  });

  $('#2M').click(function() {
    interval = 60;
    PlotHist();
  });

  $('#1Y').click(function() {
    interval = 360;
    PlotHist();
  });

  $('#All').click(function() {
    interval = 'all';
    PlotHist();
  });

  $('#adjusted').click(function() {
    adjusted = 1 - adjusted;
    PlotHist();
  });

  $('#log').click(function() {
    log = 1 - log;
    console.log('log = ', log);
    PlotHist();
  });
});
//
//
//
var persianNumbers = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g,
  ],
  arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
  fixNumbers = function(str) {
    if (typeof str === 'string') {
      for (var i = 0; i < 10; i++) {
        str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
      }
    }
    return str;
  };

JalaliDate = {
  g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
};

JalaliDate.jalaliToGregorian = function(j_y, j_m, j_d) {
  j_y = parseInt(j_y);
  j_m = parseInt(j_m);
  j_d = parseInt(j_d);
  var jy = j_y - 979;
  var jm = j_m - 1;
  var jd = j_d - 1;

  var j_day_no =
    365 * jy + parseInt(jy / 33) * 8 + parseInt(((jy % 33) + 3) / 4);
  for (var i = 0; i < jm; ++i) j_day_no += JalaliDate.j_days_in_month[i];

  j_day_no += jd;

  var g_day_no = j_day_no + 79;

  var gy =
    1600 +
    400 *
      parseInt(
        g_day_no / 146097,
      ); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
  g_day_no = g_day_no % 146097;

  var leap = true;
  if (g_day_no >= 36525) {
    /* 36525 = 365*100 + 100/4 */
    g_day_no--;
    gy +=
      100 * parseInt(g_day_no / 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
    g_day_no = g_day_no % 36524;

    if (g_day_no >= 365) g_day_no++;
    else leap = false;
  }

  gy += 4 * parseInt(g_day_no / 1461); /* 1461 = 365*4 + 4/4 */
  g_day_no %= 1461;

  if (g_day_no >= 366) {
    leap = false;

    g_day_no--;
    gy += parseInt(g_day_no / 365);
    g_day_no = g_day_no % 365;
  }

  for (
    var i = 0;
    g_day_no >= JalaliDate.g_days_in_month[i] + (i == 1 && leap);
    i++
  )
    g_day_no -= JalaliDate.g_days_in_month[i] + (i == 1 && leap);
  var gm = i + 1;
  var gd = g_day_no + 1;

  gm = gm < 10 ? '0' + gm : gm;
  gd = gd < 10 ? '0' + gd : gd;

  return [gy, gm, gd];
};

function NumWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
