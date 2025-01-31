import React from 'react'                                  // Reactライブラリをインポート
import ReactDOM from 'react-dom/client'                    // ReactDOMのクライアントバージョンをインポート
import App from './App'                                    // Appコンポーネントをインポート
import './index.css'                                       // グローバルCSSファイルをインポート


ReactDOM.createRoot(document.getElementById('root')!).render(  // DOM内の'root'要素を取得してReactルートを作成
  <React.StrictMode>                                          {/*開発時の追加チェックを有効にするStrictModeを使用*/}
    <App />                                                    {/*メインのAppコンポーネントをレンダリング*/}
  </React.StrictMode>,                                        // StrictModeの終了
)