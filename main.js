window.addEventListener('load', setup);

//Pull Data from API
$.ajax({
    url: "https://covidtracking.com/api/v1/us/current.json", success: function (result) {

        //Format Numbers
        function formatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') //Code Referenced from https://blog.abelotech.com/posts/number-currency-formatting-javascript/
        }
        const totalCases = formatNumber(result[0].positive);
        const recovered = formatNumber(result[0].recovered);
        const negativeCases = formatNumber(result[0].negative);
        const totalTested = formatNumber(result[0].totalTestResults);

        //Append to HTML
        $("#totalCases").html(totalCases);
        $("#recovered").html(recovered);
        $("#negativeCases").html(negativeCases);
        $("#totalTested").html(totalTested);
        $("#lastModified").html(result[0].lastModified);
    }
});

//Get COVID Data
async function getData() {
    const response = await this.fetch('daily.csv');
    const data = await response.text();
    const xLabels = [];
    const yLabels = [];
    const table = data.split('\n').slice(1);
    table.forEach(row => {
        const columns = row.split(',');
        const date = columns[0];
        xLabels.push(date);
        const numCases = columns[2];
        yLabels.push(numCases);


    });
    return { xLabels, yLabels };
}

//Plot Data
async function setup() {
    const data = await getData();
    const ctx = document.getElementById('dailyCases').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xLabels,
            datasets: [{
                label: 'Total # of Cases',
                data: data.yLabels,
                fill: false,
                pointRadius: 1,

                maintainAspectRatio: true,
                backgroundColor:
                    'rgba(255, 99, 132, 0.2)'
                ,
                borderColor:
                    'rgba(255, 99, 132, 1)'
                ,
                maintainAspectRatio: false,
                borderWidth: 2,
                pointRadius: 2,
                responsive: true
            }]
        },
    });
}
