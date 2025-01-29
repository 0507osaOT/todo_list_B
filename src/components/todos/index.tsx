import React, { useState } from 'react';  // React と useState フックをインポート

// Todo型の定義
type Todo = {
  title: string;     // タイトルを格納する文字列型のプロパティ
  readonly id: number;  // 読み取り専用のID（変更不可）
};

const Todo: React.FC = () => {  // React関数コンポーネントとして定義
  const [todos, setTodos] = useState<Todo[]>([]);  // Todo配列を管理するステート。初期値は空配列
  const [text, setText] = useState('');  // 入力フォームの値を管理するステート
  const [nextId, setNextId] = useState(1);  // 次に追加するTodoのIDを管理。1から開始

  // Todo編集用の関数。id と 新しい値を受け取る
  const handleEdit = (id: number, value: string) => {
    console.log('handleEdit called:', id, value);  // デバッグ用のログ
    setTodos((todos) => {  // 現在のtodosを受け取り、新しい配列を返す
      const newTodos = todos.map((todo) => {  // 各todoをマップで処理
        if (todo.id === id) {  // 編集対象のtodoを見つけたら
          console.log('Updating todo:', todo);  // デバッグ用のログ
          todo.title = value;  // タイトルを新しい値に更新
        }
        return todo;  // 更新したtodoを返す
      });
      return newTodos;  // 新しいtodos配列を返してステートを更新
    });
  };

  // 新しいTodoを追加する関数
  const handleSubmit = () => {
    if (!text) return;  // 入力が空の場合は何もしない
    
    const newTodo: Todo = {  // 新しいTodoオブジェクトを作成
      title: text,  // 入力されたテキストをタイトルに設定
      id: nextId,  // 現在のnextIdを使用
    };

    setTodos((prevTodos) => [newTodo, ...prevTodos]);  // 新しいTodoを配列の先頭に追加
    setNextId(nextId + 1);  // 次のIDを更新
    setText('');  // 入力フォームをクリア
  };

  return (
    <div>
      <form
        onSubmit={(e) => {  // フォーム送信時のイベントハンドラ
          console.log(e)  // デバッグ用のログ
          e.preventDefault();  // フォームのデフォルト送信を防止
          handleSubmit();  // Todo追加処理を実行
        }}
      >
        <input
          type="text"
          value={text}  // 入力フィールドの値をtextステートと同期
          onChange={(e) => setText(e.target.value)}  // 入力値が変更されたらステートを更新
        />
        <button className="insert-btn" type="submit">追加</button>  {/* 送信ボタン */}
      </form>
      <ul>
        {todos.map((todo) => {  // todos配列の各要素をリストアイテムとしてレンダリング
          return (
            <li key={todo.id}>  {/* Reactの key prop として id を使用 */}
              <input
                type="text"
                value={todo.title}  // 表示するTodoのタイトル
                onChange={(e) => handleEdit(todo.id, e.target.value)}  // 編集時にhandleEditを呼び出し
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;  // コンポーネントをエクスポート