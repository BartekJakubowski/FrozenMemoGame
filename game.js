(function() {    
	var LICZBA_KAFELKOW = 12;
	var KAFELKI_NA_RZAD = 4;
	var kafelki = [];
	var pobraneKafelki = [];
	var moznaBrac = true;
	var liczbaRuchow = 0;
	var paryKafelkow = 0;
	var obrazkiKafelkow = [
		'rsz_anna.jpg',
		'rsz_elsa.jpg',
		'rsz_olaf.jpg',
		'rsz_sven.jpg',
		'rsz_kristof.jpg',
		'rsz_ksiaze.jpg',
	];

	function startGame() {
		kafelki = [];
		pobraneKafelki = [];
		moznaBrac = true;
		liczbaRuchow = 0;
		paryKafelkow = 0;

		var plansza = $('.plansza').empty();

		for (var i=0; i<LICZBA_KAFELKOW; i++) {
			kafelki.push(Math.floor(i/2));
		}

		for (i=LICZBA_KAFELKOW-1; i>0; i--) {
			var swap = Math.floor(Math.random()*i);
			var tmp = kafelki[i];
			kafelki[i] = kafelki[swap];
			kafelki[swap] = tmp;
		}

		for (i=0; i<LICZBA_KAFELKOW; i++) {
			var tile = $('<div class="kafelek"></div>');
			plansza.append(tile);
			tile.data('cardType',kafelki[i]);
			tile.data('index', i);
			tile.css({
				left : 5+(tile.width()+5)*(i%KAFELKI_NA_RZAD)
			});
			tile.css({
				top : 5+(tile.height()+5)*(Math.floor(i/KAFELKI_NA_RZAD))
			});
			tile.bind('click',function() {klikniecieKafelka($(this))});
		}
		$('.moves').html(liczbaRuchow);
	}

	function klikniecieKafelka(element) {
		if (moznaBrac) {
			//jeżeli jeszcze nie pobraliśmy 1 elementu
			//lub jeżeli index tego elementu nie istnieje w pobranych...
			if (!pobraneKafelki[0] || (pobraneKafelki[0].data('index') != element.data('index'))) {
				pobraneKafelki.push(element);
				element.css({'background-image' : 'url('+obrazkiKafelkow[element.data('cardType')]+')'})    
			}

			if (pobraneKafelki.length == 2) {
				moznaBrac = false;
				if (pobraneKafelki[0].data('cardType')==pobraneKafelki[1].data('cardType')) {
					window.setTimeout(function() {
						usunKafelki();
					}, 500);
				} else {
					window.setTimeout(function() {
						zresetujKafelki();
					}, 500);
				}
				liczbaRuchow++;
				$('.moves').html(liczbaRuchow)
			}
		}
	}

	function usunKafelki() {
		pobraneKafelki[0].fadeOut(function() {
			$(this).remove();
		});
		pobraneKafelki[1].fadeOut(function() {
			$(this).remove();

			paryKafelkow++;
			if (paryKafelkow >= LICZBA_KAFELKOW / 2) {
				alert('gameOver!');
			}
			moznaBrac = true;
			pobraneKafelki = new Array();
		});
	}

	function zresetujKafelki() {
		pobraneKafelki[0].css({'background-image':'url(title.png)'})
		pobraneKafelki[1].css({'background-image':'url(title.png)'})
		pobraneKafelki = new Array();
		moznaBrac = true;
	}

	$(document).ready(function() {

		$('.start_game').click(function() {
			startGame();
		});

	})
})();