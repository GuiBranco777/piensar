"use client"

import { useState } from "react"
import { Check, Lightbulb, RotateCcw, X } from "lucide-react"
import type { Game } from "@/lib/games"
import { Button } from "@/components/ui/button"

const CHALLENGES: Record<string, { prompt: string; options: string[]; answer: string; hint: string }> = {
  "pattern-1": { prompt: "Uma sequência começa assim: 2, 5, 10, 17, __. Qual é o próximo número?", options: ["24", "26", "28", "30"], answer: "26", hint: "Os aumentos são 3, 5, 7..." },
  "combinations-1": { prompt: "Ana tem 3 camisetas e 2 bermudas. De quantas maneiras pode escolher uma de cada?", options: ["5", "6", "8", "9"], answer: "6", hint: "Para cada camiseta, há duas bermudas possíveis." },
  "area-1": { prompt: "Um quadrado de lado 6 cm foi dividido em 4 quadrados iguais. Qual é a área de cada parte?", options: ["6 cm²", "9 cm²", "12 cm²", "18 cm²"], answer: "9 cm²", hint: "Cada lado das partes mede metade do lado original." },
  "bridge-1": { prompt: "Duas pessoas levam 2 e 5 minutos para atravessar uma ponte. Qual o menor tempo para as duas atravessarem com uma lanterna?", options: ["5 minutos", "7 minutos", "10 minutos", "12 minutos"], answer: "5 minutos", hint: "As duas podem atravessar juntas." },
  "pattern-2": { prompt: "Qual é o próximo termo: 1, 2, 4, 7, 11, __?", options: ["14", "15", "16", "17"], answer: "16", hint: "Os aumentos são 1, 2, 3, 4..." },
  "combinations-2": { prompt: "Quantos códigos de dois algarismos diferentes podem ser feitos com 1, 2, 3 e 4?", options: ["8", "10", "12", "16"], answer: "12", hint: "Escolha o primeiro e depois o segundo sem repetir." },
  "area-2": { prompt: "Um retângulo de 8 cm por 5 cm tem um quadrado de lado 2 cm retirado. Qual é a área restante?", options: ["34 cm²", "36 cm²", "38 cm²", "40 cm²"], answer: "36 cm²", hint: "Calcule a área do retângulo e subtraia a do quadrado." },
  "bridge-2": { prompt: "Quatro estudantes levam 1, 2, 7 e 10 minutos para atravessar. Qual é o menor tempo total?", options: ["17 minutos", "19 minutos", "20 minutos", "23 minutos"], answer: "17 minutos", hint: "Faça a dupla mais rápida levar a lanterna nas voltas." },
  "pattern-3": { prompt: "Se 2 + 4 = 12, 3 + 5 = 24 e 4 + 6 = 40, então 5 + 7 = ?", options: ["50", "55", "60", "70"], answer: "60", hint: "Observe que cada resultado é o produto dos números multiplicado por 2." },
  "combinations-3": { prompt: "De quantas formas 3 alunos podem ser escolhidos entre 5 para formar um comitê?", options: ["8", "10", "12", "15"], answer: "10", hint: "A ordem dos alunos no comitê não importa." },
  "area-3": { prompt: "Um quadrado de área 64 cm² foi dividido em 4 triângulos iguais. Qual é a área de cada triângulo?", options: ["8 cm²", "12 cm²", "16 cm²", "32 cm²"], answer: "16 cm²", hint: "Divida a área total pelo número de partes iguais." },
  "deduction-1": { prompt: "Bia, Caio e Duda escolheram frutas diferentes. Bia não escolheu maçã. Caio não escolheu pera nem uva. Quem escolheu uva?", options: ["Bia", "Caio", "Duda", "Não é possível saber"], answer: "Duda", hint: "Primeiro descubra qual fruta sobrou para Caio." },
  "pattern-4": { prompt: "Uma sequência começa em 3 e alterna somar 2 e somar 5: 3, 5, 10, 12, 17, __. Qual é o próximo termo?", options: ["19", "20", "21", "22"], answer: "19", hint: "A regra se repete em pares: +2, depois +5." },
  "pattern-5": { prompt: "Qual é o próximo número da sequência 2, 5, 11, 23, __?", options: ["35", "46", "47", "48"], answer: "47", hint: "Multiplique por 2 e some 1 a cada passo." },
  "combinations-4": { prompt: "Uma placa usa uma letra entre A e B e um algarismo entre 1, 2 e 3. Quantas placas diferentes podem ser feitas?", options: ["5", "6", "8", "9"], answer: "6", hint: "Há 2 escolhas para a letra e 3 para o algarismo." },
  "combinations-5": { prompt: "De quantas maneiras uma equipe de 2 alunos pode ser escolhida entre Ana, Bia, Caio e Duda, se Ana deve participar?", options: ["2", "3", "4", "6"], answer: "3", hint: "Escolha Ana e depois um dos outros três alunos." },
  "area-4": { prompt: "Um quadrado de lado 10 cm tem uma faixa de 2 cm de largura retirada de um de seus lados. Qual é a área que sobra?", options: ["60 cm²", "70 cm²", "80 cm²", "96 cm²"], answer: "80 cm²", hint: "A faixa mede 10 × 2 cm²." },
  "area-5": { prompt: "Um retângulo tem perímetro 20 cm e comprimento 6 cm. Qual é sua área?", options: ["20 cm²", "24 cm²", "30 cm²", "36 cm²"], answer: "24 cm²", hint: "Os dois lados somam 10 cm; o outro lado mede 4 cm." },
  "deduction-2": { prompt: "Há três caixas: vermelha, azul e verde. A bola não está na vermelha nem na verde. Em qual caixa ela está?", options: ["Vermelha", "Azul", "Verde", "Não é possível saber"], answer: "Azul", hint: "Elimine as duas caixas mencionadas." },
  "deduction-3": { prompt: "Ana está à esquerda de Beto, e Beto está à esquerda de Carla. Quem está no meio?", options: ["Ana", "Beto", "Carla", "Não é possível saber"], answer: "Beto", hint: "A ordem da esquerda para a direita é Ana, Beto, Carla." },
  "bridge-3": { prompt: "Em uma malha, você pode andar apenas para a direita ou para cima. Quantos caminhos há de (0,0) até (2,1)?", options: ["2", "3", "4", "6"], answer: "3", hint: "São duas direitas e uma subida, em ordens diferentes." },
  "bridge-4": { prompt: "Entre 9 moedas, uma é mais pesada. Qual é o menor número de pesagens em uma balança de dois pratos para encontrá-la?", options: ["1", "2", "3", "4"], answer: "2", hint: "Divida as moedas em três grupos de três." },
  "sequence-1": { prompt: "Quantos palitos são necessários para formar 3 triângulos separados, usando 3 palitos em cada um?", options: ["6", "8", "9", "12"], answer: "9", hint: "Cada triângulo usa 3 palitos e eles não compartilham lados." },
  "sequence-2": { prompt: "Se hoje é terça-feira, que dia será daqui a 10 dias?", options: ["Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"], answer: "Sexta-feira", hint: "Sete dias mantêm o mesmo dia; sobram três." },
  "sequence-3": { prompt: "Qual é a soma dos três números consecutivos 7, 8 e 9?", options: ["21", "22", "23", "24"], answer: "24", hint: "Some os três termos: 7 + 8 + 9." },
  "sequence-4": { prompt: "Um cadeado tem código de um algarismo. Ele é maior que 6, menor que 9 e não é 8. Qual é o código?", options: ["6", "7", "8", "9"], answer: "7", hint: "Apenas um algarismo satisfaz as três pistas." },
  "sequence-5": { prompt: "Em um torneio, cada uma das 4 equipes joga uma vez contra cada outra. Quantas partidas acontecem?", options: ["4", "5", "6", "8"], answer: "6", hint: "Conte os pares de equipes: 3 + 2 + 1." },
}

