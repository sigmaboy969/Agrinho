// Jogo Agro Sustentável - Versão com barra de vida, tutorial atualizado e layout refinado
let alimentos = 100;
let poluicao = 0;
let dinheiro = 100;
let saudeSolo = 100;
let ano = 1;
let mensagem = '';
let tempoMensagem = 0;

let estado = 'inicio';

let imgCampo, imgCidade, imgFundoInicio, imgVitoria, imgGameOver;

function preload() {
  imgCampo = loadImage('campo.jpeg');
  imgCidade = loadImage('cidade.jpeg');
  imgFundoInicio = loadImage('fundo.jpeg');
  imgVitoria = loadImage('vitoria.jpeg');
  imgGameOver = loadImage('gameover.jpeg');
}

function setup() {
  createCanvas(900, 500);
}

function draw() {
  background(220);

  if (estado === 'inicio') {
    image(imgFundoInicio, 0, 0, width, height);
    fill(0, 150);
    rect(0, 50, width, 100);
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(36);
    text('JOGO AGRO SUSTENTÁVEL', width / 2, 80);
    textSize(18);
    text('Gerencie seu campo e sua cidade. Busque equilíbrio entre produção e meio ambiente.', width / 2, 115);
    textSize(16);
    text('Aperte ENTER para começar', width / 2, 145);
    fill(255);
    rect(width / 2 - 75, height / 2 - 60, 150, 40, 10);
    rect(width / 2 - 75, height / 2, 150, 40, 10);
    fill(0);
    textSize(20);
    text('JOGAR', width / 2, height / 2 - 40);
    text('TUTORIAL', width / 2, height / 2 + 20);

  } else if (estado === 'tutorial') {
    background(200);
    fill(0);
    textAlign(LEFT, TOP);
    textSize(22);
    text('Simulador de Solo', 20, 20);
    textSize(18);
    text('\nOBJETIVO: Simular a saúde do solo de forma sustentável e alcançar 100 anos!\nSe o solo chegar a 0%, você perde.', 20, 50);
    text('\nCOMANDOS:\n\nP - Plantar (Aumenta alimentos, reduz saúde do solo)\nD - Desmatar (Aumenta dinheiro, polui e reduz saúde do solo)\nA - Adubar (Custa dinheiro, recupera solo)', 20, 120);
    fill(255, 0, 0);
    rect(width - 60, 10, 50, 30, 5);
    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    text('ESC', width - 35, 25);

  } else if (estado === 'jogo') {
    image(imgCampo, 0, 0, width / 2, height);
    image(imgCidade, width / 2, 0, width / 2, height);

    // Barra de vida (saúde do solo)
    fill(255);
    rect(20, 10, 200, 20, 5);
    fill(0, 200, 0);
    rect(20, 10, 2 * saudeSolo, 20, 5);
    fill(0);
    textAlign(LEFT, CENTER);
    textSize(14);
    text('Saúde do Solo: ' + saudeSolo + '%', 230, 20);

    // Caixas de opção redesenhadas e reposicionadas
    fill(0, 180);
    rect(140, 90, 170, 200, 10); // altura ajustada para remover espaço extra
    rect(590, 40, 220, 140, 10); // altura ajustada conforme menor número de info

    textAlign(CENTER, CENTER);
    fill(0);
    textSize(16);

    fill(255);
    rect(150, 110, 150, 40, 10);
    fill(0);
    text('PLANTAR (P)', 225, 130);

    fill(255);
    rect(150, 160, 150, 40, 10);
    fill(0);
    text('DESMATAR (D)', 225, 180);

    fill(255);
    rect(150, 210, 150, 40, 10);
    fill(0);
    text('ADUBAR (A)', 225, 230);

    fill(255);
    rect(600, 50, 200, 30, 10);
    fill(0);
    text('ALIMENTOS: ' + alimentos + '%', 700, 65);

    fill(255);
    rect(600, 90, 200, 30, 10);
    fill(0);
    text('POLUIÇÃO: ' + poluicao + '%', 700, 105);

    fill(255);
    rect(600, 130, 200, 30, 10);
    fill(0);
    text('DINHEIRO: R$' + dinheiro, 700, 145);

    fill(255);
    rect(600, 170, 200, 30, 10);
    fill(0);
    text('ANO: ' + ano, 700, 185);

    if (mensagem !== '' && millis() - tempoMensagem < 3000) {
      fill(255, 0, 0);
      rect(width / 2 - 200, height - 60, 400, 30, 10);
      fill(255);
      textSize(14);
      text(mensagem, width / 2, height - 45);
    }

    verificarFim();
  } else if (estado === 'vitoria') {
    image(imgVitoria, 0, 0, width, height);
  } else if (estado === 'gameover') {
    image(imgGameOver, 0, 0, width, height);
  }
}

function keyPressed() {
  if (estado === 'tutorial' && keyCode === ESCAPE) {
    estado = 'inicio';
  }
  if (estado === 'inicio' && keyCode === ENTER) {
    estado = 'jogo';
  }
  if (estado === 'jogo') {
    if (key === 'P' || key === 'p') {
      alimentos += 15;
      saudeSolo -= 10;
      mensagem = 'Plantou! Alimentos +15%, Solo -10%';
    } else if (key === 'D' || key === 'd') {
      dinheiro += 20;
      saudeSolo -= 15;
      poluicao += 10;
      mensagem = 'Desmatou! Dinheiro +20, Solo -15%, Poluição +10%';
    } else if (key === 'A' || key === 'a') {
      if (dinheiro >= 30) {
        dinheiro -= 30;
        saudeSolo += 20;
        mensagem = 'Adubou! Solo +20%, Dinheiro -30';
      } else {
        mensagem = 'Dinheiro insuficiente para adubar!';
      }
    }
    alimentos -= 5;
    poluicao += 1;
    ano++;
    tempoMensagem = millis();
  }
}

function mousePressed() {
  if (estado === 'inicio') {
    if (mouseX > width / 2 - 75 && mouseX < width / 2 + 75) {
      if (mouseY > height / 2 - 60 && mouseY < height / 2 - 20) {
        estado = 'jogo';
      } else if (mouseY > height / 2 && mouseY < height / 2 + 40) {
        estado = 'tutorial';
      }
    }
  }
  if (estado === 'tutorial') {
    if (mouseX > width - 60 && mouseX < width - 10 && mouseY > 10 && mouseY < 40) {
      estado = 'inicio';
    }
  }
}

function verificarFim() {
  if (saudeSolo <= 0 || poluicao >= 100 || alimentos <= 0) {
    estado = 'gameover';
  } else if (ano >= 100) {
    estado = 'vitoria';
  }
}
