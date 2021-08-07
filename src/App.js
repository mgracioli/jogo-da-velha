import './App.css';
import React,{useState} from 'react';

function App() {
  //ESTILOS
  const tabu={
    display:'flex',
    flexDirection:'column'  //estabelece o eixo principal do display
  }

  const tabuLinha={
    display:'flex',
    flexDirection:'row'
  }

  const casa={
    width:100,
    height:100,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
    cursor:'pointer',
    fontSize:60,
    border:'1px solid #000'
  }

  const BtnJogarNovamente = () => {
    if(!jogando){
      return(
        <button onClick={() => {reiniciarJogo()}}>Reiniciar</button>
      )
    }
  }

  //FUNÇÕES
  const jogoInicial=[['','',''],['','',''],['','','']]
  const [jogo,setJogo]=useState(jogoInicial)
  const [simboloAtual,setSimboloAtual]=useState('X')
  const [jogando,setJogando]=useState(true)

  const tabuleiro = (j) => {
    return(
      <div style={tabu}>
        <div style={tabuLinha}>
          <div style={casa} data-pos='00' onClick={(casa) => {joga(casa)}}>{j[0][0]}</div>
          <div style={casa} data-pos='01' onClick={(casa) => {joga(casa)}}>{j[0][1]}</div>
          <div style={casa} data-pos='02' onClick={(casa) => {joga(casa)}}>{j[0][2]}</div>
        </div>
        <div style={tabuLinha}>
          <div style={casa} data-pos='10' onClick={(casa) => {joga(casa)}}>{j[1][0]}</div>
          <div style={casa} data-pos='11' onClick={(casa) => {joga(casa)}}>{j[1][1]}</div>
          <div style={casa} data-pos='12' onClick={(casa) => {joga(casa)}}>{j[1][2]}</div>
        </div>
        <div style={tabuLinha}>
          <div style={casa} data-pos='20' onClick={(casa) => {joga(casa)}}>{j[2][0]}</div>
          <div style={casa} data-pos='21' onClick={(casa) => {joga(casa)}}>{j[2][1]}</div>
          <div style={casa} data-pos='22' onClick={(casa) => {joga(casa)}}>{j[2][2]}</div>
        </div>
      </div>
    )
  }

  const verificaVitoria=() => {
    //busca pelas linhas
    let pontos = 0
    let vitoria = false

    for(let l=0; l<3; l++){
      pontos=0
      for(let c=0; c<3; c++){
        if(jogo[l][c] == simboloAtual){
          pontos++
        }
      }
      if(pontos == 3){
        vitoria = true
        return vitoria
      }
    }

    //busca pelas colunas
    for(let c=0; c<3; c++){
      pontos=0

      for(let l=0; l<3; l++){
        if(jogo[l][c] == simboloAtual){
          pontos++
        }
      }
      if(pontos == 3){
        vitoria = true
        return vitoria
      }
    }

    //busca pelas diagonais
    //diagonal principal
    pontos=0
    for(let d=0; d<3; d++){  
      if(jogo[d][d] == simboloAtual){
        pontos++
      }   
    }
    if(pontos == 3){
      vitoria = true
      return vitoria
    }

    //diagonal secundária
    pontos=0
    for(let d=3; d>0; d--){  
      if(jogo[3-d][d-1] == simboloAtual){
        pontos++
      }   
    }
    if(pontos == 3){
      vitoria = true
      return vitoria
    }
    return
  }

  const trocaJogador = () => {
    simboloAtual == 'X'? setSimboloAtual('O'):setSimboloAtual('X')
  }

  const retornaPosicao = (casa) => {
    const p = casa.target.getAttribute('data-pos')
    const pos = [parseInt(p.substring(0,1)), parseInt(p.substring(1,2))] //substring(posição start, posição end) - não inclui o end
    return pos
  }

  const verificaEspacoVazio = (casa) => {
    if(jogo[retornaPosicao(casa)[0]][retornaPosicao(casa)[1]] == ''){
      return true
    }else{
      return false
    }
  }

  const joga = (casa) =>{
    if(jogando){
      if(verificaEspacoVazio(casa)){
        jogo[retornaPosicao(casa)[0]][retornaPosicao(casa)[1]] = simboloAtual
        trocaJogador()

        if(verificaVitoria()){
          trocaJogador()
          alert('Jogador '+simboloAtual+' venceu!')
          setJogando(false)
        }
      }
    }else{
      alert('Espaço inválido')
    }
  }

  const reiniciarJogo = () => {
    setJogando(true)
    setJogo(jogoInicial)
    setSimboloAtual('X')
  }
  
  return (
    <>
    <p>Jogador atual: {simboloAtual}</p>
        {tabuleiro(jogo)}
        {BtnJogarNovamente()}
    </>
  );
}

export default App;
