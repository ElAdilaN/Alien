import Game from './Game.js';

var startBtn = document.getElementById('start');

startBtn.addEventListener('click', () => {
    let nPlayer = document.getElementById('myinput');

    if (isNaN(nPlayer.value) || nPlayer.value < 2 || nPlayer.value > 4) {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Please enter a valid number.',
            showConfirmButton: false,
            timer: 1500,
        });
        nPlayer.value = '';
    } else {
        const myform = document.getElementById("part0");
        myform.remove();
        const game = new Game();
        game.initGame(nPlayer.value);






    }
});


