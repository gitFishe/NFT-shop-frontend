import {dataTabs, underline, fadeIn, fadeOut} from "../main.js";

$(document).ready(function() {
    underline($('.nft__tabs-elem'))
    dataTabs($('.nft__tabs-elem'), $('.nft__pages-elem'), 300)

    showSettings()
    createChart()
})

function showSettings() {

    let button = $('.nft__settings');
    let menu = $('.nft__settings-menu');

    let canClose = false;

    function showMenu() {
        fadeIn(menu, 200);
        button.addClass('show');
        canClose = true;
    }

    function hideMenu() {
        fadeOut(menu, 200);
        button.removeClass('show');
        canClose = false;
    }

    button.click(function(event) {
        event.stopPropagation();
        if (button.hasClass('show') && canClose) {
            hideMenu();
        } else {
            showMenu();
        }
    });

    $(document).click(function(event) {
        event.stopPropagation();
        // Проверить, кликнут ли элемент вне .nft__settings
        if (!$(event.target).closest('.nft__settings').length && canClose) {
            hideMenu();
        }
    });
}

function createChart() {
    var ctx = $('#myChart')[0].getContext('2d');

    // Создание градиента
    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(70,138,247,1)");
    gradient.addColorStop(0.15, "rgba(88,152,249,1)");
    gradient.addColorStop(0.28, "rgba(111,169,250,1)");
    gradient.addColorStop(0.39, "rgba(130,183,251,1)");
    gradient.addColorStop(0.5, "rgba(153,200,254,1)");
    gradient.addColorStop(0.6, "rgba(166,207,253,1)");
    gradient.addColorStop(0.7, "rgba(182,216,254,1)");
    gradient.addColorStop(0.8, "rgba(196,223,253,1)");
    gradient.addColorStop(0.9, "rgba(208,229,253,1)");
    gradient.addColorStop(1, "rgba(216,233,254,1)");

    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Sample Data',
                data: [2, 2, 10, 5, 5, 4,10,5,2,5,10,10],
                backgroundColor: '#05121b',
                borderColor: '#91c2fd',
                borderWidth: 3,
                pointRadius:12,
                pointHoverRadius:12,
                pointHoverBorderWidth:2,
                hoverBackgroundColor: gradient,

                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {

                tooltip: {
                    enabled: false, // Отключить стандартный tooltip
                    external: function(context) {
                        // Создание кастомного tooltip
                        var tooltipEl = document.getElementById('chartjs-tooltip');

                        // Создание элемента, если он не существует
                        if (!tooltipEl) {
                            tooltipEl = document.createElement('div');
                            tooltipEl.id = 'chartjs-tooltip';
                            tooltipEl.innerHTML = '<table></table>';
                            document.body.appendChild(tooltipEl);
                        }

                        // Скрыть tooltip, если нет видимой информации
                        var tooltipModel = context.tooltip;
                        if (tooltipModel.opacity === 0) {
                            tooltipEl.style.opacity = 0;
                            return;
                        }

                        // Установить текст для tooltip
                        if (tooltipModel.body) {
                            var titleLines = tooltipModel.title || [];
                            var bodyLines = tooltipModel.body.map(function(bodyItem) {
                                return bodyItem.lines[0].split(': ')[1];
                            });

                            var innerHtml = '';

                            innerHtml += '<tbody>';

                            bodyLines.forEach(function(body, i) {
                                innerHtml += '<tr><td>' + body + ' USD</td></tr>';
                            });

                            innerHtml += '</tbody>';

                            var tableRoot = tooltipEl.querySelector('table');
                            tableRoot.innerHTML = innerHtml;
                        }

                        var position = context.chart.canvas.getBoundingClientRect();

                        // Позиционирование tooltip
                        tooltipEl.style.opacity = 1;
                        tooltipEl.style.position = 'absolute';
                        tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                        tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                        tooltipEl.style.pointerEvents = 'none';
                        tooltipEl.style.transform = 'translate(-50%, -150%)';
                    }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false,
                    },
                },
            }
        }
    });
}



function getNftData() {
    let data = $.cookie('token')
    console.log(data)

    $(document).ajaxStop(function() {
        fadeIn($('.nft__main'),200, 'flex')
        console.log('stop')
    })

    const urlParams = new URLSearchParams(window.location.search);
    const hash = urlParams.get('hash');

    $.ajax({
        "url": `http://localhost:5000/api/nftEntity/get/${hash}`,
        "method": "GET",
        "timeout": 0,
        success: function(msg) {
            console.log(msg);

            $('.nft__buttons')



            $('#nftName').text(msg[0].name)
            $('#nftDescr').text(msg[0].description)
            $('#nftPrice').text(msg[0].price)
            $('#nftImg').attr("src",`http://localhost:5000/${msg[0].image}`)
        },
        error: function(msg) {
            console.log(msg);
            msg.responseJSON.errors.forEach((error) => {
                console.error(error.msg);
            });
        }
    });
}
getNftData()


function buyNft() {
    let token = $.cookie('token')



    const urlParams = new URLSearchParams(window.location.search);
    const hash = urlParams.get('hash');
    let form = new FormData();
    form.append("hash",hash)



    $.ajax({
        "url": "http://localhost:5000/api/nftEntity/buy",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": `Bearer ${token}`
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form,

        success: function(msg) {
            console.log(msg);

        },
        error: function(msg) {
            console.log(msg);
            msg.responseJSON.errors.forEach((error) => {
                console.error(error.msg);
            });
        }
    });
}

buyNft()