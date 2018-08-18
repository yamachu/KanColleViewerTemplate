# KanColleViewerTemplate
Electronで艦これの専ブラを作りたくなった時のテンプレートプロジェクト

## 使い方

### セットアップ

```shell
$ npm install
# or
$ yarn install
```

### 起動

```shell
$ npm run start
# or
$ yarn run start
```

### レスポンスの受け取り方

`window.game.jsonResponse` が _RxJS_ の _Subject_ になっているので、いい感じにsubscribeする。

流れてくるObjectは

```json
{
  URL: string,
  Body: string
}
```

の形式になっている。

APIによってはBodyがundefinedの場合もあるため、`response.Body.slice(7)` みたいな形で受け取ろうとするとundefinedを踏んでしまい問題が生じる。
適宜Bodyがundefinedか値があるかの確認を行うこと。

適当に試したい場合はDeveloper Toolsを開いて

```js
window.game.jsonResponse.subscribe((v) => {
  if (v.Body !=== undefined) {
    // 文字列だけだとわからんな
    // console.log(`URL: ${v.URL}, Body: ${v.Body.slice(7)}`);
    console.log(`URL: ${v.URL}`);
    console.log(JSON.parse(v.Body.slice(7)));
  }
});
```

とかを叩いてみるといいかもしれない。

## ちょっとした説明

本アプリケーションではChrome Debugging Protocolを使用して、Networkの監視を行っている。
コードとしては[こんな感じ](https://github.com/yamachu/KanColleViewerTemplate/blob/master/src/js/requestHandler.js#L18)でいい感じに受け取ることが出来る。
Chrome Debugging Protocolのドキュメントについては各自参照されたし。

そこで得られたイベントをレンダラプロセスのWindowオブジェクトに定義したSubjectに流し込んでいる。
そのためレンダラプロセスでそのイベントに応じていい感じのUIが作れる __かも__ しれない。
