$(document).ready(function() {
    var $window = $(window),
        $header = $('header'),
        $video = $('#header-video'),
        $overlay = $('#header-overlay'),
        $container = $('#container'),
        last_scroll_position = 0;

    var repositionContainer = function() {
        $container.css(
            'top', $window.height()
        );
    };
    repositionContainer();

    var resizeElements = function() {
        var client_height = $window.height(),
            client_width = $window.width();

        $video.width(client_width);
        var additional_width = 0;
        while ($video.height() < client_height) {
            additional_width += 100;
            $video.width(client_width + additional_width);
        }

        $overlay.width(client_width);

        $header.height(client_height);
    };
    resizeElements();

    window.onresize = function() {
        repositionContainer();
        resizeElements();
    };

    window.onscroll = function() {
        var scroll_position = $window.scrollTop(),
            client_height = $window.height(),
            scroll_ratio = scroll_position / client_height *2; // A ratio of how far it has scrolled

        // The main header scrolls up faster:
        $overlay.css('bottom', scroll_position * 1.333 + 60);

        // Fade out video and #sub-header at certain thresholds:
        $video.css('opacity', 1.2 - scroll_ratio);
    }

    // Call once to reposition stuff:
    window.onresize();
});

$(document).ready(function() {
    var revenueData = [
    {
        value: 403,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Non-food item revenue"
    },
    {
        value: 100,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Food item revenue"
    }
    ]

    var ctxRevenue = $("#revenueChart").get(0).getContext("2d");
    var revenueChart = new Chart(ctxRevenue).Doughnut(revenueData);

    var growthData = {
    labels: ["2007", "2011"],
    datasets: [
        {
            label: "Businesses further away from street vendors",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [0, -5]
        },
        {
            label: "Businesses in close proximity to street vendors",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [0, 5]
        }
        ]
    };

    var ctxGrowth = $("#growthChart").get(0).getContext("2d");
    var growthChart = new Chart(ctxGrowth).Line(growthData, {scaleLabel : "<%= Number(value) + '%'%>"});
    var legend = growthChart.generateLegend();
    $('.growthChartLegend').append(legend);

});
