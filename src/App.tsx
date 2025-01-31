import Todos from './components/todos/index';  // Todosコンポーネントを他のファイルからインポート

function App() {                               // Appという名前のコンポーネント関数を定義
  return (                                     // JSXを返す
    <>                                        {/* Reactフラグメント（不要なdiv要素を避けるために使用） */}
      <Todos/> {/* Todosコンポーネントをレンダリング */}   {/* Todosコンポーネントを表示 */}
    </>                                       // Reactフラグメントの終了
  );                                         // return文の終了
}                                            // 関数の終了

export default App;                          // このコンポーネントを他のファイルで使用できるようにエクスポート