type LogicGameProps = { game: Game; onExit: () => void; onEarnStars: (n: number) => void }

export function LogicGame({ game, onExit, onEarnStars }: LogicGameProps) {
  const challenge = CHALLENGES[game.id]
  const [selected, setSelected] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const correct = selected === challenge.answer

  function submit() {
    if (!selected || submitted) return
    setSubmitted(true)
    if (selected === challenge.answer) onEarnStars(25)
  }

  function reset() {
    setSelected(null)
    setSubmitted(false)
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" onClick={onExit}>Voltar aos desafios</Button>
        <span className="rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground">+25 pontos</span>
      </div>
      <section className={`rounded-4xl border ${game.border} ${game.softBg} p-6 md:p-10`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={`text-sm font-bold uppercase tracking-widest ${game.color}`}>Desafio OBMEP</p>
            <h1 className="mt-2 font-display text-3xl font-bold text-foreground md:text-4xl">{game.name}</h1>
          </div>
          <div className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${game.solidBg} text-primary-foreground`}><Lightbulb aria-hidden="true" /></div>
        </div>
        <p className="mt-8 text-lg font-semibold leading-relaxed text-foreground md:text-xl">{challenge.prompt}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {challenge.options.map((option) => {
            const isSelected = selected === option
            const isCorrect = submitted && option === challenge.answer
            const isWrong = submitted && isSelected && !correct
            return <button key={option} type="button" disabled={submitted} onClick={() => setSelected(option)} className={`rounded-2xl border p-4 text-left font-semibold transition ${isCorrect ? "border-game-seq bg-game-seq-soft text-game-seq" : isWrong ? "border-destructive bg-destructive/10 text-destructive" : isSelected ? "border-primary bg-primary/10 text-primary" : "border-border bg-card hover:border-primary/50"}`}><span className="flex items-center justify-between gap-2">{option}{isCorrect && <Check aria-hidden="true" />}{isWrong && <X aria-hidden="true" />}</span></button>
          })}
        </div>
        {submitted && <div className="mt-6 rounded-2xl bg-card p-4 text-sm leading-relaxed"><strong>{correct ? "Muito bem! Você acertou." : "Quase!"}</strong> {correct ? "Você ganhou 25 estrelas para o ranking." : `A resposta correta é ${challenge.answer}.`}<p className="mt-2 text-muted-foreground">Dica: {challenge.hint}</p></div>}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" disabled={!selected || submitted} onClick={submit}>Verificar resposta</Button>
          {submitted && <Button size="lg" variant="outline" onClick={reset}><RotateCcw data-icon="inline-start" />Tentar novamente</Button>}
        </div>
      </section>
    </div>
  )
}
