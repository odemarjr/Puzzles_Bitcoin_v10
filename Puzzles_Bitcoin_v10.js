//Creaded by: Odemar Ribeiro Junior
//Github: https://github.com/odemarjr/
//Licence : MIT License
//Inicio projeto 12/02/2024 - Pesquisa de quebra-cabeça de 66 bits para resolver endereços Bitcoin https://privatekeys.pw/puzzles/bitcoin-puzzle-tx 

//Importando módulos necessários
const cluster = require('cluster');
const CoinKey = require('coinkey');
const startTime = Date.now();
const fs = require('fs');
          
const min = 0x20000000000000000     // => Alterar aqui 20000000000000000:3ffffffffffffffff - 66 bits
const max = 0x3ffffffffffffffff     // => Alterar aqui

//Inicializando endereço chave pública
const wallets = ['13zb1hQbWVsc2S7ZTZnP2G4undNNpdh5so']  // => Alterar aqui

let key = BigInt(min);
let maxkey = BigInt(max);
console.log('Total chaves pesquisar:', `${maxkey}` - `${key}`);

function generate() {

    if (cluster.isMaster) {
    for (let i = 0; i < 1 ; i++) {

    key = key + BigInt(parseInt(1))
    pkey = key.toString(16)
    while (pkey.length < 64){
        pkey = '0' + pkey
    }

    //Chave pública
    public = generatePublic(pkey)
    //console.log(public);          // => Public Address: 18ZMbwUFLMHoZBbfpCjUJQTCMCbktshgpe

    //Chave Private (HEX)
    var privateKeyHex = (pkey)
    //console.log(privateKeyHex);   // => Private (HEX): 000000000000000000000000000000000000000000000001a838b13505b26867

    //Chave privada (WIF)
    var pkey = new CoinKey(Buffer.from(privateKeyHex, 'hex'))
    pkey.compressed = true
    //console.log(pkey.privateWif); // => Private (WIF): KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qZM21gaY8WN2CdwnTG57
    //console.log(pkey.toString()); // => Private (WIF): KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qZM21gaY8WN2CdwnTG57: 18ZMbwUFLMHoZBbfpCjUJQTCMCbktshgpe

    //Chave privada (WIF)
    var ck = new CoinKey(Buffer.from(privateKeyHex, 'hex'))
    ck.compressed = false
    //console.log(ck.privateWif);   // => Private (WIF): 5HpHagT65TZzG1PH3CSu63k8DbpvD8s5ipCnYRNeQuRFKarWVVs
    //console.log(ck.toString());   // => Private (WIF): 5HpHagT65TZzG1PH3CSu63k8DbpvD8s5ipCnYRNeQuRFKarWVVs: 1Pq6ZX74n7KvWpHtLX19rLnE37iMA4FTWC

        if (public == wallets[i]){
            console.log("")
            process.stdout.write('\x07'); // => Emite um sinal sonoro
            var successString = "Public Address: " + `${public}` + "\nPrivate (HEX): " + ` ${privateKeyHex}` + "\nDecimal (KEY): " + ` ${key}` + "\nPrivate (WIF): " + ` ${pkey}` + "\nPrivate (WIF): " + ` ${ck.privateWif}` + "\nMilissegundos:  " + (Date.now() - startTime) + "\nTotal  chaves:  " + (`${key}` - `${min}`) + "\n\n" + "======================================================================================================== " + "\n";
            console.log(`${successString}`)
            //Salvando a carteira e sua chave privada em um arquivo chamado Puzzles_Bitcoin.txt.
            fs.appendFileSync('./Puzzles_Bitcoin.txt', successString, (err) => {
            if (err) throw err; })
            //Fecha o programa após sucesso.
            process.exit()
        }
    }
    //console.log(`${key}`);        // => Decimal (KEY): 30568377312064202855   
    process.title = "Puzzles Bitcoin" + " Decimal KEY: " + (`${key} `) + 'Falta pesquisar: ' + (`${maxkey}` - `${key}`);
}
};

function generatePublic(privateKey){
   _key = new CoinKey(Buffer.from(privateKey, 'hex'))
   _key.compressed = true
   return _key.publicAddress
};

//Corre para sempre
while(true){
    generate()
    if (process.memoryUsage().heapUsed / 1000000 > 5000) {
        global.gc()
    };
    //console.log("Heap used : ", process.memoryUsage().heapUsed / 1000);
    
    const date = new Date();    // => Data DD-MM-AAAA
    let currentDay= String(date.getDate()).padStart(2, '0');
    let currentMonth = String(date.getMonth()+1).padStart(2,"0");
    let currentYear = date.getFullYear();
    let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

    const today = new Date();   // => Hora 24:00:00
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();

    //Salva a carteira e sua chave após 1 minuto no arquivo Continue_Puzzles_Bitcoin.txt na mesma pasta
    if(today.getSeconds()%60 === 0){
        var successString = "Decimal KEY: " + key + "\nData: " + currentDate + "  Hora: " + h + ":" + m + ":" + s + 0;
        fs.writeFileSync('./Continue_Puzzles_Bitcoin.txt', successString, (err) => {
        if (err) throw err; })
    };
    
    //Se chave for maior que const max então fecha o programa.
    if (key > maxkey){   
        var successString = "\nChave maior que (max) então fecha o programa Decimal KEY:" + ` ${maxkey}` + ".\n\n======================================================================================================== " + "\n"; // => 30568377312064114688
        console.log(`${successString}`)
        fs.appendFileSync('./Puzzles_Bitcoin.txt', successString,)
        //Fecha o programa após sucesso.
        process.exit()
    };
};
