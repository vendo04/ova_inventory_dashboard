<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class outHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $out = DB::table('transaction_details')
                ->join('transactions', function($join){
                $join->on('transaction_details.id_transaction','=','transactions.id_transaction')->where('transactions.type_transaction','=','keluar');})
                ->join('ova_goods', 'transaction_details.id_goods','=','ova_goods.id_goods')
                ->join('users', 'users.id_user','=','transactions.id_user')
                ->select('transaction_details.id_goods', 'transaction_details.total', 'transactions.date','ova_goods.name_goods', 'users.first_name')
                ->get();


        return response()->json($out);
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
}
