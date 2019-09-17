<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App;

class stockReportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $map = array();

        $reports = App\Transaction_Detail::join('transactions', 'transaction_details.id_transaction', '=', 'transactions.id_transaction')
        ->join('ova_goods', 'transaction_details.id_goods', '=', 'ova_goods.id_goods')
        ->select('transaction_details.id_goods', 'ova_goods.name_goods', '.transactions.date')
        ->distinct()
        ->get();

        foreach($reports as $report){
            $stock_in = $this->getTotalTransaksiInById($report->id_goods);
            $stock_out = $this->getTotalTransaksiOutById($report->id_goods);
            $stock_akhir = $stock_in - $stock_out;

            $id_goods = $report->id_goods;
            $name_goods = $report->name_goods;
            $total = $stock_akhir;
            $date = $report->date;
            $tmp = [
                "id_goods" => $id_goods,
                "name_goods" => $name_goods,
                "total" => $total,
                "date" => $date
            ];
            array_push($map, $tmp);
        }

        return response()->json($map);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function getTotalTransaksiOutById($id)
    {
        $total = App\Transaction_Detail::where('id_goods','=',$id)
        ->join('transactions','transaction_details.id_transaction','transactions.id_transaction')
        ->where('transactions.type_transaction','Keluar')->sum('total');
    return $total;
    }

    public function getTotalTransaksiInById($id)
    {
        $total = App\Transaction_Detail::where('id_goods','=',$id)
        ->join('transactions','transaction_details.id_transaction','transactions.id_transaction')
        ->where('transactions.type_transaction','Masuk')->sum('total');
    return $total;
    }
}
