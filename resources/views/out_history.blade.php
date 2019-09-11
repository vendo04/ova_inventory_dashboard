<table>
	<tr>
		<th>ID Barang</th>
		<th>Nama Barang</th>
		<th>Jumlah Barang</th>
		<th>Tanggal</th>
		<th>Admin</th>
	</tr>
	@forelse($data as $row){
	<tr>
		<td>{{$row->id_goods}}</td>
		<td>{{$row->goods->name_goods}}</td>
		<td>{{$row->total}}</td>
		<td>{{$row->transaction->date}}</td>
		<td>{{$row->transaction->users->first_name}}</td>
	</tr>
	}
	@empty
		<p>Tidak ada riwayat keluar</p>
	@endforelse
</table>