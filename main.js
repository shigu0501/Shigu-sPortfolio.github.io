

const screenImages = document.querySelectorAll('.screen-modal-data__image');
const screenModalEl = document.getElementById('screen-modal');

// 画像クリックでモーダル表示
screenImages.forEach((triggerImageEl) => {
  triggerImageEl.addEventListener('click', () => {
    
    console.log("clicked");
    
    // モーダルの考え方
    // 通常、非表示のフルスクリーンモーダルには画像とフェードイン用の背景DIVを配置してある。
    // フルスクリーン表示する前に画像にはクリックされた画像のURLとwindowの絶対位置をセットしておく。
    // クリックされた画像と全く同じものをフルスクリーン上で再現しておき、それをCSSアニメーションするというのがポイント。
    // また、この時、フルスクリーン上の画像のstyleにセットしてはいけない。要素に直接style属性で指定するとCSSアニメーションが効かず完全に固定になる。
    // CSSのスタイルを取ってセットする。
    // フルスクリーンで、画像のクローンを表示させるルーチンを一度実行させてから、アニメーション後のCSSを適用する。
    // そうすることによって、CSSアニメーションが実行される。

    // モーダル上の画像Elementを取得
    const imageEl = screenModalEl.querySelector('.screen-modal__image');

    // クリックされた画像のurlをセット
    imageEl.setAttribute('src', triggerImageEl.getAttribute('src'));

    // モーダル上のテキストのElementを取得
    const fadeEl = screenModalEl.querySelector('.screen-modal__fade');

    const dataBodyEl =  triggerImageEl.parentNode.querySelector('.screen-modal-data__body');
    
    const sample1 = dataBodyEl.innerHTML

    fadeEl.innerHTML = sample1;

    // クリックされた画像の現在の位置・大きさを取得
    const rect = triggerImageEl.getBoundingClientRect()

    // モーダル上の画像Element設定されているクラスを取得
    const rule = getRuleBySelector('.screen-modal__image')

    // モーダル上の画像Elementのアニメーション前クラスの値を更新
    // これでクリックされた画像と全く同じ位置・大きさで上に重なる画像を作成できた。
    rule.style.top = `${rect.top}px`;
    rule.style.left = `${rect.left}px`;
    rule.style.width = `${rect.width}px`;
    rule.style.height = `${rect.height}px`;

    // モーダル表示開始
    document.body.classList.add('screen-modal_open')

    // モーダルの描画ルーチンを走らせてから、アニメーション後のクラスをあてる。
    setTimeout(()=>{
      document.body.classList.add('screen-modal_animated')
    },1);

  })
});

// モーダルスクリーンクリックで非表示
screenModalEl.addEventListener('click',() => {
  document.body.classList.remove('screen-modal_animated');    
  setTimeout(()=>{
    document.body.classList.remove('screen-modal_open');
  },600);
});


// JavaScriptでCSSのクラスの値を変更する
// https://qiita.com/life5618/items/950558e4b72c038333f8
function getRuleBySelector(selector){


  let sheets = document.styleSheets;
  
  let theRule = null;
  for(let sheet of sheets){
    
    console.log(sheet);
    
    if(sheet.title != "modal"){
      continue;
    }
    
    let rules = sheet.cssRules;
    
    for(let rule of rules){
      if(selector === rule.selectorText){
        theRule = rule;
        break;
      }
    }
  }
  return theRule;
}



