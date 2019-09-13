import React, {Component} from 'react';
import axios from 'axios';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import 'mdbreact/dist/mdbreact';
import { MDBDataTable } from 'mdbreact';
import { CSVLink } from "react-csv";

class DatatablePage extends Component{
    constructor(){
        super();
        this.state = {
        goods:[],
         data: {
                columns:[
                    {
                        label:"Id Barang",
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
                    {
                        label:"Admin",
                        field:"first_name",
                        key: "first_name"
                    },
                ],
                rows: null
            }
        }
    }

    componentDidMount(){
        axios.get("http://localhost:8000/api/outHistory")
        .then(response => {this.setState({goods: response.data})

            let rows_data = [];
            for (var i=0; i<this.state.goods.length; i++){
                if(this.state.goods[i]){
                    rows_data.push({
                        id_goods : this.state.goods[i].id_goods,
                        name_goods : this.state.goods[i].name_goods,
                        total : this.state.goods[i].total,
                        date : this.state.goods[i].date,                
                        first_name : this.state.goods[i].first_name,
                    })
                }
            }

            this.state.data.rows = rows_data;
            this.setState({rows: rows_data});

            console.log(this.state.data.rows);
        });
    }

    render(){
      return (
        <>
            <h2><strong>RIWAYAT KELUAR</strong></h2>

            {this.state.data.rows && (
                <CSVLink
                    data={this.state.data.rows}
                    headers={this.state.data.columns}
                    separator={";"} 
                    filename={"outHistory.csv"}
                    className="btn btn-primary btn-sm"
                    target="_blank">
                <FontAwesomeIcon icon={faDownload}/>
                </CSVLink>
            )}

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
                    exportToCSV
                    order={['id_goods', 'asc']}
                    entries={5}
                    entriesOptions={[ 5, 10, 20, 50, 100 ]}
                    data={this.state.data}
                    sorting={true}
                />
            )}
        </>
      );
    }
}

export default DatatablePage;