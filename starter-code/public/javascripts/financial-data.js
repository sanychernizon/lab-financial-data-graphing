var inicialDate = document.querySelector('#inicialDate');
var finalDate = document.querySelector('#finalDate');
var currency = document.querySelector('#currency');
var btn = document.querySelector('#btn')

console.log(inicialDate)

function updateData() {
    var iDate = inicialDate.value;
    var fDate = finalDate.value;
    // var currencyValue = currency.value;

    axios.get(`http://api.coindesk.com/v1/bpi/historical/close.json?start=${iDate}&end=${fDate}`)
        .then(function (response) {
            var keysNames = Object.keys(response.data.bpi);
            var coins = Object.values(response.data.bpi);
            console.log(coins)

            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: keysNames,
                    datasets: [{
                        label: 'Bitcoin Price Index',
                        data: coins,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
            console.log(response.data);
            console.log(myChart)
        })
        .catch(function (error) {
            console.log(error);
        });

}

btn.addEventListener('click', updateData)