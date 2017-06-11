import $ from 'jquery';

export default class IzdelajTabelo {
	constructor () {
		this.tabelaSklop = $('.zadetki-sklop__tabela');
		// this.napolniSklop(rezultat);
		// this.rezultat = rezultat;
		// console.log('rezultat ' + this.rezultat);
	}

	napolniSklop (rezultat) {
		var that = this;
		var stRezultatov = rezultat.length - 1;

		if (stRezultatov > 0) {
			console.log(Object.keys(rezultat[0]).length);
			var naslovi = Object.keys(rezultat[0]);
			var stElementov = Object.keys(rezultat[0]).length;

			that.tabelaSklop.append('<div class="tabela tabela__sklop--naslov"></div>');

			for (var i = 0; i < stElementov; i++) {
				that.tabelaSklop.append('<div class="tabela tabela__sklop--naslov--td">' + rezultat[0].cena + '</div>');
			}

			for (var i = 0; i < stRezultatov; i++) {
				that.tabelaSklop.append('<div class="tabela tabela__sklop">' + rezultat[0].cena + '</div>');
				
			}

		}

	}

	sestaviTabelo (arrElementov) {

	}


}

