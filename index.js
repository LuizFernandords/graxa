document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registroForm");
    const inputs = form.querySelectorAll("input");
    const calcularButton = document.getElementById("calcularButton"); // Adicionei esta linha

    form.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            const activeElement = document.activeElement;
            const currentIndex = Array.from(inputs).indexOf(activeElement);
            if (currentIndex < inputs.length - 1) {
                // Move para o próximo campo
                inputs[currentIndex + 1].focus();
            } else {
                // Último campo, então faz o cálculo
                calcularButton.click();
            }
        }
    });
});
// Função para calcular o valor
function calcularValorCalculo() {
    const nomeCliente = document.getElementById("nomeCliente").value;
    const nomeEquipamento =
        document.getElementById("nomeEquipamento").value;
    const tipoRolamento = document.getElementById("tipoRolamento").value;
    const temperatura = parseFloat(
        document.getElementById("temperatura").value
    );
    const rpm = parseFloat(document.getElementById("rpm").value);
    const dExterno = parseFloat(document.getElementById("dExterno").value);
    const dInterno = parseFloat(document.getElementById("dInterno").value);
    const largura = parseFloat(document.getElementById("largura").value);
    const useGraxa = parseFloat(document.getElementById("useGraxa").value);

    const DMN = ((dExterno + dInterno) / 2) * rpm;
    const quantidade =
        dExterno * largura * (useGraxa === 0.002 ? 0.002 : 0.005);
    const intervaloEsfera =
        1 * (14000000 / (rpm * Math.sqrt(dInterno))) - 4 * dInterno;
    const intervaloCilindricos =
        5 * (14000000 / (rpm * Math.sqrt(dInterno))) - 4 * dInterno;
    const intervaloRadialEsferas =
        10 * (14000000 / (rpm * Math.sqrt(dInterno))) - 4 * dInterno;
    let graxaRecomendada;

    if (DMN > 750000) {
        graxaRecomendada = "Total Multis XLT 2";
    } else if (DMN > 400000) {
        graxaRecomendada = "Total Altis SH/ Total Nevastane XS 80";
    } else if (DMN > 250000) {
        graxaRecomendada =
            "Total Nevastane HD2T/ Total Altis EM/ Total Ceran XM 100";
    } else if (DMN > 100000) {
        graxaRecomendada = "Total Ceran XM 220/Total Multis Complex EP2";
    } else if (DMN > 60000) {
        graxaRecomendada =
            "Total Ceram HRM 460/Total Multis C SHD 460/Total Nevastane XS 320";
    } else if (DMN > 30000) {
        graxaRecomendada = "Total Ceran MS/ Total Caloris 2";
    } else if (DMN > 10) {
        graxaRecomendada = "Total Ceran AD Plus";
    }

    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.style.display = "block";
    resultadosDiv.innerHTML = `
    <div class="watermark">
        <img src="./assets/Logo.png" alt="Marca d'água">
    </div>
<h2>Resultados de Lubvel Lubrificantes:</h2>
<p>Nome do Cliente: ${nomeCliente}</p>
<p>Nome do Equipamento: ${nomeEquipamento}</p>
<p>Tipo de Rolamento: ${tipoRolamento}</p>
<p>Temperatura (em Celsius): ${temperatura} °C</p>
<p>D.Externo (D) (mm): ${dExterno} mm</p>
<p>D.Interno (d) (mm): ${dInterno} mm</p>
<p>Largura (B) (mm): ${largura} mm</p>
<p>Use 0,002 p/ W33 ou 0,005 p/ demais: ${useGraxa}</p>
<p>RPM (Rotações Por Minuto): ${rpm}</p>
<p>DMN: ${DMN.toFixed(2)}</p>
<p>Quantidade de Graxa (Gramas): ${quantidade.toFixed(2)}</p>
<p>Intervalo Esfera (horas): ${intervaloEsfera.toFixed(2)}</p>
<p>Intervalo Cilindricos (horas): ${intervaloCilindricos.toFixed(2)}</p>
<p>Intervalo Radial Esferas (horas): ${intervaloRadialEsferas.toFixed(2)}</p>
<p  style=" font-size: 25px; color: green;"><br>Graxa Recomendada: ${graxaRecomendada}</p>
<p style="font-size: 23px; color: red;"><br>*Intervalos devem ser corrigidos conforme temperatura de trabalho e possíveis contaminações.* *Solicitar informação com nosso departamento técnico.*</p>

<img src="./assets/umparceirolocal.png" alt="Sua Imagem" class="imagem-resultado">
<br/>
<button id="gerar-relatorio" class="botao-azul" onclick="gerarRelatorio()">Gerar Relatório</button>
`;

    document.getElementById("report-button-container").style.display = "block";
    document.getElementById("aviso").style.display = "block";

}


