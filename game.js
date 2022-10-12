'use strict';
const tawa=document.getElementById('tawaa');
const re=document.getElementById('result-area');
const re2=document.getElementById('resultarea');
const re3=document.getElementById('hissyou');
const bo=document.getElementById('botan');
tawa.onkeydown=event=>{
    if(event.key==='Enter'){
       bo.onclick();
    }
}
bo.onclick=()=>{//最初のボタン押されたときのアラート
    const ta=tawa.value;
    const tt=ta.length;
    if(tt===0){
    return;
    }else if(ta<1){
        re.innerText="";
        re2.innerText="";
        re3.innerText="";
        const paragraph=document.createElement('p');
        const result=("自然数を入力してください");
        paragraph.innerText=result;
        re.appendChild(paragraph);
    }else{
        sakusei(ta);
    }
}
function sakusei(a){//ボタンを押したときの挙動
    re.innerText="";
    re2.innerText="";
    re3.innerText="";
    for (let i = 0; i < a; i++) {//レーンの作製
        const paragraph=document.createElement('input');
        paragraph.type="number";
        paragraph.name="test";
        const pa=document.createElement('br');
        re.appendChild(paragraph);
        re.appendChild(pa);
    }//ラジオとボタン作り
    const ura=document.createElement('h');
    ura.innerText="最後の石を取った方が";
    re.appendChild(ura);
    var ga=document.createElement('input');
    const wa=document.createElement('label');
    ga.type="radio";
    wa.for="kakunin";
    ga.name="kakuninn";
    wa.innerText="勝ち";
    ga.id="kakunin";
    re.appendChild(ga);
    re.appendChild(wa);
    var nba=document.createElement('input');
    const za=document.createElement('label');
    nba.type="radio";
    za.for="kakunin";
    nba.name="kakuninn";
    za.innerText="負け";
    nba.id="kakunin";
    re.appendChild(nba);
    re.appendChild(za);
    var pa=document.createElement('br');
    re.appendChild(pa);
    var boo=document.createElement('button');
    boo.innerText="判断";
    boo.onclick = () => {
        if(ga.checked){
            var settei=1;
        }else if(nba.checked){
            var settei=2;
        }else{
            var settei=0;
        }
        hanndann(settei);
    }
    re.appendChild(boo);
}
function hanndann(settei){//次のボタンを押した時のアラート
    const tora=document.getElementsByName('test');
    for (let j = 0; j < tora.length; j++) {
        const aa=tora.item(j).value;
        if(aa.length===0 || aa<1){
            re2.innerText="";
            re3.innerText="";
            const p=document.createElement('p');
            const resul=("全てに自然数を入力してください");
            p.innerText=resul;
            re2.appendChild(p);
            break;
        }else if(j===tora.length-1 && settei===0){
            re2.innerText="";
            re3.innerText="";
            const pp=document.createElement('p');
            const resu=("ラジオを選択してください");
            pp.innerText=resu;
            re2.appendChild(pp);
            break;
        }else if(j===tora.length-1){
            saisyuu(tora,settei);
        }
    }
    return;
}
function saisyuu(toa,settei){//最も大きい数字
    let kke=1;
    let nane=[];
    let ok=[];
    for(let k=0;k<toa.length;k++){
        const bb=toa.item(k).value;
        if(kke<bb){
            kke=bb;
        }
        nane.push(bb);
        ok.push(bb);
    }
    sikou(ok,nane,kke,1,settei,);
}
function sikou(ok,ss,hh,b,settei,){//2進法で表した時最も大きい桁
    if(hh>b){
        b=b*2;
        sikou(ok,ss,hh,b,settei);
    }else if(hh<b){
        b=b/2;
        foor(ok,ss,b,0,-1,0,settei);
    }else{
        foor(ok,ss,b,0,-1,0,settei);
    }
}
function foor(ok,ss,b,c,kona,kake,settei){//判断
    if(b===1/2){
        osimai(c,kona,kake,ok,settei);
    }else{
        var m=0;
        var hozi=0;
        var sake=0;
        for(let l=0;l<ss.length;l++){
          const sss=ss[l];
            if(l===kona && sss<b){
                sake=0;
            }else if(l===kona){
                sake=1;
                const s=sss-b;
                ss[l]=s;
                m++;
            }else if(sss>=b){
                const s=sss-b;
                ss[l]=s;
                m++;
                var hozi=l;
            }
        }
        b=b/2;
        var mm=m/2;
        var mmm=Math.floor(mm);
        if(mm===mmm && kona===-1){
            foor(ok,ss,b,0,-1,0,settei);
        }else if(kona===-1){
            foor(ok,ss,b,1,hozi,2*b,settei);
        }else if(mm===mmm){
            foor(ok,ss,b,1,kona,kake,settei);
        }else if(sake===0){
            const bbb=2*b;
            kake=kake-bbb;
            foor(ok,ss,b,1,kona,kake,settei);
        }else if(sake===1){
            const bbb=2*b;
            kake=kake+bbb;
            foor(ok,ss,b,1,kona,kake,settei);
        }
    }
}
function osimai(ob,kona,kake,ok,settei){//判断結果表示
    if(ob===0){
        re2.innerText="";
        re3.innerText="";
        const kann=document.createElement('h3');
        kann.innerText="後手必勝";
        kann.style.color="black";
        re2.appendChild(kann);
    }if(ob===1){
        re2.innerText="";
        re3.innerText="";
        const kann=document.createElement('h3');
        kann.innerText="先手必勝";
        kann.style.color="black";
        re2.appendChild(kann);
        kanryou(kona,kake,ok,settei);
    }
}
function kanryou(kona,kake,ok,settei){//先手が取るべき手の例の表示
    re3.innerText="";
    const bbr=document.createElement('br');
    const korena=document.createElement('h4');
    const koreka=("・先手が取るべき手の例");
    korena.innerText=koreka;
    re3.appendChild(korena);
    const sasake=document.createElement('span');
    const koreda=(ok);
    sasake.innerText=koreda;
    re3.appendChild(sasake);
    re3.appendChild(bbr);
    const ya=document.createElement('span');
    const yazi=('↓');
    ya.innerText=yazi;
    re3.appendChild(ya);
    const br=document.createElement('br');
    re3.appendChild(br);
    if(settei===1){
        const okok=ok[kona];
        const kareta=okok-kake;
        ok[kona]=kareta;
        const saske=document.createElement('span');
        const korda=(ok);
        saske.innerText=korda;
        re3.appendChild(saske);
    }else if(settei=2){
        let y=0;
        let garen=0;
        let nya=0;
        let ook=ok.length;
        for (let n = 0; n < ook; n++) {
            const bore=ok[n];
            if(bore===1){
                y++;
                console.log(bore);
            }else{
                garen++;
                nya=n;
            }
        }
        const yy=y/2;
        const yyy=Math.floor(yy);
        if(garen!==1){
            const okok=ok[kona];
            const kareta=okok-kake;
            ok[kona]=kareta;
            const saske=document.createElement('span');
            const korda=(ok);
            saske.innerText=korda;
            re3.appendChild(saske);
        }else if(yyy===yy){
            ok[nya]=1;
            const saske=document.createElement('span');
            const korda=(ok);
            saske.innerText=korda;
            re3.appendChild(saske);
        }else{
            ok[nya]=0;
            const saske=document.createElement('span');
            const korda=(ok);
            saske.innerText=korda;
            re3.appendChild(saske);
        }
    }
}
