
// GAME OF LIFE 

var lineaFila;
var estado;
var activos;
var tiempo;
var celulasVivas;
var gen;
var interv = 0;
var count = 0;
var automata = false;
var clase = '';
var countViva;

//Creo las dimensiones de la tabla
var size = {

    columnas: 0,
    filas: 0

};


function crearTabla() {

    var tabla = document.getElementById('tabla');
    var html = '';
    estado = [];




    //dimensiones de la tabla introducidas por el usuario
    size.columnas = document.getElementById('colum').value;
    size.filas = document.getElementById('fila').value;

    //comprobar que coge el valor correcto
    //alert(size.columnas + "///" + size.filas);


    //inicio del table en html
    html = html + '<table>';

    for (var i = 0; i < size.filas; i++) {

        estado[i] = [];
        html = html + '<tr>';

        for (var j = 0; j < size.columnas; j++) {

            //creación random de células vivas iniciales
            clase = Math.floor(Math.random() * 3);


            if (clase === 0) {

                clase = 'viva';
                console.log("| viva |");
                countViva++;

            } else {

                clase = 'muerta';
                console.log("| muerta |");
            }

            html = html + '<di><td id="td" class="' + clase + '"></td></div>';


            estado[i][j] = false;

        }
        html = html + '</tr>';
    }

    html = html + '</table>';

    tabla.innerHTML = html;

    count = 0;


    lineaFila = document.getElementsByTagName('td');
    celulasVivas = document.getElementById('nCelulasVivas');
    gen = document.getElementById('gen');
}

function inicio() {

    if (automata) {
        cancelAnimationFrame(intervalo);
        document.getElementById('inicio').value = 'Iniciar Vida';
    } else {

        intervalo = requestAnimationFrame(nextGen);
        document.getElementById('inicio').value = 'Parar Vida';

    }

    automata = !automata;


}

function stop() {

    cancelAnimationFrame(intervalo);

}


function nextGen() {

    var cellSelec; //la célula en la que estamos
    var countViva = 0; //contamos las células vivas

    for (var i = 0; i < size.filas; i++) {

        for (var j = 0; j < size.columnas; j++) {

            cellSelec = (lineaFila[size.columnas * i + j].className == 'viva');
            estado [i][j] = cellSelec;


            if (cellSelec) {
                countViva++;
            }

        }

    }

    if (countViva == 0) {

        count = 0;
        document.getElementById('inicio').value = 'Iniciar Vida';



        return;
    }

    //recorro las células que rodean a la seleccionada

    var n; //contador de células vivas alrededor
    var a;
    var s;
    var d;
    //posiciones de alrededor de la seleccionada
    var h = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];

    for (i = 0; i < size.filas; i++) {
        for (j = 0; j < size.columnas; j++) {
            n = 0;
            a = h.length;
            while (a--) {
                s = i + h[a][0];
                d = j + h[a][1];

                if (s < 0 || d < 0 || s == size.filas || d == size.columnas) {
                    continue;
                }
                if (estado[s][d]) {
                    n++;
                }

            }
            cellSelec = estado[i][j];


            //Cumplimiento de condiciones de Game of life

            //revive si tiene 3 células vivas alrededor
            if (!cellSelec && n === 3) {

                lineaFila[size.columnas * i + j].className = 'viva';


                //sigue viva si tiene 2 o 3 células vivas alrededor
            } else if (cellSelec && (n === 2 || n === 3)) {

                lineaFila[size.columnas * i + j].className = 'viva';


                //la célula muere si hay menos de 2 células vivas o más de 3 alrededor suya
            } else {

                lineaFila[size.columnas * i + j].className = 'muerta';



            }
        }


        gen.innerText = count++;
        celulasVivas.innerText = countViva;

    }



    intervalo = requestAnimationFrame(nextGen);


}





