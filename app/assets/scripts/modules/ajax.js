import $ from 'jquery';
import io from 'socket.io-client';
import it from './izdelajTabelo';


let izdelajTabelo = new it();


class Ajax {
	constructor() {
		this.sklop = $('.zadetki-sklop__tabela');
		this.obcina = $('.zadetki-obcina__tabela');
		this.projekt = $('.zadetki-projekt__tabela');
		this.btnIsci = $('.btn__isci');
		this.insklop = $('.input__sklop');
		this.intekst = $('.input__tekst');
		this.vnesiVtabelo(this.sklop); //samo za prvi prikaz - navodilo za vnos v polja
		this.events();
	}

	events() {
		var that = this;
		
		that.btnIsci.click(function(){
			var sklopVsebina = that.insklop.val().trim();
			var tekstVsebina = that.intekst.val().trim();
			// console.log('klik ' + sklopVsebina + ' ' + tekstVsebina);
			that.sklop.empty();
			that.obcina.empty();
			that.projekt.empty();

			that.posljiPoizvedbo(sklopVsebina, tekstVsebina);
			
		});
	}

	posljiPoizvedbo(sklpVsebina, tkstVsebina) {
		var that = this;

		var socket = io.connect('http://192.168.112.200:8888');
		var arrRezultat = [];
		var arrRezultatObcina = [];
		var arrRezultatProjekt = [];

		// var sklopKonec = 0;
		// var obcinaKonec = 0;
		// var projektKonec = 0;
		var konec = 0;

		function koncaj () {
			konec += 1;

			if (konec == 3) {
				socket.emit('zapriSejo');
			}
		}

		// console.log('klik 12 ' + sklpVsebina + ' ' + tkstVsebina);

		socket.emit('vodovodKoroska', {
			sklop: sklpVsebina,
			tekst: tkstVsebina
		});

		socket.on('vodovodKoroskaVrnjeno', function(data){
			// console.log(data);
			arrRezultat.push(data);
		});

		socket.on('vodovodKoroskaZadnjaVrstica', function(data){ //data je v tem primeru samo 'konec'
			
			arrRezultat.push(data);
			// console.log(data);
			izdelajTabelo.napolniTabelo(arrRezultat, 'sklop');

			koncaj();
			// socket.emit('zapriSejo');
		});

		socket.on('vodovodKoroskaObcinaVrnjeno', function(data){
			// console.log(data);
			arrRezultatObcina.push(data);
		});

		socket.on('vodovodKoroskaZadnjaVrsticaObcina', function(data){ //data je v tem primeru samo 'konec'
			
			arrRezultatObcina.push(data);
			// console.log(data);
			izdelajTabelo.napolniTabelo(arrRezultatObcina, 'obcina');

			koncaj();
			// socket.emit('zapriSejo');
		});

		socket.on('vodovodKoroskaProjektVrnjeno', function(data){
			// console.log(data);
			arrRezultatProjekt.push(data);
		});

		socket.on('vodovodKoroskaZadnjaVrsticaProjekt', function(data){ //data je v tem primeru samo 'konec'
			
			arrRezultatProjekt.push(data);
			// console.log(data);
			izdelajTabelo.napolniTabelo(arrRezultatProjekt, 'projekt');

			koncaj();
			// socket.emit('zapriSejo');
		});


	}

	vnesiVtabelo(trgt) {
		trgt.append('<p>V prvo polje vnesi sklop oz prvi del wbs-a. Npr. 2.1 za "Sklop 12 Muta - Gortina in Muta - Radlje od Dravi</p><p>V drugo polje vnesi celoten tekst postavke, ki jo iščeš ... potem klikni Išči ali pritini Enter</p>');
	}

}

export default Ajax;