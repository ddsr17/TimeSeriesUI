/**
 * Created by deepanshu on 27/8/15.
 */
/**
 * Created by deepanshu on 6/8/15.
 */

var URL = "http://104.199.135.236:9000/"
var metric = [];
var perform = [];
var inc = 0;
var flag=0;

function plot(response1)
{

    var game = JSON.parse(response1);

    var game2 = JSON.parse(game);
    var len = game2.header.length;
    if(game2){

        $('input[name="tagbool"]').attr('checked', false);
        document.getElementById('id1').value = "";
        document.getElementById('id2').value = "";
        document.getElementById('id3').value = "";
        $('.dropdown').find('option:first').attr('selected', 'selected');
        var len2 = game2.data.length;
        var taken = "";
        var obj = game2.data[0]
        var getKeys = function(obj){
            var keys = [];
            for(var key in obj){
                keys.push(key);
            }
            return keys;
        }
        var headers = getKeys(obj);
        console.log(headers);


        $(".basicTable").remove();
        mytable = $('<table border ="1"></table>').attr({ class: "basicTable" });
        var rows = len2
        var cols = len

        var tr = [];

        var row = $('<tr></tr>').attr({ class: ["class1", "class2", "class3"].join(' ') }).appendTo(mytable);
        for (var j = 0; j < cols; j++) {
            $('<th></th>').text(headers[j]).appendTo(row);
        }

        var tr = [];
        for (var i = 0; i < rows; i++) {
            var row = $('<tr></tr>').attr({ class: ["class1", "class2", "class3"].join(' ') }).appendTo(mytable);
            //for (var j = 0; j < cols; j++) {
            for (var token in game2.data[i]) {
                $('<td></td>').text(game2.data[i][token]).appendTo(row);

            }
        }
        mytable.appendTo("#hello");
    }



    $("#d1").html('');
    for(var i=0 ;i<=len;i++)
    {
        $("#d1").append('<input type = "checkbox" name = "getkey" value ="'+ game2.header[i]  +'">' + game2.header[i] + '<br>')
    }

    $("#d1").slimScroll({
        height: '250px',
        width: '150px'
    });


    $("#metric").html('');
    $("#metric").html('<h3>Metrics:</h3>')


    //var y = $("#met1")

    /* $(function call(){
     ++inc;
     $("#metric").append("<br>")
     $("#metric").append('<div id = "met1'+inc+'" class="dropdown">')
     $("#metric").append('<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Dropdown Example <span class="caret"></span></button><ul class="dropdown-menu">')
     for (var i = 0; i < len; i++) {
     $(".dropdown-menu").append('<li><a href="#">' + game2.header[i]  + '</a></li>')
     //  $("#'met1 + "+inc+"'").append("<option>" + game2.header[i] + "</option>")
     }
     $("#metric").append('</ul> </div>');

     $("#metric").append('<select id = "met2'+inc+'" class = "dropdown">')
     $("#met2"+inc).append("<option> sum </option>>")
     $("#met2"+inc).append("<option> max </option>>")
     $("#met2"+inc).append("<option> min </option>>")
     $("#met2"+inc).append("<option> count </option>>")
     $("#met2"+inc).append("<option> average </option>>")

     $("#metric").append('<div id  = "met3'+inc+'"></div>')
     $("#met3"+inc).append('<input type="button" name="increase" value="+" />')
     $("#met3"+inc).click(function(){

     var fot = document.getElementById("met1"+inc)
     metric.push(fot.options[fot.selectedIndex].text);
     var foo = document.getElementById("met2"+inc)
     perform.push(foo.options[foo.selectedIndex].text);
     call();
     })
     })*/

    $(function call() {

        ++inc;
        flag=1;
        $("#metric").append("<br>")
        $("#metric").append('<select id = "met1'+inc+'" class = "dropdown">')
        $("#met1"+inc).append("<option> Select Metric </option>")
        for (var i = 0; i < len; i++) {
            $("#met1"+inc).append("<option>" + game2.header[i] + "</option>")
            //  $("#'met1 + "+inc+"'").append("<option>" + game2.header[i] + "</option>")
        }
        //$("#metric").append(y);

        $("#metric").append('<select id = "met2'+inc+'" class = "dropdown">')
        $("#met2"+inc).append("<option> Function </option>>")
        $("#met2"+inc).append("<option> sum </option>>")
        $("#met2"+inc).append("<option> max </option>>")
        $("#met2"+inc).append("<option> min </option>>")
        $("#met2"+inc).append("<option> count </option>>")
        $("#met2"+inc).append("<option> average </option>>")

        $("#met1"+inc).change(function() {
            var fot = document.getElementById("met1" + inc)
            metric.push(fot.options[fot.selectedIndex].text);
        })
        $("#met2"+inc).change(function()
        {
            var foo = document.getElementById("met2" + inc)
            perform.push(foo.options[foo.selectedIndex].text);
        })
        $("#metric").append('<div id  = "met3'+inc+'"></div>')
        $("#met3"+inc).append('<input type="button" name="increase" value="+" />')
        $("#met3"+inc).click(function(){

            call();
        })
    })

    if(inc===0)
        call();
}

