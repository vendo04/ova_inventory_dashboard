import React, { Component } from 'react';
import axios from 'axios';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import 'mdbreact/dist/mdbreact';
import { MDBDataTable } from 'mdbreact';
import {parse, isWithinInterval } from 'date-fns';

export default class StockReport extends Component {
    constructor(){
        super();
        this.state = {
            rangeOfDate: {
                startDate: null,
                endDate: null
            },
            data: {
                columns:[
                    {
                        label:"ID Barang",
                        field:"id_goods",
                        key: "id_goods"
                    },
                    {
                        label:"Nama Barang",
                        field:"name_goods",
                        key: "name_goods"
                    },
                    {
                        label:"Jumlah Barang",
                        field:"total",
                        key: "total"
                    },
                    {
                        label:"Tanggal",
                        field:"date",
                        key: "date"
                    },
                ],
                rows: null
            },
            dataTampungan: {
                columns:[
                    {
                        label:"ID Barang",
                        field:"id_goods",
                        key: "id_goods"
                    },
                    {
                        label:"Nama Barang",
                        field:"name_goods",
                        key: "name_goods"
                    },
                    {
                        label:"Jumlah Barang",
                        field:"total",
                        key: "total"
                    },
                    {
                        label:"Tanggal",
                        field:"date",
                        key: "date"
                    },
                ],
                rows: null
            },
            filterBool: false
        }
        this.handleSelect = this.handleSelect.bind(this);
        this.filterDate = this.filterDate.bind(this);
        this.filterClear = this.filterClear.bind(this);
    }

    componentDidMount(){
        axios.get("http://localhost:8000/api/stockReport")
        .then(result => {this.setState({goods: result.data})
            let data=[];
            for (var i = 0; i < this.state.goods.length; i++) {
                data.push({
                    id_goods : this.state.goods[i].id_goods,
                    name_goods : this.state.goods[i].name_goods,
                    total : this.state.goods[i].total,
                    date : this.state.goods[i].date
                })
            }
            this.state.data.rows = data;
            this.setState({rows: data});
            this.state.dataTampungan.rows = data;
            this.setState({rows: data});
        });
    }

    handleSelect(ranges){
        // let startDate = format((ranges.selection.startDate), 'yyyy-MM-dd');
        // let endDate = format((ranges.selection.endDate), 'yyyy-MM-dd');
        let startDates = ranges.selection.startDate;
        let endDates = ranges.selection.endDate;
        this.state.rangeOfDate.startDate = startDates;
        this.setState({startDate: startDates});
        this.state.rangeOfDate.endDate = endDates;
        this.setState({endDate: endDates});
    }

    filterDate(){
        console.log(this.state.rangeOfDate);

        let data=[];
        for (var i = 0; i < this.state.dataTampungan.rows.length; i++) {
            if(isWithinInterval(parse(this.state.dataTampungan.rows[i].date, 'yyyy-MM-dd', new Date()), 
            {start: this.state.rangeOfDate.startDate, end: this.state.rangeOfDate.endDate})){
                data.push({
                    id_goods : this.state.dataTampungan.rows[i].id_goods,
                    name_goods : this.state.dataTampungan.rows[i].name_goods,
                    total : this.state.dataTampungan.rows[i].total,
                    date : this.state.dataTampungan.rows[i].date
                })
            }     
        }
        this.state.dataTampungan.rows = data;
        this.setState({rows: data});
        console.log(this.state.dataTampungan.rows);

        this.setState({filterBool: true});
    }

    filterClear(){
        let data=[];
        for (var i = 0; i < this.state.data.rows.length; i++) {
                data.push({
                    id_goods : this.state.data.rows[i].id_goods,
                    name_goods : this.state.data.rows[i].name_goods,
                    total : this.state.data.rows[i].total,
                    date : this.state.data.rows[i].date
                })
        }
        this.state.dataTampungan.rows = data;
        this.setState({rows: data});
        console.log(this.state.dataTampungan.rows);

        this.setState({filterBool: false});
    }
    
    render(){
        const selectionRange = {
			startDate: new Date(),
			endDate: new Date(),
			key: 'selection',
        }
        if ( this.state.filterBool == true ) {
            return (
                <>
                    <DateRangePicker
                        ranges={[selectionRange]}
                        onChange={this.handleSelect}
                    />

                    <input type="submit" 
                    value="Clear"
                    onClick={this.filterClear}/>

                    {this.state.dataTampungan.rows && ( 
                        <MDBDataTable
                            theadColor="blue"
                            striped
                            bordered
                            hover
                            entriesLabel="Baris tabel"
                            searchLabel="Pencarian"
                            infoLabel={["Menampilkan", "sampai", "dari", "baris"]}
                            paginationLabel={["Sebelumnya", "Selanjutnya"]}
                            order={['id_goods', 'asc']}
                            entries={5}
                            entriesOptions={[ 5, 10, 20, 50, 100 ]}
                            data={this.state.dataTampungan}
                            sorting={this.state.sorting}
                        />
                    )}
                    
                </>
            );
        } else if( this.state.filterBool == false) {
            return (
                <>
                    <DateRangePicker
                        ranges={[selectionRange]}
                        onChange={this.handleSelect}
                    />

                    <input type="submit" 
                    value="Filter"
                    onClick={this.filterDate}/>
                    
                    {this.state.data.rows && ( 
                        <MDBDataTable
                            theadColor="blue"
                            striped
                            bordered
                            hover
                            entriesLabel="Baris tabel"
                            searchLabel="Pencarian"
                            infoLabel={["Menampilkan", "sampai", "dari", "baris"]}
                            paginationLabel={["Sebelumnya", "Selanjutnya"]}
                            order={['id_goods', 'asc']}
                            entries={5}
                            entriesOptions={[ 5, 10, 20, 50, 100 ]}
                            data={this.state.data}
                            sorting={this.state.sorting}
                        />
                    )}
                </>
            );
        }
    }
}