import React, { Component } from 'react';
import axios from 'axios';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '../../../public/css/totalChart.css';

export default class TotalChart extends Component {
    constructor(){
        super();
        this.state = {
            goods: [],
            totalFirstStock: [],
            totalInStock: [],
            totalSellStock: [],
            totalFinalStock: []
        }
    }

    componentDidMount(){
        axios.get("http://localhost:8000/api/graphTotal")
        .then(result => {this.setState({goods: result.data})
            let sumFirst = [];
            let sumIn = [];
            let sumSell = [];
            let sumFinal = [];
            for (var i = 0; i < this.state.goods.length; i++) {
                if (this.state.goods[i].Stok_awal!=null) {
                    sumFirst.push(this.state.goods[i].Stok_awal)
                }
                if (this.state.goods[i].Stok_masuk!=null) {
                    sumIn.push(parseInt(this.state.goods[i].Stok_masuk))
                }
                if (this.state.goods[i].Stok_terjual!=null) {
                    sumSell.push(parseInt(this.state.goods[i].Stok_terjual))
                }
                if (this.state.goods[i].Stok_akhir!=null) {
                    sumFinal.push(this.state.goods[i].Stok_akhir)
                }
            }
            if(sumFirst!=0){
            sumFirst = sumFirst.reduce((total, amount) => total + amount);
                }
            if(sumIn!=0){
            sumIn = sumIn.reduce((total, amount) => total + amount);
                }
            if(sumSell!=0){
            sumSell = sumSell.reduce((total, amount) => total + amount);
                }
            if(sumFinal!=0){
            sumFinal = sumFinal.reduce((total, amount) => total + amount);
                }
            this.state.totalFirstStock = sumFirst;
            this.setState({totalFirstStock: sumFirst});
            this.state.totalInStock = sumIn;
            this.setState({totalInStock: sumIn});
            this.state.totalSellStock = sumSell;
            this.setState({totalSellStock: sumSell});
            this.state.totalFinalStock = sumFinal;
            this.setState({totalFinalStock: sumFinal});
            
        });
    }

    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBRow around>
                        <MDBCol size="3" className="totalFirstCard"><div className="totalNum">{this.state.totalFirstStock}</div>Total Stok Awal</MDBCol>
                        <MDBCol size="3" className="totalInCard"><div className="totalNum">{this.state.totalInStock}</div>Total Stok Masuk</MDBCol>
                        <MDBCol size="3" className="totalSellCard"><div className="totalNum">{this.state.totalSellStock}</div>Total Stok Terjual</MDBCol>
                        <MDBCol size="3" className="totalFinalCard"><div className="totalNum">{this.state.totalFinalStock}</div>Total Stok Akhir</MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}