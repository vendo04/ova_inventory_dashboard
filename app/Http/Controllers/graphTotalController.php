<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App;

class graphTotalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $commodities = App\Goods::get();
        $map = array();
        foreach($commodities as $commodity){
            $stock_in = $this->getTotalTransaksiInById($commodity->id_goods);
            $stock_out = $this->getTotalTransaksiOutById($commodity->id_goods);
            $stock_akhir = $stock_in - $stock_out;
            $stock_awal = $stock_akhir + $stock_out;
            $tmp = [
                "Id_item" => $commodity->id_goods,
                "Item_name" => $commodity->name_goods,
                "Stok_awal" => $stock_awal,
                "Stok_masuk" => $stock_in,
                "Stok_terjual" => $stock_out,
                "Stok_akhir" => $stock_akhir
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
