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
		this.maxPodobnostSklop = $('.razlaga__odstotek-sklop');
		this.maxPodobnostObcina = $('.razlaga__odstotek-obcina');
		this.maxPodobnostProjekt = $('.razlaga__odstotek-projekt');

		this.maxCenaSklop = $('.razlaga__cena-sklop');
		this.maxCenaObcina = $('.razlaga__cena-obcina');
		this.maxCenaProjekt = $('.razlaga__cena-projekt');

		this.avgCenaSklop = $('.razlaga__povprecje-sklop');
		this.avgCenaObcina = $('.razlaga__povprecje-obcina');
		this.avgCenaProjekt = $('.razlaga__povprecje-projekt');

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

		var konec = 0;

		function koncaj () {
			konec += 1;

			// console.log(konec);

			if (konec == 6) {
				socket.emit('zapriSejo');
			}
		}

		socket.emit('vodovodKoroska', {
			sklop: sklpVsebina,
			tekst: tkstVsebina
		});

		socket.on('vodovodKoroskaVrnjeno', function(data){
			arrRezultat.push(data);
		});



		socket.on('vodovodKoroskaZadnjaVrstica', function(data){ //data je v tem primeru samo 'konec'
			
			// arrRezultat.push(data);
			izdelajTabelo.napolniTabelo(arrRezultat, 'sklop');
			arrRezultat = [];
			koncaj();
		});

		socket.on('vodovodKoroskaObcinaVrnjeno', function(data){
			arrRezultatObcina.push(data);
		});

		socket.on('vodovodKoroskaZadnjaVrsticaObcina', function(data){ //data je v tem primeru samo 'konec'
			
			// arrRezultatObcina.push(data);
			izdelajTabelo.napolniTabelo(arrRezultatObcina, 'obcina');
			arrRezultatObcina = [];
			koncaj();
		});

		socket.on('vodovodKoroskaProjektVrnjeno', function(data){
			arrRezultatProjekt.push(data);
		});

		socket.on('vodovodKoroskaZadnjaVrsticaProjekt', function(data){ //data je v tem primeru samo 'konec'
			
			// arrRezultatProjekt.push(data);
			izdelajTabelo.napolniTabelo(arrRezultatProjekt, 'projekt');
			arrRezultatProjekt = [];
			koncaj();
		});

//--------------------------------------- vrednosti v razlagah
		socket.on('vodovodKoroskaMaxPodobnost', function(data){
			that.maxPodobnostSklop.empty();
			that.maxCenaSklop.empty();
			that.avgCenaSklop.empty();
			that.maxPodobnostSklop.append(data.max_podobnost);
			that.maxCenaSklop.append(data.max_cena);
			that.avgCenaSklop.append(data.povp_cena);
		});

		socket.on('vodovodKoroskaMaxPodobnostObcina', function(data){
			that.maxPodobnostObcina.empty();
			that.maxCenaObcina.empty();
			that.avgCenaObcina.empty();
			that.maxPodobnostObcina.append(data.max_podobnost);
			that.maxCenaObcina.append(data.max_cena);
			that.avgCenaObcina.append(data.povp_cena);
		});

		socket.on('vodovodKoroskaMaxPodobnostProjekt', function(data){
			that.maxPodobnostProjekt.empty();
			that.maxCenaProjekt.empty();
			that.avgCenaProjekt.empty();
			that.maxPodobnostProjekt.append(data.max_podobnost);
			that.maxCenaProjekt.append(data.max_cena);
			that.avgCenaProjekt.append(data.povp_cena);
		});
//--------------------------------------- vrednosti v razlagah - konec


	}

	vnesiVtabelo(trgt) {
		trgt.append('<p>V prvo polje vnesi sklop oz prvi del wbs-a. Npr. 2.1 za "Sklop 12 Muta - Gortina in Muta - Radlje od Dravi</p><p>V drugo polje vnesi celoten tekst postavke, ki jo iščeš ... potem klikni Išči ali pritini Enter</p>');
	}

}

export default Ajax;