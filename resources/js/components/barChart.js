import React, { Component } from 'react';
import Highcharts from 'highcharts' ;
import highchartsStock from 'highcharts/modules/stock';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

highchartsStock(Highcharts);

export default class BarChart extends Component {
    constructor(){
        super();
        this.state = {
            goods: [],
            chartOptions: {
                chart: {
                    type: 'bar'
                },
                title:{
                    text: 'Stok Barang',
                    style: {'fontSize' : "29px"}
                },
                legend:{
                    itemDistance: 100
                },
                xAxis: {
                    categories: null,
                    title: {text: 'Nama Barang'},
                    min: 0,
                    max: 4, 
                    scrollbar: {
                        enabled: true
                    },
                    tickLength: 0
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Jumlah Barang',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                series: [{
                    name: 'Stok Awal',
                    data: null
                }, {
                    name: 'Stok Masuk',
                    data: null
                }, {
                    name: 'Stok Terjual',
                    data: null
                }, {
                    name: 'Stok Akhir',
                    data: null
                }]
            }
        };
        
    }

    componentDidMount(){
        axios.get("http://localhost:8000/api/graphTotal")
        .then(result => {this.setState({goods: result.data})
        let goodsName =[]; //Nama Barang
        let firstStock = []; //Stok Awal
        let inStock = []; //Stok Masuk 
        let sellStock = []; //Stok Terjual
        let finalStock = []; //Stok Akhir
        for (var i = 0; i < this.state.goods.length; i++) {
            if (this.state.goods[i].Item_name) {
                goodsName.push(this.state.goods[i].Item_name)
            }
            if (this.state.goods[i].Stok_awal) {
              firstStock.push(this.state.goods[i].Stok_awal)
            }
            if (this.state.goods[i].Stok_masuk) {
                inStock.push(parseInt(this.state.goods[i].Stok_masuk))
            }
            if (this.state.goods[i].Stok_terjual) {
                sellStock.push(parseInt(this.state.goods[i].Stok_terjual))
            }
            if (this.state.goods[i].Stok_akhir) {
                finalStock.push(this.state.goods[i].Stok_akhir)
            }
          }
        this.state.chartOptions.xAxis.categories = goodsName;
        this.setState({categories: goodsName});
        this.state.chartOptions.series[0].data = firstStock;
        this.setState({data: firstStock});
        this.state.chartOptions.series[1].data = inStock;
        this.setState({data: inStock});
        this.state.chartOptions.series[2].data = sellStock;
        this.setState({data: sellStock});
        this.state.chartOptions.series[3].data = finalStock;
        this.setState({data: finalStock});
        });
    }

    render() {
        return (
            <div>
                {this.state.chartOptions.series[3].data && (
                    <HighchartsReact 
                        highcharts={Highcharts} 
                        options={this.state.chartOptions}/>
                         )}     
            </div>
        );
    }
}