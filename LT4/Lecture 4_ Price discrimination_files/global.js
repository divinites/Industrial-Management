function global() {

    var self = this;

    // init
    self.init = function () {

        self.events();

        ////$.get(_root + "Umbraco/Api/Calendar/GetAllOpeningTimes", function (result) {
        ////    console.log(result);
        ////});

        //$.getJSON(_root + "Umbraco/Api/CalendarFile/GetCalendarData", function (data) {
        //    console.log(data);
        //});

        $.ajax({
            url: "/Umbraco/Api/BigSixStats/GetCompetition",
            dataType: "text",
            success: function (data) {
                var json = $.parseJSON(data);
                for (var i = 0; i < 10; i++) {
                    var result = "<tr><td>" + json[i].name + "</td><td>" + toHHMMSS(json[i].total_time) + "</td></tr>";
                    $('.big_six_competition .table-left-content table').append(result);
                }
            }
        });

        $.ajax({
            url: "/Umbraco/Api/BigSixStats/GetRideStats",
            dataType: "text",
            success: function (data) {

                var json = $.parseJSON(data);

                // big six page
                var airTime = 0;
                var loops = 0;
                var drops = 0;
                var freefalls = 0;
                var distanceTravelled = 0;

                // ride page
                var checkinSmiler = 0;
                var distanceSmiler = 0;
                var loopsSmiler = 0;
                var timeInvertedSmiler = 0;

                var checkinOblivion = 0;
                var distanceOblivion = 0;
                var airtimeOblivion = 0;
                var ddropsOblivion = 0;

                var checkinAir = 0;
                var distanceAir = 0;
                var loopsAir = 0;
                var timeInvertedAir = 0;

                var checkinNemesis = 0;
                var distanceNemesis = 0;
                var loopsNemesis = 0;
                var timeInvertedNemesis = 0;

                var checkinRita = 0;
                var distanceRita = 0;
                var airtimeRita = 0;
                var launchedRita = 0;

                var checkinThirteen = 0;
                var distanceThirteen = 0;
                var airtimeThirteen = 0;
                var ddropsThirteen = 0;


                for (var i = 0; i < json.length; i++) {

                    switch (json[i].name) {
                        case "The Smiler":
                            // big six page
                            loops += parseInt(json[i].stats.inversions);
                            distanceTravelled += parseInt(json[i].stats.distance);
                            // ride page
                            checkinSmiler = parseInt(json[i].stats.check_ins);
                            distanceSmiler = parseInt(json[i].stats.distance) / 1000;
                            loopsSmiler = parseInt(json[i].stats.inversions);
                            timeInvertedSmiler = toHHMMSS(parseInt(json[i].stats.time_inverted));
                            break;

                        case "Oblivion":
                            // big six page
                            airTime += parseInt(json[i].stats.air_time);
                            drops += parseInt(json[i].stats.check_ins);
                            freefalls += parseInt(json[i].stats.check_ins);
                            distanceTravelled += parseInt(json[i].stats.distance);
                            // ride page
                            checkinOblivion = parseInt(json[i].stats.check_ins);
                            distanceOblivion = parseInt(json[i].stats.distance) / 1000;
                            airtimeOblivion = parseInt(json[i].stats.air_time);
                            ddropsOblivion = parseInt(json[i].stats.distance_dropped) / 1000;
                            break;

                        case "Air":
                            // big six page
                            loops += parseInt(json[i].stats.inversions);
                            distanceTravelled += parseInt(json[i].stats.distance);
                            // ride page
                            checkinAir = parseInt(json[i].stats.check_ins);
                            distanceAir = parseInt(json[i].stats.distance) / 1000;
                            loopsAir = parseInt(json[i].stats.inversions);
                            timeInvertedAir = toHHMMSS(parseInt(json[i].stats.time_inverted));
                            break;

                        case "Nemesis":
                            // big six page
                            loops += parseInt(json[i].stats.inversions);
                            distanceTravelled += parseInt(json[i].stats.distance);
                            // ride page
                            checkinNemesis = parseInt(json[i].stats.check_ins);
                            distanceNemesis = parseInt(json[i].stats.distance) / 1000;
                            loopsNemesis = parseInt(json[i].stats.inversions);
                            timeInvertedNemesis = toHHMMSS(parseInt(json[i].stats.time_inverted));
                            break;

                        case "Rita":
                            // big six page
                            airTime += parseInt(json[i].stats.air_time);
                            distanceTravelled += parseInt(json[i].stats.distance);
                            // ride page
                            checkinRita = parseInt(json[i].stats.check_ins);
                            distanceRita = parseInt(json[i].stats.distance) / 1000;
                            airtimeRita = parseInt(json[i].stats.air_time);
                            launchedRita = parseInt(json[i].stats.distance_launched) / 1000;
                            break;

                        case "Th13teen": default:
                            // big six page
                            airTime += parseInt(json[i].stats.air_time);
                            drops += parseInt(json[i].stats.check_ins);
                            distanceTravelled += parseInt(json[i].stats.distance);
                            // ride page
                            checkinThirteen = parseInt(json[i].stats.check_ins);
                            distanceThirteen = parseInt(json[i].stats.distance) / 1000;
                            airtimeThirteen = parseInt(json[i].stats.air_time);
                            ddropsThirteen = parseInt(json[i].stats.distance_dropped) / 1000;
                            break;
                    }
                }

                /****** BIG SIX PAGE *****/
                $('.big_six_main .bigsix-airtime .airtime-num').append(toHHMMSS(airTime));
                $('.big_six_main .bigsix-drops .terror-num div').append(drops);
                $('.big_six_main .bigsix-freefalls .free-fall-num').append(freefalls);

                var km = distanceTravelled / 1000;
                $('.big_six_main .bigsix-distance .dist-num').append(km.toFixed(0));

                var splitLoops = loops.toString().split("");
                for (var i = splitLoops.length-1; i >= 0; i--) {
                    $('.big_six_main .bigsix-loops .number-rot').append("<div>" + splitLoops[i] + "</div>");
                }


                /****** RIDE PAGE ******/
                // Smiler
                splitLoops = loopsSmiler.toString().split("");
                $('.big_six_main_ride.smiler .bigsix-checkins .check-num').append(checkinSmiler);
                $('.big_six_main_ride.smiler .bigsix-distance .dist-num').append(distanceSmiler.toFixed(0));
                $('.big_six_main_ride.smiler .bigsix-inverted .inverted-num').append(timeInvertedSmiler);
                for (var i = splitLoops.length - 1; i >= 0; i--) {
                    $('.big_six_main_ride.smiler .bigsix-loops.loops .number-rot').append("<div>" + splitLoops[i] + "</div>");
                }

                // Oblivion
                $('.big_six_main_ride.oblivion .bigsix-checkins .check-num').append(checkinOblivion);
                $('.big_six_main_ride.oblivion .bigsix-distance .dist-num').append(distanceOblivion.toFixed(0));
                $('.big_six_main_ride.oblivion .bigsix-airtime-small .airtime-num').append(toHHMMSS(airtimeOblivion));
                $('.big_six_main_ride.oblivion .bigsix-distancedrops .terror-num div').append(ddropsOblivion.toFixed(0));

                // Air
                splitLoops = loopsAir.toString().split("");
                $('.big_six_main_ride.air .bigsix-checkins .check-num').append(checkinAir);
                $('.big_six_main_ride.air .bigsix-distance .dist-num').append(distanceAir.toFixed(0));
                $('.big_six_main_ride.air .bigsix-inverted .inverted-num').append(timeInvertedAir);
                for (var i = splitLoops.length - 1; i >= 0; i--) {
                    $('.big_six_main_ride.air .bigsix-loops.loops .number-rot').append("<div>" + splitLoops[i] + "</div>");
                }

                // Nemesis
                splitLoops = loopsNemesis.toString().split("");
                $('.big_six_main_ride.nemesis .bigsix-checkins .check-num').append(checkinNemesis);
                $('.big_six_main_ride.nemesis .bigsix-distance .dist-num').append(distanceNemesis.toFixed(0));
                $('.big_six_main_ride.nemesis .bigsix-inverted .inverted-num').append(timeInvertedNemesis);
                for (var i = splitLoops.length - 1; i >= 0; i--) {
                    $('.big_six_main_ride.nemesis .bigsix-loops.loops .number-rot').append("<div>" + splitLoops[i] + "</div>");
                }

                // Rita
                $('.big_six_main_ride.rita .bigsix-checkins .check-num').append(checkinRita);
                $('.big_six_main_ride.rita .bigsix-distance .dist-num').append(distanceRita.toFixed(0));
                $('.big_six_main_ride.rita .bigsix-airtime-small .airtime-num').append(toHHMMSS(airtimeRita));
                $('.big_six_main_ride.rita .bigsix-distancelaunched .dist-num').append(launchedRita.toFixed(0));

                // Thirteen
                $('.big_six_main_ride.thirteen .bigsix-checkins .check-num').append(checkinThirteen);
                $('.big_six_main_ride.thirteen .bigsix-distance .dist-num').append(distanceThirteen.toFixed(0));
                $('.big_six_main_ride.thirteen .bigsix-airtime-small .airtime-num').append(toHHMMSS(airtimeThirteen));
                $('.big_six_main_ride.thirteen .bigsix-distancedrops .terror-num div').append(ddropsThirteen.toFixed(0));
            }
        });

        self.loadConsolidatedStats();
        setInterval(self.loadConsolidatedStats, 10000);
    }


    function toHHMMSS(myTime) {
        var sec_num = parseInt(myTime, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }

        var time = hours + ':' + minutes + ':' + seconds;
        return time;
    }


    self.loadConsolidatedStats = function () {
        $.ajax({
            url: "/Umbraco/Api/BigSixStats/GetConsolidatedStats",
            dataType: "text",
            success: function (data) {
                var json = $.parseJSON(data);
                var totalCompletions = json.total_completions;
                var finalHtml = "";

                var splitCompletions = totalCompletions.toString().split("");
                if (splitCompletions.length < 8) {
                    for (var i = 0; i < 8 - splitCompletions.length; i++) {
                        finalHtml += "<div>0</div>";
                    }
                }
                for (var i = 0; i < splitCompletions.length; i++) {
                    finalHtml += "<div>" + splitCompletions[i] + "</div>";
                }
                $('.odometer').html(finalHtml);
            }
        });
    }


    self.getRooms = function (el) {

        var nodeId = $(el).data("node");
        var parentSection = $(el).closest(".hotel_rooms");
        parentSection.html("");

        $.get(_root + "umbraco/surface/HotelExplorer/HotelExplorer", { node: nodeId }, function (result) {

            parentSection.html(result);
            if (AT.carouselControl) AT.carouselControl.buildInjectedCarousel();
        });

    }

    // contact us forms post method
    self.getContactUsFormsData = function (el, container) {
        var item = $(el);
        var url = item.closest("form").attr("action");

        var form = item.closest("form");

        $.post(url, form.serialize(), function (result) {

            $(container).html(result);

            // initialize the date picker plugin if this is the additional needs form container
            if (container == ".ajax-container-additional") {
                AT.AdditionalNeedsForm();
            }
            
        });
    }


    //events
    self.events = function () {

        // ajax btn
        $(document).on('click', '.do-ajax-btn-competition-entry', function (e) {
            var item = $(this);
            var url = item.closest("form").attr("action");
            var form = item.closest("form");

            var competitionName = $('#hidden-competiton-name').attr('data-competitionname')
            $('#HiddenCompetitionName').val(competitionName);
            //var parent = form.parent();

            $.post(url, form.serialize(), function (result) {

                $(".ajax-container-competition").html(result);

                if ($(".hide-form").length) {

                    $(".ajax-container form").slideToggle().next(".thank-you-message").slideToggle();


                }

            });

            e.preventDefault();
            return true;
        });



        // ajax btn general question form
        $(document).on('click', '.do-ajax-btn-general-question', function (e) {
            var item = $(this);
            var url = item.closest("form").attr("action");
            var form = item.closest("form");

            //var competitionName = $('#hidden-competiton-name').attr('data-competitionname')
            //$('#HiddenCompetitionName').val(competitionName);
            //var parent = form.parent();
            console.log(3);
            $.post(url, form.serialize(), function (result) {

                console.log(result);

                $(".ajax-container-general-question").html(result);

                if ($(".hide-form").length) {

                    $(".ajax-container form").slideToggle().next(".thank-you-message").slideToggle();


                }

            });

            e.preventDefault();
            return true;
        });


        $(document).on('change', 'input[data-input]', function () {
            var input = $(this)[0];
            var file = input.files[0];
            var reader = new FileReader();

            reader.onloadend = function () {
                $('input[name="' + $(input).attr("data-input") + '"]').val(file.name + ',' + reader.result);
            }

            if (file) {
                reader.readAsDataURL(file);
            } else {
                $('input[name="' + $(input).attr("data-input") + '"]').val("");
            }
        });


        // ajax btn
        $(document).on('click', '.do-ajax-btn', function (e) {
            var item = $(this);
            var url = item.closest("form").attr("action");

            var form = item.closest("form");
            //var parent = form.parent();

            $.post(url, form.serialize(), function (result) {

                $(".ajax-container").html(result);

                if ($(".hide-form").length) {

                    $(".ajax-container form").slideToggle().next(".thank-you-message").slideToggle();


                }

            });

            e.preventDefault();
            return true;
        });



        // ajax btn big six competition
        $(document).on('click', '.do-ajax-btn-bigsix', function (e) {

            var item = $(this);
            var url = item.closest("form").attr("action");

            var form = item.closest("form");

            $.post(url, form.serialize(), function (result) {

                $(".ajax-container-bigsix").html(result);

            });

            e.preventDefault();
            return true;
        });



        // ajax btn question
        $(document).on('click', '.do-ajax-btn-question', function (e) {

            self.getContactUsFormsData(this, ".ajax-container-question-form");

            e.preventDefault();
            return true;
        });

        // ajax btn feedback
        $(document).on('click', '.do-ajax-btn-feedback', function (e) {

            self.getContactUsFormsData(this, ".ajax-container-feedback-form");

            e.preventDefault();
            return true;
        });

        // ajax btn lostproperty
        $(document).on('click', '.do-ajax-btn-lostproperty', function (e) {

            self.getContactUsFormsData(this, ".ajax-container-lostproperty-form");

            e.preventDefault();
            return true;
        });

        // ajax btn additional
        $(document).on('click', '.do-ajax-btn-additional', function (e) {

            self.getContactUsFormsData(this, ".ajax-container-additional");
            e.preventDefault();
            return true;
        });



        // ajax btn
        $(document).on('click', '.do-room-type', function (e) {

            self.getRooms(this);
            e.preventDefault();
            return true;

        });

        // ajax btn
        $(document).on('click', '.do-room-details', function (e) {

            var nodeId = $(this).data("node");
            var parentSection = $(this).closest(".hotel_rooms");

            parentSection.html("");

            $.get(_root + "umbraco/surface/HotelExplorer/HotelExplorerRoomDetails", { node: nodeId }, function (result) {

                parentSection.html(result);
                if (AT.carouselControl) AT.carouselControl.buildInjectedCarousel();

            });

            e.preventDefault();
            return true;

        });

        /*$(document).on('click', '.day', function (e) {

            $("ul.waterPark li strong, ul.themePark li strong, .waterparkText strong, .themeparkText").each(function () {

                var value = $(this).html();
                var res = value.split("");

                res[2] = "A";
                res[3] = "M";

                if ($(this).html() != "Closed") {
                    $(this).html(res.join(""));
                }


            });

            e.preventDefault();
            return true;

        });*/


    }
}

var _global = new global();
_global.init();