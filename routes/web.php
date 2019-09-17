<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
/*
Route::get('/', function () {
    return view('welcome');
});
*/

Route::get('/dashboard', function(){
	return view('dashboard');
});

Route::resource('api/graphTotal', 'graphTotalController');

Route::resource('api/inHistory', 'inHistoryController');

Route::resource('api/outHistory', 'outHistoryController');

Route::resource('api/stockReport', 'stockReportController');