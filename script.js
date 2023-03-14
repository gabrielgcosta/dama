const tamanhoCelula = 40;
let pecaId = 0;
let celulaId = 0;
let turn = 0;
document.body.append(criaTabuleiro());

function criaTabuleiro() {
    const tamanho = 8;
    let tabela = document.createElement('table');

    tabela.style.borderStyle = 'solid';
    tabela.style.borderSpacing = 0;
    tabela.style.margin = 'auto';

    for (let i = 0; i < tamanho; i++) {
        let linha = document.createElement('tr');
        tabela.append(linha);
        for (let j = 0; j < tamanho; j++) {
            let celula = document.createElement('td');
            linha.append(celula);

            celula.style.width = `${tamanhoCelula}px`;
            celula.style.height = `${tamanhoCelula}px`;
            if (i % 2 == j % 2) {
                celula.style.backgroundColor = 'black';
                celula.setAttribute('ondrop', 'drop(event)')
                celula.setAttribute('ondragover', 'allowDrop(event)')
                if (i * 8 + j <= 24) {
                    celula.append(criaPeca('black'));
                } else if (i * 8 + j >= 40) {
                    celula.append(criaPeca('red'));
                }
            } else {
                celula.style.backgroundColor = 'white';
            }
        }
    };
    return tabela;
    
}

function criaPeca(cor) {
    let imagem = document.createElement('img');
    imagem.setAttribute('src', `img/${cor}.png`);
    imagem.setAttribute('width', `${tamanhoCelula-4}px`);
    imagem.setAttribute('height', `${tamanhoCelula-4}px`);
    imagem.setAttribute('draggable',"true");
    imagem.setAttribute('id',pecaId++);
    imagem.setAttribute('class', cor);
    imagem.setAttribute('ondragstart',"drag(event)");
    imagem.style.cursor = 'move';
    return imagem;
}

function allowDrop(ev) {
    ev.preventDefault();
}
  
function drag(ev) {
    if (turn == 0 && ev.target.classList[0] == 'red'){
        ev.dataTransfer.setData("text", ev.target.id);
        turn = 1
        return
    }else if(turn == 1 && ev.target.classList[0] == 'black'){

        ev.dataTransfer.setData("text", ev.target.id);
        turn = 0
        return
    }
}
  
function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}