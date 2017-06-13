import $ from 'jquery';

export default class IzdelajTabelo {
	constructor () {
		this.tabelaSklop = $('.zadetki-sklop__tabela');
		this.tabelaObcina = $('.zadetki-obcina__tabela');
		this.tabelaProjekt = $('.zadetki-projekt__tabela');

	}

	napolniTabelo (rezultat, cilj) {
		var that = this;
		

		if (cilj == 'sklop') {
			that.sklop(rezultat);

		} else if (cilj == 'obcina') {
			that.obcina(rezultat);
		} else {
			that.projekt(rezultat);

		}
	}

	sklop ( rezultat ) {
		var that = this;
		var stRezultatov = rezultat.length - 0;

		if (stRezultatov > 0) {
			// console.log(Object.keys(rezultat[0]).length);
			var naslovi = Object.keys(rezultat[0]);
			var stElementov = Object.keys(rezultat[0]).length;

			that.tabelaSklop.append('<div class="tabela tabela__sklop--naslov"></div>');

			$.each(naslovi, function(index, value) {
				$('.tabela__sklop--naslov').append('<div class="tabela tabela__sklop--naslov--td tabela__sklop--naslov--td ' + value + '">' + value + '</div>');
			});


			for (var i = 0; i < stRezultatov; i++) {
				that.tabelaSklop.append('<div class="tabela tabela__sklop--rezultati tabela__sklop--rezultati-' + i + ' tabela__sklop-vrstica"></div>');
				$.each(naslovi, function(index, value) {
					if (value == 'cena') {
						rezultat[i][value] = rezultat[i][value].toLocaleString();
					}

					$('.tabela__sklop--rezultati-' + i).append('<div class="tabela tabela__sklop--rezultati--td tabela__sklop--rezultati ' + value + '">' + rezultat[i][value] + '</div>');
				});
				// that.tabelaSklop.append('<div class="tabela tabela__sklop">' + rezultat[0].cena + '</div>');
				
			}

		}

	}

	obcina ( rezultat ) {
		var that = this;
		var stRezultatov = rezultat.length - 0;

		if (stRezultatov > 0) {
			// console.log(Object.keys(rezultat[0]).length);
			var naslovi = Object.keys(rezultat[0]);
			var stElementov = Object.keys(rezultat[0]).length;

			that.tabelaObcina.append('<div class="tabela tabela__obcina--naslov"></div>');

			$.each(naslovi, function(index, value) {
				$('.tabela__obcina--naslov').append('<div class="tabela tabela__obcina--naslov--td tabela__obcina--naslov--td ' + value + '">' + value + '</div>');
			});


			for (var i = 0; i < stRezultatov; i++) {
				that.tabelaObcina.append('<div class="tabela tabela__obcina--rezultati tabela__obcina--rezultati-' + i + ' tabela__sklop-vrstica"></div>');
				$.each(naslovi, function(index, value) {
					if (value == 'cena') {
						rezultat[i][value] = rezultat[i][value].toLocaleString();
					}

					$('.tabela__obcina--rezultati-' + i).append('<div class="tabela tabela__obcina--rezultati--td tabela__obcina--rezultati ' + value + '">' + rezultat[i][value] + '</div>');
				});
				// that.tabelaSklop.append('<div class="tabela tabela__sklop">' + rezultat[0].cena + '</div>');
				
			}

		}

	}

	projekt ( rezultat ) {
		var that = this;
		var stRezultatov = rezultat.length - 0;

		if (stRezultatov > 0) {
			// console.log(Object.keys(rezultat[0]).length);
			var naslovi = Object.keys(rezultat[0]);
			var stElementov = Object.keys(rezultat[0]).length;

			that.tabelaProjekt.append('<div class="tabela tabela__projekt--naslov"></div>');

			$.each(naslovi, function(index, value) {
				$('.tabela__projekt--naslov').append('<div class="tabela tabela__projekt--naslov--td tabela__projekt--naslov--td ' + value + '">' + value + '</div>');
			});


			for (var i = 0; i < stRezultatov; i++) {
				that.tabelaProjekt.append('<div class="tabela tabela__projekt--rezultati tabela__projekt--rezultati-' + i + ' tabela__sklop-vrstica"></div>');
				$.each(naslovi, function(index, value) {
					if (value == 'cena') {
						rezultat[i][value] = rezultat[i][value].toLocaleString();
					}

					$('.tabela__projekt--rezultati-' + i).append('<div class="tabela tabela__projekt--rezultati--td tabela__projekt--rezultati ' + value + '">' + rezultat[i][value] + '</div>');
				});
				// that.tabelaSklop.append('<div class="tabela tabela__sklop">' + rezultat[0].cena + '</div>');
				
			}

		}

	}


}

