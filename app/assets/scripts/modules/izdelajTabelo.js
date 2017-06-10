import $ from 'jquery';

class IzdelajTabelo {
	constructor (rezultat) {
		this.tabelaSklop = $('.zadetki-sklop__tabela');
		this.napolniSklop(rezultat);
		this.rezultat = rezultat;
		// console.log('rezultat ' + this.rezultat);
	}

	napolniSklop (rezultat) {
		var that = this;
		console.log(rezultat);
		// that.tabelaSklop.on('load', function(){
		that.tabelaSklop.append('<p>test</p>');
		// });
	}


}

export default IzdelajTabelo;