function clicked(thame) {

    var keyval = $(thame).text();
    //console.log(keyval)
    $("#table").html("");

    var some = {"indexname": keyval, "name": "dummy"};
    $.ajax({
        type: "POST",
        url: URL + "getalldata",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(some),
        success: function (response) {

            plot(response)
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //console.log("errorThrown -->",errorThrown);
            //console.log("XMLHttpRequest -->",XMLHttpRequest);
            //console.log("textStatus -->",textStatus);
            console.log("some error");
        }

    });
}

$(document).ready(function(){

    $.ajax({
        method: "GET",
        url: URL+"getallindex"
    })
        .done(function (data) {
            var next = JSON.parse(data);
            $.each(next, function (index, value) {

                $('#ind').append('<li class = "enter">'+ value+'</li>');
            })

            $(".enter").on("click",function(data){

                clicked(this)

            });
        });


    $("#button").click(function() {

        var g = {};
        for(var i = 0; i< metric.length ; i++)
        {
            g[metric[i]] = perform[i];
        }

        var favorite = [];
        $.each($("input[name='getkey']:checked"), function(){
            favorite.push($(this).val());
        });
        var z = document.getElementById("drop");//dropdown
        var a = z.options[z.selectedIndex].text;
        var b = $("input:radio[name='tagbool']:checked").val();//radio

        var h = document.getElementById("id1").value;//textbox
        var c = document.getElementById("id2").value;
        var d = document.getElementById('id3').value;
        var e = document.getElementById('id4').value;

        var obj = {
            "dimension":["accountId","applicationId","serviceId"],
            "metrics":{
                "clientSRTT":"sum"
            },
            "time":"Normal_time",
            "tvalue":"120",
            "tagbool":"1",
            "tagrangefrom":"1425959984737",
            "tagrangeto":"1425959997529",
            "stddevparameter":"3"
        }

        var _paramdata = 'index=' + JSON.stringify(obj)

        var _paramdata1 = {
            "dimension": favorite,
            "metrics": g,
            "time": a,
            "tvalue":h,
            "tagBool": b,
            "tagRangeFrom": c,
            "tagRangeTo": d,
            "stdDevParameter": e
        };

        console.log(_paramdata1)
/*        $.ajax({
            method: "POST",
            url: "http://104.155.205.176:8090/jobs?appName=test2&classPath=S4&context=foo3",
            dataType: String,
            data: _paramdata,
            complete: function(resp){
                alert("hello");
                console.log(resp);
            }
        })*/

        $.ajax({
            method: "GET",
            url: URL + "plotgraph",
            success: function (response) {

                alert("called")
                var data = JSON.parse(response);

                var annotations = [];
                var dataarr = [];
                $.each(data, function (index, value) {
                    var _tmp = [];

                    var a = new Date(value.timestamp*1000);
                    //    console.log(a);
                    var b = new Number(value.AverageofclientSRTT);

                    var one = value.AverageofclientSRTT_global_anomaly;
                    var two = value.Tag_hour_anomalyof_AverageofclientSRTT;
                    var three = value.anomalyof_AverageofclientSRTT_over_windowtimestamp;


                    if(one == 1) {
                        annotations.push({
                            series: 'AverageofclientSRTT',
                            x: value.timestamp*1000,
                            shortText: 'F',
                            text: 'AverageofclientSRTT_global_anomaly'
                        });
                    }

                    if(two == 1) {
                        annotations.push({
                            series: 'AverageofclientSRTT',
                            x: value.timestamp*1000,
                            shortText: 'F',
                            text: 'Tag_hour_anomalyof_AverageofclientSRTT'
                        });
                    }

                    if(three == 1) {
                        annotations.push({
                            series: 'AverageofclientSRTT',
                            x: value.timestamp*1000,
                            shortText: 'F',
                            text: 'anomalyof_AverageofclientSRTT_over_windowtimestamp'
                        });
                    }

                    _tmp.push(a);
                    _tmp.push(b);
                    dataarr.push(_tmp);
                });

                dataarr.sort(comparefirstcolumn);

                function comparefirstcolumn(a, b) {
                    if (a[0] === b[0])
                        return 0;
                    else
                        return (a[0] < b[0]) ? -1 : 1;
                }

                //console.log(annotations);

                g = new Dygraph(document.getElementById("requestgraph1"),
                    dataarr,
                    {
                        labels: [ "timestamp", "AverageofclientSRTT"],
                        showRangeSelector: true,
                        title: 'Anomaly in AverageClientSRTT',
                        axisLabelColor: 'blue'
                    }
                );


                g.ready(function() {
                    g.setAnnotations(annotations);
                });

            }
        })

    })
});