function gerarRelatorio() {

    const nomeCliente = document.getElementById("nomeCliente").value;
    const nomeEquipamento = document.getElementById("nomeEquipamento").value;
    const tipoRolamento = document.getElementById("tipoRolamento").value;
    const temperatura = parseFloat(document.getElementById("temperatura").value);
    const rpm = parseFloat(document.getElementById("rpm").value);
    const dExterno = parseFloat(document.getElementById("dExterno").value);
    const dInterno = parseFloat(document.getElementById("dInterno").value);
    const largura = parseFloat(document.getElementById("largura").value);
    const useGraxa = parseFloat(document.getElementById("useGraxa").value);

    const quantidadeEsfera = 1;
    const quantidadeCilindricos = 5;
    const quantidadeRadialEsferas = 10;
    const DMN = ((dExterno + dInterno) / 2) * rpm;
    const quantidadeGraxa = dExterno * largura * (useGraxa === 0.002 ? 0.002 : 0.005);
    const intervaloEsfera = quantidadeEsfera * (14000000 / (rpm * Math.sqrt(dInterno))) - 4 * dInterno;
    const intervaloCilindricos = quantidadeCilindricos * (14000000 / (rpm * Math.sqrt(dInterno))) - 4 * dInterno;
    const intervaloRadialEsferas = quantidadeRadialEsferas * (14000000 / (rpm * Math.sqrt(dInterno))) - 4 * dInterno;

    let graxaRecomendada;
    if (DMN > 750000) {
        graxaRecomendada = "Total Multis XLT 2";
    } else if (DMN > 400000) {
        graxaRecomendada = "Total Altis SH/ Total Nevastane XS 80";
    } else if (DMN > 250000) {
        graxaRecomendada = "Total Nevastane HD2T/ Total Altis EM/ Total Ceran XM 100";
    } else if (DMN > 100000) {
        graxaRecomendada = "Total Ceran XM 220/Total Multis Complex EP2";
    } else if (DMN > 60000) {
        graxaRecomendada = "Total Ceram HRM 460/Total Multis C SHD 460/Total Nevastane XS 320";
    } else if (DMN > 30000) {
        graxaRecomendada = "Total Ceran MS/ Total Caloris 2";
    } else if (DMN > 10) {
        graxaRecomendada = "Total Ceran AD Plus";
    }

    const relatorio = `

Relatório de Registro de Dados<br>
Informações registradas:
Nome do cliente: ${nomeCliente}
Nome do equipamento: ${nomeEquipamento}
Tipo de rolamento: ${tipoRolamento}
Temperatura: ${temperatura}°C
RPM: ${rpm}
D.Externo (D): ${dExterno} mm
D.Interno (d): ${dInterno} mm
Largura (B): ${largura} mm
Use 0,002 p/ W33: ${useGraxa}
Esfera: ${quantidadeEsfera}
Cilíndricos: ${quantidadeCilindricos}
Radial Esferas: ${quantidadeRadialEsferas}
DmN: ${DMN.toFixed(2)}
Qtde graxa relub (Gramas): ${quantidadeGraxa.toFixed(2)}
Intervalo Esfera (horas): ${intervaloEsfera.toFixed(2)}
Intervalo Cilindricos (horas): ${intervaloCilindricos.toFixed(2)}
Intervalo Radial Esferas (horas): ${intervaloRadialEsferas.toFixed(2)}
<br><span style="color: green; font-size: 1.5em;">Graxa Recomendada: ${graxaRecomendada}

<span style="display: block; text-align: left; color: red; font-size: 0.7em;">* Intervalos devem ser corrigidos conforme temperatura de trabalho e possíveis contaminações,<br> solicitar informação com nosso departamento técnico*.</span>
`;
    const watermark = `
    <div class="report-content">
    <div class="watermark">
        <img src="./assets/Logo.png" alt="Marca d'água">
    </div>
</div>
`;
    const rodape = `<div class="footer">Desenvolvido por Lubvel Lubrificantes Industriais.</div>`;

    const cssStyles = `
<style>

.report-content {
    position: relative;
}

.watermark {
    display: inline-block; /* Para tornar a tag <pre> um bloco de nível de linha */
    position: absolute;
    top: 250px;
    left: 160px;
    transform: translate(-50%, -50%);
    z-index: 9999;
    opacity: 0.1;
}
</style>
`;

    const relatorioContent = `
${cssStyles}
${watermark}
${rodape}

<pre>${relatorio}</pre>
`;

    const newWindow = window.open("", "_blank");
    newWindow.document.open();
    newWindow.document.write(relatorioContent);
    newWindow.document.close();
}