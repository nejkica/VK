import $ from 'jquery';
import io from 'socket.io-client';
import it from './izdelajTabelo';


let izdelajTabelo = new it();


class Ajax {
	constructor() {
		this.target = $('.zadetki-sklop__tabela');
		this.btnIsci = $('.btn__isci');
		this.sklop = $('.input__sklop');
		this.tekst = $('.input__tekst');
		this.vnesiVtabelo(this.target);
		this.events();
	}

	events() {
		var that = this;
		
		that.btnIsci.click(function(){
			var sklopVsebina = that.sklop.val().trim();
			var tekstVsebina = that.tekst.val().trim();
			// console.log('klik ' + sklopVsebina + ' ' + tekstVsebina);
			that.target.empty();

			that.posljiPoizvedbo(sklopVsebina, tekstVsebina);
			
		});
	}

	posljiPoizvedbo(sklpVsebina, tkstVsebina) {
		var socket = io.connect('http://192.168.112.200:8888');
		var arrRezultat = [];

		// console.log('klik 12 ' + sklpVsebina + ' ' + tkstVsebina);

		socket.emit('vodovodKoroska', {
			sklop: sklpVsebina,
			tekst: tkstVsebina
		});

		socket.on('vodovodKoroskaVrnjeno', function(data){
			// console.log(data);
			arrRezultat.push(data);
		});

		socket.on('vodovodKoroskaZadnjaVrstica', function(data){
			
			arrRezultat.push(data);
			// console.log(arrRezultat);
			izdelajTabelo.napolniSklop(arrRezultat);

			socket.emit('zapriSejo');
		});

	}

	vnesiVtabelo(trgt) {
		trgt.append('<p>V prvo polje vnesi sklop oz prvi del wbs-a. Npr. 2.1 za "Sklop 12 Muta - Gortina in Muta - Radlje od Dravi</p><p>V drugo polje vnesi celoten tekst postavke, ki jo iščeš ... potem klikni Išči ali pritini Enter</p>');
	}

}

export default Ajax;